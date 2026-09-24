# Security policy

## Reporting a vulnerability

Use [GitHub's private vulnerability reporting](https://github.com/NikroZorkin/ElementsUIforKitty/security/advisories/new). Include the affected URL or component, reproduction steps, and the impact. Keep credentials and personal data out of public issues.

Security fixes target the current `main` branch and its [production deployment](https://elements-for-kitty.vercel.app).

## Application boundaries

- The catalog has no accounts, backend API, database, or server-side uploads. Favorites and appearance preferences use browser storage.
- Component previews execute reviewed files committed to this repository. Their same-origin iframes are a presentation boundary, not a sandbox for untrusted code. Do not add user-submitted scripts to them.
- **Copy for AI** copies text to the clipboard; it does not send code or prompts to an AI service.
- Exported components need a review in the context of their destination application, including input handling, accessibility, and dependency versions.

## Security checks and headers

CI audits production dependencies with `npm audit --omit=dev`, checks exported examples, and runs browser tests against a production build. Run `npm audit` separately to include development tooling. Keep secrets and deployment credentials out of the repository; `.env*` and `.vercel/` are ignored.

The application sets a Content Security Policy, `nosniff`, same-origin framing, a referrer policy, and restrictions on camera, microphone, and location access. Resources are restricted to the same origin, with data/blob images permitted for local demonstrations. Production does not allow JavaScript evaluation via `unsafe-eval`.

Static Next.js pages require inline hydration scripts, so the policy explicitly allows inline scripts and styles. It blocks inline event handlers, external framing, and plugins, but is not a strict nonce-based XSS defense. User input must continue to be rendered as text; the only HTML injections are the constant startup theme script and escaped, build-owned source highlighting.
