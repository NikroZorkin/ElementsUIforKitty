import { defineConfig } from "@playwright/test";
import { browserOptions } from "./scripts/browser.mjs";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 2,
  timeout: 60000,
  expect: { timeout: 12000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PREVIEW_URL || "http://127.0.0.1:3000",
    viewport: { width: 1280, height: 900 },
    launchOptions: browserOptions(),
    permissions: ["clipboard-read", "clipboard-write"],
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    colorScheme: "light",
  },
});
