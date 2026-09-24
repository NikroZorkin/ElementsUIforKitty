import { test, expect } from "@playwright/test";
import entries from "../data/entries.json";

test("thumbnail images are complete and the dark catalog renders", async ({ page }) => {
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    for (let half = 0; half < Math.ceil(entries.length / 28); half++) {
      await page.setViewportSize({ width: 1600, height: 1500 });
      await page.evaluate(
        ({ items, theme }) => {
          document.body.innerHTML = "";
          document.body.style.cssText =
            "margin:0;padding:20px;background:#eeeeef;font-family:system-ui";
          const sheet = document.createElement("div");
          sheet.style.cssText = "display:grid;grid-template-columns:repeat(4,1fr);gap:14px";
          for (const item of items) {
            const cell = document.createElement("div");
            cell.style.cssText =
              "background:white;border:1px solid #ccc;border-radius:8px;overflow:hidden";
            const image = document.createElement("img");
            image.src = "/thumbnails/" + item.slug + "-" + theme + ".jpg";
            image.style.cssText = "width:100%;aspect-ratio:10/7;object-fit:cover;display:block";
            const label = document.createElement("p");
            label.textContent = item.title;
            label.style.cssText = "padding:7px 10px;margin:0;font-size:13px;color:#333";
            cell.append(image, label);
            sheet.append(cell);
          }
          document.body.append(sheet);
        },
        { items: entries.slice(half * 28, half * 28 + 28), theme },
      );
      await page
        .locator("img")
        .evaluateAll((images) =>
          Promise.all(
            images.map((image) =>
              image instanceof HTMLImageElement ? image.decode() : Promise.resolve(),
            ),
          ),
        );
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) => image instanceof HTMLImageElement && image.naturalWidth === 600,
            ),
          ),
      ).toBe(true);
      await page.screenshot({ path: `artifacts/contact-${theme}-${half + 1}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Dark theme", exact: true }).click();
  await page
    .locator(".preview-image")
    .first()
    .evaluate((image: HTMLImageElement) => image.decode());
  await page.screenshot({ path: "artifacts/catalog-dark.png", fullPage: false });
});
