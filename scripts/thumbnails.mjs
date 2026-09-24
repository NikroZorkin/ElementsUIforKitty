import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { browserOptions } from "./browser.mjs";

const entries = JSON.parse(await readFile("data/entries.json", "utf8"));
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const selected = process.argv.slice(2);
const items = selected.length ? entries.filter((entry) => selected.includes(entry.slug)) : entries;
await mkdir("public/thumbnails", { recursive: true });
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch(browserOptions());
const jobs = items.flatMap((item) => ["light", "dark"].map((theme) => ({ item, theme })));
const failures = [];
let next = 0;
async function worker() {
  const pages = new Map();
  try {
    while (next < jobs.length) {
      const { item, theme } = jobs[next++];
      // A section needs a desktop viewport to show its full composition. Use
      // the same viewport as the live card and produce a 600 × 420 image.
      const width = item.category === "sections" ? 1440 : 600;
      if (!pages.has(width)) {
        pages.set(
          width,
          await browser.newPage({
            viewport: { width, height: Math.round(width * 0.7) },
            deviceScaleFactor: 600 / width,
          }),
        );
      }
      const page = pages.get(width);
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on("pageerror", onError);
      try {
        const response = await page.goto(`${base}/preview/${item.slug}?theme=${theme}&mode=card`, {
          timeout: 60000,
        });
        if (!response.ok()) throw new Error("HTTP " + response.status());
        await page.locator('[data-preview-ready="true"]').waitFor({ timeout: 20000 });
        await page.evaluate(() => document.fonts.ready);
        await page
          .locator("img")
          .evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
        await page.waitForTimeout(1200);
        if (await page.getByText("This preview needs a fresh start.").count())
          throw new Error("Preview error boundary");
        if (errors.length) throw new Error(errors.join("\n"));
        await page.screenshot({
          path: `public/thumbnails/${item.slug}-${theme}.jpg`,
          type: "jpeg",
          quality: 85,
        });
        console.log(`✓ ${item.slug} · ${theme}`);
      } catch (error) {
        failures.push({ slug: item.slug, theme, error: error.message });
        console.error(`✗ ${item.slug} · ${theme}: ${error.message}`);
      } finally {
        page.off("pageerror", onError);
      }
    }
  } finally {
    await Promise.all([...pages.values()].map((page) => page.close()));
  }
}
try {
  await Promise.all(Array.from({ length: Math.min(3, jobs.length) }, () => worker()));
} finally {
  await browser.close();
}
await writeFile(
  "artifacts/preview-smoke.json",
  JSON.stringify({ checked: jobs.length, failures }, null, 2),
);
if (failures.length) process.exitCode = 1;
