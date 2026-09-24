import { test, expect } from "@playwright/test";
import { categories } from "../data/catalog";
import entries from "../data/entries.json";

declare global {
  interface Window {
    kittyMotionEvents: string[];
  }
}

test("every category offers at least fifteen distinct working examples", async ({ page }) => {
  expect(new Set(entries.map((entry) => entry.slug)).size).toBe(entries.length);
  expect(
    new Set(
      categories.map(
        (category) => entries.filter((entry) => entry.category === category.id).length,
      ),
    ).size,
  ).toBeGreaterThan(1);
  await page.goto("/");
  for (const category of categories) {
    await page.getByRole("link", { name: category.label }).first().click();
    const count = entries.filter((entry) => entry.category === category.id).length;
    expect(count).toBeGreaterThanOrEqual(15);
    await expect(page.locator("article[data-component]")).toHaveCount(count);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(category.label);
  }
});

test("opening pages and switching documentation tabs trigger entrance animations", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const events: string[] = [];
    Object.assign(window, { kittyMotionEvents: events });
    document.addEventListener("animationstart", (event) => {
      if (event.target instanceof Element) {
        events.push(`${event.target.className}:${event.animationName}`);
      }
    });
  });
  const motionEvents = () => page.evaluate(() => window.kittyMotionEvents);
  await page.goto("/");
  await expect.poll(motionEvents).toContain("route-content:chrome-enter");
  await expect.poll(motionEvents).toContain("component-card:content-enter");
  await page.evaluate(() => {
    window.kittyMotionEvents.length = 0;
  });
  await page.getByRole("link", { name: "Cards" }).first().click();
  await expect.poll(motionEvents).toContain("route-content:chrome-enter");
  await page.getByRole("link", { name: "Glass Card", exact: true }).click();
  await page.getByRole("tab", { name: "How to use" }).click();
  await expect(page.getByRole("heading", { name: "01 · Install the dependencies" })).toBeVisible();
  await expect.poll(motionEvents).toContain("tab-content:content-enter");
  await expect(
    page.getByRole("tab", { name: "How to use" }).locator(".tab-indicator"),
  ).toBeVisible();
});

test("reduced motion disables shell entrances and preserves tab navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/category/cards");
  await expect(page.locator(".route-content")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".component-card").first()).toHaveCSS("animation-name", "none");
  await page.getByRole("link", { name: "Glass Card", exact: true }).click();
  await page.getByRole("tab", { name: "How to use" }).click();
  await expect(page.locator(".tab-content")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { name: "01 · Install the dependencies" })).toBeVisible();
});

test("new controls update their values with the keyboard", async ({ page }) => {
  await page.goto("/preview/animated-toggle");
  const toggle = page.getByRole("switch", { name: "Focus mode" });
  await expect(toggle).toBeChecked();
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).not.toBeChecked();
  await expect(page.getByRole("status")).toHaveText("Focus mode is off");

  await page.goto("/preview/animated-tags");
  const addTag = page.getByRole("button", { name: "Add React", exact: true });
  await addTag.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("2 tools selected");
  await page.getByRole("button", { name: "Remove Motion", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("1 tools selected");

  await page.goto("/preview/number-flow");
  await expect(page.getByLabel("Current value")).toHaveText("128");
  await page.getByRole("button", { name: "Increase number" }).click();
  await expect(page.getByLabel("Current value")).toHaveText("129");
  await page.getByRole("button", { name: "Decrease number" }).click();
  await expect(page.getByLabel("Current value")).toHaveText("128");

  await page.goto("/preview/animated-progress-bar");
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "42");
  await page.getByRole("button", { name: "Advance" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "61");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
});

test("new navigation examples change the selected content", async ({ page }) => {
  await page.goto("/preview/animated-tabs");
  await page.getByRole("tab", { name: "Design" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Build" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Give it some life.");

  await page.goto("/preview/animated-stepper");
  await page.getByRole("tab", { name: /Step 2: Design/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Collect the details that matter.");
  await page.getByRole("tab", { name: /Step 3: Ready/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("You have everything you need.");

  await page.goto("/preview/searchable-dropdown");
  await page.getByRole("button", { name: "Find a project" }).click();
  await page.getByPlaceholder("Search projects…").fill("orbit");
  await page.getByText("In orbit", { exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("In orbit");

  await page.goto("/preview/file-tree");
  await page.getByRole("treeitem", { name: "Card.tsx", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Selected: card");
});

test("price changes keep all digits and section calls to action work", async ({ page }) => {
  await page.goto("/preview/price-flow");
  await page.getByRole("button", { name: "Show yearly" }).click();
  await expect(page.getByLabel("288", { exact: true })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Billed yearly");
  await page.getByRole("button", { name: "Show monthly" }).click();
  await expect(page.getByLabel("29", { exact: true })).toBeVisible();

  await page.goto("/preview/pricing-plans");
  await page.getByRole("button", { name: "Monthly", exact: true }).click();
  await page.getByRole("button", { name: "Get Started", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Monthly Pro plan selected for this example.");
});

test("file upload and gallery examples respond to user actions", async ({ page }) => {
  await page.goto("/preview/animated-file-upload");
  await page.locator('input[type="file"]').setInputFiles({
    name: "studio-notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("A small test file."),
  });
  await expect(page.getByRole("list", { name: "Selected files" })).toContainText(
    "studio-notes.txt",
  );
  await expect(page.getByRole("status")).toHaveText("1 files selected locally");
  await page.getByRole("button", { name: "Remove studio-notes.txt" }).click();
  await expect(page.getByRole("list", { name: "Selected files" })).toHaveCount(0);

  await page.goto("/preview/time-machine-stack");
  await page.getByRole("button", { name: "Next snapshot" }).click();
  await expect(page.getByText("Snapshot 2 / 4")).toBeVisible();
  await page.getByRole("button", { name: "Previous snapshot" }).click();
  await expect(page.getByText("Snapshot 1 / 4")).toBeVisible();

  await page.goto("/preview/card-swipe-deck");
  await page.getByRole("button", { name: "Keep card", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("contours: kept");

  await page.goto("/preview/image-metadata-preview");
  await page.getByRole("button", { name: "Open Metadata Preview" }).click();
  await expect(page.getByText("blue-hour.svg", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close metadata preview" }).click();
  await expect(page.getByText("blue-hour.svg", { exact: true })).toBeHidden();
});

test("section cards retain a desktop layout inside a small catalog tile", async ({ page }) => {
  await page.goto("/category/sections");
  const card = page.locator('[data-component="pricing-plans"]');
  // Finish the scroll before hovering: a smooth scroll can move another tile
  // under the pointer while its iframe is still loading.
  await card.evaluate((element) =>
    element.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await card.locator(".card-preview").hover();
  const iframe = card.locator("iframe");
  await expect(iframe).toHaveClass(/ready/);
  const frame = iframe.contentFrame();
  await expect(frame.getByRole("button", { name: "Get Started", exact: true })).toBeVisible();
  expect(await frame.locator("html").evaluate(() => window.innerWidth)).toBe(1440);
  const crop = await frame.locator(".section-example").evaluate((element) => ({
    bottom: element.getBoundingClientRect().bottom,
    viewport: innerHeight,
  }));
  expect(crop.bottom).toBeLessThanOrEqual(crop.viewport);
});
