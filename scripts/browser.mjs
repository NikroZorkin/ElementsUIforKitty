import { existsSync } from "node:fs";
export function browserOptions() {
  const configured = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return {
    headless: true,
    ...(configured
      ? { executablePath: configured }
      : existsSync(macChrome)
        ? { executablePath: macChrome }
        : {}),
  };
}
