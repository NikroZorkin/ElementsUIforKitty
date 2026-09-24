export type CategoryId =
  | "buttons"
  | "cards"
  | "text"
  | "backgrounds"
  | "navigation"
  | "galleries"
  | "sections"
  | "feedback";
export type SourceId = "kokonut" | "smoothui" | "beui" | "magicui";
export type CatalogItem = {
  slug: string;
  title: string;
  category: CategoryId;
  source: SourceId;
  description: string;
  tags: string[];
  path: string;
  sourceUrl: string;
  commit: string;
  featured: boolean;
  order: number;
};
export type SourceFile = { path: string; content: string; language: string };
export type SourceBundle = {
  files: SourceFile[];
  dependencies: Record<string, string>;
  usage: string;
  prompt: string;
};
