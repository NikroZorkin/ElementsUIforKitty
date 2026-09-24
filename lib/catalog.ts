import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { codeToHtml } from "shiki";
import type { SourceBundle } from "@/types/catalog";
import { findItem } from "@/data/catalog";

export const getBundle = cache(async (slug: string): Promise<SourceBundle> => {
  if (!findItem(slug)) throw new Error("Unknown component");
  return JSON.parse(
    await readFile(path.join(process.cwd(), "data/generated", slug + ".json"), "utf8"),
  );
});
export const getHighlightedFiles = cache(async (slug: string) => {
  const bundle = await getBundle(slug);
  return Promise.all(
    bundle.files.map(async (file) => ({
      ...file,
      html: await codeToHtml(file.content, {
        lang: file.language,
        themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
        defaultColor: "light",
      }),
    })),
  );
});
