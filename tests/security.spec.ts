import { expect, test } from "@playwright/test";

test("production pages enforce security headers while allowing the catalog's previews", async ({
  page,
  request,
}) => {
  for (const path of ["/", "/components/glass-card", "/preview/glass-card", "/missing-page"]) {
    const response = await request.get(path);
    const headers = response.headers();
    expect(headers["x-content-type-options"], path).toBe("nosniff");
    expect(headers["x-frame-options"], path).toBe("SAMEORIGIN");
    expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
    const policy = headers["content-security-policy"];
    expect(policy, path).toContain("frame-ancestors 'self'");
    expect(policy, path).toContain("object-src 'none'");
    expect(policy, path).toContain("script-src-attr 'none'");
    expect(policy, path).not.toContain("'unsafe-eval'");
  }
  const violations: string[] = [];
  await page.exposeFunction("reportPolicyViolation", (directive: string) => {
    violations.push(directive);
  });
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      const report = Reflect.get(window, "reportPolicyViolation");
      if (typeof report === "function") report(event.violatedDirective);
    });
  });
  await page.goto("/components/glass-card");
  await expect(page.locator(".preview-loading")).toHaveCount(0);
  await expect(page.frameLocator(".detail-iframe").locator("body")).toContainText("MEMBERSHIP");
  await page.getByRole("button", { name: "Copy for AI", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("GlassCard");
  expect(violations).toEqual([]);
});

test("private repository and deployment files are not served", async ({ request }) => {
  for (const path of [
    "/.env",
    "/.env.local",
    "/.git/config",
    "/.vercel/project.json",
    "/package-lock.json",
    "/next.config.ts",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test("search treats markup as text and unknown component paths return 404", async ({ page }) => {
  const payload = '<img src=x onerror="document.documentElement.dataset.injected=1">';
  await page.goto(`/?q=${encodeURIComponent(payload)}`);
  await expect(page.getByLabel("Search components")).toHaveValue(payload);
  await expect(page.getByRole("heading", { name: "Nothing here just yet" })).toBeVisible();
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-injected");
  const response = await page.goto(`/components/${encodeURIComponent("<script>audit</script>")}`);
  expect(response?.status()).toBe(404);
});
