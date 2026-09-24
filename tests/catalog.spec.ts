import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import entries from "../data/entries.json";
import { sources } from "../data/catalog";

test("catalog, category counts, source filtering, search and empty state", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article[data-component]")).toHaveCount(entries.length);
  await page.getByRole("link", { name: "Buttons & Controls" }).first().click();
  const buttons = entries.filter((item) => item.category === "buttons").length;
  await expect(page.locator("article[data-component]")).toHaveCount(buttons);
  await page.getByLabel("Filter by source").selectOption("smoothui");
  const smoothButtons = entries.filter(
    (item) => item.category === "buttons" && item.source === "smoothui",
  ).length;
  await expect(page.locator("article[data-component]")).toHaveCount(smoothButtons);
  await expect(page).toHaveURL(/source=smoothui/);
  await page.reload();
  await expect(page.locator("article[data-component]")).toHaveCount(smoothButtons);
  await page.getByLabel("Search components").fill("not a real component");
  await expect(page.getByRole("heading", { name: "Nothing here just yet" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).first().click();
  await expect(page.locator("article[data-component]")).toHaveCount(buttons);
  await page.goto("/?q=glass");
  await expect(page.locator("article[data-component]")).toHaveCount(1);
  await page.getByRole("button", { name: "Featured", exact: true }).click();
  await expect(page).toHaveURL(/featured=1/);
  await page.keyboard.press("Meta+k");
  await expect(page.getByLabel("Search components")).toBeFocused();
});

test("saved collection and appearance survive reload", async ({ page }) => {
  await page.goto("/");
  const save = page.getByRole("button", { name: "Save Glass Card", exact: true });
  await save.focus();
  await save.click();
  await page
    .getByRole("link", { name: /^Saved/ })
    .first()
    .click();
  await expect(page.locator("article[data-component]")).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole("link", { name: "Glass Card", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Dark theme", exact: true }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.getByRole("button", { name: "Unsave Glass Card", exact: true }).click();
  await expect(page.getByRole("heading", { name: "A home for your favorites" })).toBeVisible();
});

for (const storageState of ["full", "blocked"] as const) {
  test(`appearance and favorites remain usable when browser storage is ${storageState}`, async ({
    page,
  }) => {
    await page.addInitScript((state) => {
      localStorage.setItem("kitty-theme", "light");
      localStorage.setItem("kitty-favorites", "[]");
      Storage.prototype.setItem = () => {
        throw new DOMException("Storage unavailable", "QuotaExceededError");
      };
      if (state === "blocked") {
        Storage.prototype.getItem = () => {
          throw new DOMException("Storage unavailable", "SecurityError");
        };
      }
    }, storageState);
    await page.goto("/");
    await page.getByRole("button", { name: "Dark theme", exact: true }).click();
    await expect(page.locator("html")).toHaveClass("dark");
    await page.getByRole("button", { name: "Save Glass Card", exact: true }).click();
    await page
      .getByRole("link", { name: /^Saved/ })
      .first()
      .click();
    await expect(page.locator("article[data-component]")).toHaveCount(1);
    await page.getByRole("button", { name: "Unsave Glass Card", exact: true }).click();
    await expect(page.getByRole("heading", { name: "A home for your favorites" })).toBeVisible();
    await page.getByRole("button", { name: "Light theme", exact: true }).click();
    await expect(page.locator("html")).not.toHaveClass("dark");
  });
}

test("malformed preferences fall back to the system theme and an empty collection", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    localStorage.setItem("kitty-theme", "invalid-theme");
    localStorage.setItem("kitty-favorites", "{invalid json");
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass("dark");
  const thumbnail = page.locator('[data-component="glass-card"] img').first();
  await expect(thumbnail).toHaveAttribute("src", "/thumbnails/glass-card-dark.jpg");
  await expect
    .poll(() => thumbnail.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await page
    .getByRole("link", { name: /^Saved/ })
    .first()
    .click();
  await expect(page.getByRole("heading", { name: "A home for your favorites" })).toBeVisible();
});

test("preference changes and clearing storage sync between tabs", async ({ page, context }) => {
  await page.goto("/");
  const otherTab = await context.newPage();
  await otherTab.goto("/");
  await page.getByRole("button", { name: "Dark theme", exact: true }).click();
  await expect(otherTab.locator("html")).toHaveClass("dark");
  await otherTab.getByRole("button", { name: "Save Glass Card", exact: true }).click();
  await expect(page.getByRole("button", { name: "Unsave Glass Card", exact: true })).toBeVisible();
  await otherTab.evaluate(() => localStorage.clear());
  await expect(page.locator("html")).not.toHaveClass("dark");
  await expect(page.getByRole("button", { name: "Save Glass Card", exact: true })).toBeVisible();
});

test("only the active catalog preview is mounted", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article iframe")).toHaveCount(0);
  await page.locator('[data-component="glass-card"] .card-preview').hover();
  await expect(page.locator("article iframe")).toHaveCount(1);
  await page.locator('[data-component="card-flip"] .card-preview').hover();
  await expect(page.locator("article iframe")).toHaveCount(1);
  await expect(page.locator("article iframe")).toHaveAttribute("title", "Live preview: Card Flip");
  await page.getByRole("heading", { name: /All components/ }).hover();
  await expect(page.locator("article iframe")).toHaveCount(0);
});

test("source and AI copy match the real rendered files", async ({ page }) => {
  await page.goto("/components/glass-card");
  const source = await readFile("registry/smoothui/GlassCard.tsx", "utf8");
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(source);
  await page.getByRole("button", { name: "Copy for AI", exact: true }).click();
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toContain(source);
  expect(prompt).toContain("registry/shared/utils.ts");
  expect(prompt).toContain("public/media/art-05.svg");
  expect(prompt).toContain("Copyright (c)");
  expect(prompt).toContain("npm install");
  expect(prompt).not.toContain('from "@/');
  await page
    .getByLabel("Source file", { exact: true })
    .selectOption({ label: "registry/shared/utils.ts" });
  await expect(page.getByLabel("Source code for registry/shared/utils.ts")).toBeVisible();
  await page.getByRole("tab", { name: "How to use" }).click();
  await expect(page.getByRole("heading", { name: "01 · Install the dependencies" })).toBeVisible();
  await page.getByRole("tab", { name: "How to use" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "License & credits" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByRole("button", { name: "Mobile preview", exact: true }).click();
  await expect(page.locator(".detail-iframe")).toHaveCSS("width", "320px");
  const before = await page.locator(".detail-iframe").getAttribute("src");
  await page.getByLabel("Toggle preview theme").click();
  await expect(page.locator(".detail-iframe")).not.toHaveAttribute("src", before!);
});

for (const width of [390, 768, 1024, 1280]) {
  test(`responsive catalog and detail at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /All components/ })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    if (width === 390) {
      await page.getByLabel("Open navigation").click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toBeHidden();
      await expect(page.getByLabel("Open navigation")).toBeFocused();
    }
    await page.screenshot({ path: `artifacts/catalog-${width}.png`, fullPage: false });
    await page.goto("/components/glass-card");
    await expect(page.getByRole("heading", { name: "Glass Card", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    await expect(page.locator(".preview-loading")).toHaveCount(0);
    await page.screenshot({ path: `artifacts/detail-${width}.png`, fullPage: false });
  });
}

test("accessibility of the shell, source viewer, and navigation drawer", async ({ page }) => {
  for (const theme of ["Light", "Dark"])
    for (const url of ["/", "/components/glass-card", "/saved", "/sources", "/getting-started"]) {
      await page.goto(url);
      await expect(page.locator("main h1")).toBeVisible();
      await page.getByRole("button", { name: `${theme} theme`, exact: true }).click();
      // Measure the resting colors, after entrance opacity has reached 1.
      await page.evaluate(() =>
        Promise.allSettled(
          document
            .getAnimations()
            .filter((animation) =>
              Number.isFinite(animation.effect?.getComputedTiming().iterations),
            )
            .map((animation) => animation.finished),
        ),
      );
      const result = await new AxeBuilder({ page })
        .exclude("iframe")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        url,
      ).toEqual([]);
    }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Open navigation").click();
  await page.evaluate(() =>
    Promise.allSettled(
      document
        .getAnimations()
        .filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().iterations))
        .map((animation) => animation.finished),
    ),
  );
  const drawer = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(drawer.violations).toEqual([]);
});

test("sources and getting started are real pages; invalid routes return 404", async ({ page }) => {
  await page.goto("/sources");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(sources.length + 1);
  await page.getByText("Read the MIT license").first().click();
  await expect(page.locator("details[open] pre")).toContainText("MIT License");
  const response = await page.goto("/components/not-a-component");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the collection" })).toBeVisible();
});

test("all component detail pages expose their source bundles", async ({ request }) => {
  for (const { slug } of entries) {
    const response = await request.get(`/components/${slug}`);
    expect(response.status(), slug).toBe(200);
    expect(
      (await response.text()).includes("Copy for AI"),
      slug + " must render its source viewer in the initial HTML",
    ).toBe(true);
  }
});
