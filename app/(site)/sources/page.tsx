import { readFile } from "node:fs/promises";
import Link from "next/link";
import { sources, catalog } from "@/data/catalog";
import { Icon } from "@/components/ui/Icon";
export const metadata = { title: "Sources & licenses" };
export default async function SourcesPage() {
  const licenses = await Promise.all(sources.map((s) => readFile(`licenses/${s.id}.txt`, "utf8")));
  return (
    <div className="document-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">MADE BY THE COMMUNITY</div>
          <h1>Good work deserves credit.</h1>
          <p>{sources.length} libraries. Independent makers. A shared love of the details.</p>
        </div>
      </div>
      <p className="document-intro">
        Every component in Elements comes from an MIT-licensed, open-source repository. We keep the
        original visual style, adapt imports for portable React examples, and include the original
        license with every export.
      </p>
      {sources.map((source, index) => {
        const items = catalog.filter((c) => c.source === source.id);
        return (
          <section className="source-entry" key={source.id}>
            <span className={`source-mark ${source.id}`}>{source.initials}</span>
            <div className="source-entry-content">
              <h2>{source.name}</h2>
              <p>{source.description}</p>
              <p>
                {items.length} components · MIT license · Pinned to{" "}
                <code>{items[0].commit.slice(0, 12)}</code>
              </p>
              <div className="source-links">
                <Link className="mac-button" href={`/?source=${source.id}`}>
                  Explore components <Icon name="forward" size={12} />
                </Link>
                <a className="mac-button" href={source.github} target="_blank" rel="noreferrer">
                  <Icon name="github" size={13} />
                  Repository <Icon name="external" size={11} />
                </a>
              </div>
              <details>
                <summary>Read the MIT license</summary>
                <pre className="license-text">{licenses[index]}</pre>
              </details>
            </div>
          </section>
        );
      })}
      <div className="source-entry">
        <div className="source-entry-content">
          <h2>The foundations</h2>
          <p>
            The examples also use React, Tailwind CSS, Motion, Lucide, Phosphor, and small utility
            packages. Selected base controls are derived from shadcn/ui. The shell uses Phosphor
            icons and the macOS community design kit as a visual reference. Dependency licenses
            remain with their packages. The Pacifico font’s OFL license is included with Shape Hero.
          </p>
          <p>
            The sample SVG artwork is original to this catalog and is included in component exports.
            Local adaptations and pinned revisions are recorded in the repository’s
            THIRD_PARTY_NOTICES.md.
          </p>
          <a
            className="text-button"
            href="https://github.com/NikroZorkin/ElementsUIforKitty"
            target="_blank"
            rel="noreferrer"
          >
            View the catalog repository <Icon name="external" size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
