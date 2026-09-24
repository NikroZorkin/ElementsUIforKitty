# Third-party notices

The local component sources are the same files executed by the live demos and exposed by the source viewer. Only selected free, MIT-licensed sources are redistributed.

| Library    | Repository                                | Pinned commit                            | Components | License                                            |
| ---------- | ----------------------------------------- | ---------------------------------------- | ---------: | -------------------------------------------------- |
| Kokonut UI | https://github.com/kokonut-labs/kokonutui | 83eec6d982d400a18438001a8efdbac1f159dd43 |         29 | [MIT](licenses/kokonut.txt), © 2025 kokonutUI      |
| SmoothUI   | https://github.com/educlopez/smoothui     | df0453c967224a91d460aa3bd1786c737c2c95bc |         77 | [MIT](licenses/smoothui.txt), © 2024 Eduardo Calvo |
| beUI       | https://github.com/starc007/ui-components | fa3393a3891723d4d2daec1f1d82ead175442f44 |          8 | [MIT](licenses/beui.txt), © 2026 Saurabh Chauhan   |
| Magic UI   | https://github.com/magicuidesign/magicui  | d7207e5692d14c00dceafa8488d6d01f197fa0e4 |         16 | [MIT](licenses/magicui.txt), © Magic UI            |

Exact upstream files are recorded in [data/provenance.json](data/provenance.json); entry URLs are in [data/entries.json](data/entries.json). No Pro examples are included.

## Local adaptations

The macOS treatment applies to the catalog shell. Original component colors, materials, layouts, and motion designs are retained.

- Relative imports replace application-specific aliases.
- Plain React adapters replace Next.js Image/Link.
- Six original, local SVG artworks replace remote sample media and are included in exports.
- A self-hosted Pacifico package replaces next/font.
- A portable style element replaces Card Flip's styled-jsx tag.
- Typed Motion transitions and browser timer types support React 19 without Next.js or Node type definitions.
- Particle Button invokes its declared callbacks and cleans up its timer.
- Hold Button confirms after a completed hold and supports pointer cancellation, keyboard, blur, and unmount cleanup.
- Card Flip supports keyboard and touch as well as pointer hover.
- Social Button reveals actions on focus/touch and removes hidden actions from the tab order.
- Toolbar's icon controls have accessible names.
- Matrix Text cleans up timers and respects reduced motion; Beams Background and Flow Field stop their canvas loops for reduced-motion users.
- Smooth Tab's gradient text and CSS color references compile correctly with Tailwind 4.
- Price Flow and the pricing section animate numbers with changing digit counts; section buttons expose callbacks used by the examples.
- Animated Progress Bar exposes progress semantics and animates with a transform.
- Magic UI's particle, grid, ray, and warp effects respect reduced motion; meteor and ripple keyframes are included in the portable stylesheet.
- Ripple Button cleans up its timers and supports keyboard activation; Interactive Hover Button exposes a single accessible label and mirrors hover effects on focus.
- Spinning Text, Dot Pattern, and Lens respect reduced motion. Shimmer Button and Neon Gradient Card include their animation keyframes in the portable stylesheet.
- Circular Progress clamps its value and exposes progress semantics. Social Hover Card accepts an optional initial open state for previews.
- Scramble Hover uses browser timer types and cleans up its timers on unmount.
- Number Flow, Animated Tags, Image Metadata Preview, and Dynamic Island use readable foreground colors in both themes. Tags are keyboard-operable buttons, expandable cards open their stories, and the island timer cleans up on unmount.
- Included example wrappers provide sample content, working callbacks, and preview layouts.

## Base controls and packages

Kokonut's Button and Card primitives derive from shadcn/ui. The [additional MIT notice](licenses/shadcn.txt), © 2023 shadcn, is included when those files are exported.

Shape Hero uses [Pacifico](https://github.com/googlefonts/Pacifico) through @fontsource/pacifico. Its [SIL Open Font License](licenses/pacifico.txt) is included in that export.

React, React DOM, Tailwind CSS, Motion, Lucide, Phosphor, Radix, Shiki, clsx, tailwind-merge, class-variance-authority, and react-use-measure retain the licenses distributed with their npm packages. Exact versions are pinned in package-lock.json; installation commands use those versions.

## Catalog design and original work

The shell references the [macOS community Figma kit](https://www.figma.com/design/TIVUCt5mozX2jlnWcfLR07/macOS-27--Community-?node-id=207-14490). The catalog composition, cat mark, code, and vector artwork were created for Elements for Kitty. Apple font files and Figma preview images are not redistributed.

Local examples, adapters, and SVG artwork are covered by [Elements' MIT license](licenses/elements.txt). Each export includes this notice and the licenses required by its upstream files.

## Repository presentation references

The README presentation was reviewed against [Glin UI](https://github.com/glincker/glinui) and [codex_oracle](https://github.com/Burntgogi/codex_oracle) on September 24, 2026. Both repositories declare an MIT license. The references informed the information hierarchy: a concise introduction, technology badges, section links, a demonstration, and a quick start. Their wording, branding, source code, and media are not redistributed. The README banner is original vector artwork. Component illustrations show this project's local demos.
