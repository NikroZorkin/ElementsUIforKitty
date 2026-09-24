import { test, expect } from "@playwright/test";
import entries from "../data/entries.json";

test("touch can flip a card and reveal sharing actions", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
  await page.goto(base + "/preview/card-flip");
  const card = page.getByRole("button", { name: "Flip card", exact: true });
  await card.tap();
  await expect(card).toHaveAttribute("aria-pressed", "true");
  await card.tap();
  await expect(card).toHaveAttribute("aria-pressed", "false");
  await page.goto(base + "/preview/social-button");
  const share = page.getByRole("button", { name: "Share", exact: true });
  await share.tap();
  await expect(share).toHaveAttribute("aria-expanded", "true");
  await context.close();
});

for (const entry of entries) {
  test(`preview: ${entry.slug}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`/preview/${entry.slug}?theme=light`);
    expect(response?.status()).toBe(200);
    const root = page.locator(`[data-demo="${entry.slug}"]`);
    await expect(root.locator("> *").first()).toBeVisible();
    await page.waitForTimeout(400);
    await expect(page.getByText("This preview needs a fresh start.")).toHaveCount(0);
    expect(errors).toEqual([]);
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((i) => i instanceof HTMLImageElement && i.complete && i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
      );
    expect(broken).toEqual([]);
  });
}

test("button callbacks and hold-to-confirm work with the keyboard", async ({ page }) => {
  await page.goto("/preview/particle-button");
  await page.getByRole("button", { name: /Make it happen/ }).click();
  await expect(page.getByRole("status")).toHaveText("A little celebration. Nicely done.");
  await page.goto("/preview/hold-button");
  const button = page.getByRole("button", { name: /Hold to confirm/ });
  await button.focus();
  await page.keyboard.down("Space");
  await page.waitForTimeout(150);
  await page.keyboard.up("Space");
  await expect(page.getByRole("status")).toHaveText("Hold for 1.5 seconds to confirm.");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1700);
  await page.keyboard.up("Space");
  await expect(page.getByRole("status")).toHaveText("Confirmed. You can safely start again.");
});

test("card flip, dock, and notifications respond to actions", async ({ page }) => {
  await page.goto("/preview/card-flip");
  const flip = page.getByRole("button", { name: "Flip card", exact: true });
  await flip.focus();
  await page.keyboard.press("Enter");
  await expect(flip).toHaveAttribute("aria-pressed", "true");
  await page.goto("/preview/dock");
  await page.getByRole("button", { name: "Files", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Files selected");
  await page.goto("/preview/animated-toast-stack");
  await page.getByRole("button", { name: "Show notification" }).click();
  await expect(page.getByText("Changes saved", { exact: true })).toBeVisible();
});

test("reduced motion keeps examples readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const slug of ["wave-text", "matrix-text", "liquid-metal", "aurora-curtain", "marquee"]) {
    await page.goto(`/preview/${slug}`);
    await expect(page.locator("[data-demo] > *").first()).toBeVisible();
    await page.waitForTimeout(300);
    await expect(page.getByText("This preview needs a fresh start.")).toHaveCount(0);
  }
});
