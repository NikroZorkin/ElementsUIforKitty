import entries from "./entries.json";
import type { CatalogItem, CategoryId } from "@/types/catalog";

export const categories: { id: CategoryId; label: string; description: string }[] = [
  {
    id: "buttons",
    label: "Buttons & Controls",
    description: "Small interactions that make every click feel considered.",
  },
  {
    id: "cards",
    label: "Cards",
    description: "A place for your content. A little room for surprise.",
  },
  {
    id: "text",
    label: "Text & Typography",
    description: "Words with rhythm, movement, and a personality of their own.",
  },
  {
    id: "backgrounds",
    label: "Backgrounds",
    description: "Atmosphere in motion, from quiet gradients to interactive fields.",
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Give people a clear, satisfying way to move around.",
  },
  {
    id: "galleries",
    label: "Galleries & Carousels",
    description: "Collections that invite you to look a little closer.",
  },
  {
    id: "sections",
    label: "Sections",
    description: "Compose a page with animated heroes and scroll interactions.",
  },
  {
    id: "feedback",
    label: "Feedback & Loaders",
    description: "Make waiting, progress, and confirmation feel human.",
  },
];

export const sources = [
  {
    id: "magicui",
    name: "Magic UI",
    author: "Magic UI contributors",
    url: "https://magicui.design",
    github: "https://github.com/magicuidesign/magicui",
    initials: "M",
    description: "Buttons, animated borders, backgrounds, and small interactive details.",
  },
  {
    id: "kokonut",
    name: "Kokonut UI",
    author: "Dorian Baffier",
    url: "https://kokonutui.com",
    github: "https://github.com/kokonut-labs/kokonutui",
    initials: "K",
    description:
      "Expressive React components, with playful cards, text effects, and thoughtful interactions.",
  },
  {
    id: "smoothui",
    name: "SmoothUI",
    author: "Eduardo Calvo",
    url: "https://smoothui.dev",
    github: "https://github.com/educlopez/smoothui",
    initials: "S",
    description:
      "Motion components with spring physics, interactive materials, and accessible controls.",
  },
  {
    id: "beui",
    name: "beUI",
    author: "Saurabh Chauhan",
    url: "https://beui.dev",
    github: "https://github.com/starc007/ui-components",
    initials: "b",
    description: "Focused motion primitives for navigation, galleries, and product interfaces.",
  },
] as const;

const featured = [
  "glass-card",
  "card-flip",
  "aurora-curtain",
  "particle-button",
  "card-stack",
  "sliced-text",
  "dock",
  "liquid-metal",
  "project-folder",
  "coverflow-carousel",
  "pixel-flow-field",
  "apple-activity-card",
];
export const catalog = entries.map((entry, index): CatalogItem => ({
  ...entry,
  category: entry.category as CategoryId,
  source: entry.source as CatalogItem["source"],
  description: entry.description,
  tags: [
    entry.category,
    "react",
    "tailwind",
    ...(/button|card|text|carousel|scroll/.exec(entry.slug) ?? []),
    ...([
      "beams-background",
      "aurora-curtain",
      "liquid-metal",
      "gravity-stars",
      "pixel-flow-field",
      "flow-field",
    ].includes(entry.slug)
      ? ["canvas", "interactive"]
      : ["motion"]),
  ],
  featured: featured.includes(entry.slug),
  order: featured.includes(entry.slug) ? featured.indexOf(entry.slug) : featured.length + index,
}));

export function findItem(slug: string) {
  return catalog.find((item) => item.slug === slug);
}
export function findSource(id: string) {
  return sources.find((source) => source.id === id)!;
}
