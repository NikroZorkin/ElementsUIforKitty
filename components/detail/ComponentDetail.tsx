"use client";
import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import type { CatalogItem, SourceBundle, SourceFile } from "@/types/catalog";
import { catalog, categories, findSource } from "@/data/catalog";
import { useFavorites } from "@/lib/preferences";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Icon } from "@/components/ui/Icon";
import { CopyButton } from "@/components/ui/CopyButton";
import { PreviewFrame } from "@/components/demos/PreviewFrame";
import { ComponentCard } from "@/components/catalog/ComponentCard";
import { TabIndicator } from "@/components/ui/TabIndicator";

type Highlighted = SourceFile & { html: string };
const tabs = ["source", "usage", "license"] as const;
type Tab = (typeof tabs)[number];

export function ComponentDetail({
  item,
  bundle,
  files,
}: {
  item: CatalogItem;
  bundle: SourceBundle;
  files: Highlighted[];
}) {
  const { favorites, toggle } = useFavorites(),
    { theme } = useTheme();
  const indicatorId = useId();
  const [tab, setTab] = useState<Tab>("source"),
    [fileIndex, setFileIndex] = useState(0),
    [width, setWidth] = useState("100%"),
    [restart, setRestart] = useState(0),
    [previewTheme, setPreviewTheme] = useState<string | null>(null),
    [active, setActive] = useState<string | null>(null);
  const source = findSource(item.source),
    category = categories.find((c) => c.id === item.category)!;
  const favorite = favorites.includes(item.slug);
  const file = files[fileIndex],
    related = catalog
      .filter((c) => c.category === item.category && c.slug !== item.slug)
      .sort((a, b) => a.order - b.order)
      .slice(0, 3);
  const [loadedKey, setLoadedKey] = useState("");
  const resolvedTheme = previewTheme ?? theme;
  const previewKey = `${item.slug}-${restart}-${resolvedTheme}`;
  const install =
    "npm install " +
    Object.entries(bundle.dependencies)
      .map(([name, version]) => `${name}@${version}`)
      .join(" ");
  const keyboardTabs = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (tabs.indexOf(tab) + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[index]);
    (event.currentTarget.querySelectorAll("button")[index] as HTMLButtonElement)?.focus();
  };
  return (
    <div className="detail-page">
      <Link className="back-link" href={`/category/${item.category}`}>
        <Icon name="back" size={13} />
        {category.label}
      </Link>
      <div className="detail-heading">
        <div>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
        <div className="detail-actions">
          <button
            className="mac-button"
            aria-label={`${favorite ? "Unsave" : "Save"} ${item.title}`}
            aria-pressed={favorite}
            onClick={() => toggle(item.slug)}
          >
            <Icon name="bookmark" size={15} filled={favorite} />
            {favorite ? "Saved" : "Save"}
          </button>
          <CopyButton value={bundle.prompt} label="Copy for AI" primary />
        </div>
      </div>
      <div className="detail-source">
        <Link href={`/?source=${source.id}`}>
          <span className={`source-mark ${source.id}`}>{source.initials}</span>
          {source.name}
        </Link>
        <i />
        <span className="tag">React</span>
        <span className="tag">Tailwind CSS</span>
        <span className="tag">MIT</span>
        <i />
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">
          Original source <Icon name="external" size={11} />
        </a>
      </div>
      <section className="preview-panel" aria-label="Interactive component preview">
        <div className="panel-toolbar">
          <span className="toolbar-label">
            <span className="status-dot" />
            Live preview
          </span>
          <span className="toolbar-spacer" />
          <div className="preview-controls" aria-label="Preview width">
            <button
              aria-label="Full width preview"
              aria-pressed={width === "100%"}
              onClick={() => setWidth("100%")}
              title="Full width"
            >
              <Icon name="monitor" size={15} />
            </button>
            <button
              className="tablet-control"
              aria-label="Tablet preview"
              aria-pressed={width === "768px"}
              onClick={() => setWidth("768px")}
              title="Tablet · 768px"
            >
              <Icon name="tablet" size={15} />
            </button>
            <button
              aria-label="Mobile preview"
              aria-pressed={width === "320px"}
              onClick={() => setWidth("320px")}
              title="Mobile · 320px"
            >
              <Icon name="mobile" size={15} />
            </button>
          </div>
          <span className="divider" />
          <button
            className="icon-button"
            aria-label="Toggle preview theme"
            onClick={() => setPreviewTheme(resolvedTheme === "dark" ? "light" : "dark")}
            title="Toggle preview theme"
          >
            <Icon name={resolvedTheme === "dark" ? "moon" : "sun"} size={15} />
          </button>
          <button
            className="icon-button"
            aria-label="Restart preview"
            onClick={() => setRestart((r) => r + 1)}
            title="Restart preview"
          >
            <Icon name="reset" size={15} />
          </button>
        </div>
        <div className="preview-stage">
          {loadedKey !== previewKey && (
            <div className="preview-loading" role="status">
              <Icon name="loading" size={20} />
              <span>Getting the details ready…</span>
            </div>
          )}
          <PreviewFrame
            key={previewKey}
            className="detail-iframe"
            style={{ width }}
            src={`/preview/${item.slug}?theme=${resolvedTheme}`}
            title={`Interactive ${item.title} preview`}
            onReady={() => setLoadedKey(previewKey)}
          />
        </div>
        <div className="preview-caption">
          <span>
            {item.slug.includes("scroll")
              ? "Scroll inside the preview to explore the animation."
              : "Go ahead. Click, hover, and make yourself at home."}
          </span>
          <a href={`/preview/${item.slug}?theme=${resolvedTheme}`} target="_blank" rel="noreferrer">
            Open preview <Icon name="external" size={11} />
          </a>
        </div>
      </section>
      <div
        className="detail-tabs"
        role="tablist"
        aria-label="Component documentation"
        onKeyDown={keyboardTabs}
      >
        {tabs.map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            aria-selected={tab === t}
            aria-controls="documentation-panel"
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
          >
            <Icon name={t === "source" ? "code" : t === "usage" ? "sections" : "info"} size={14} />
            {t === "source" ? "Source code" : t === "usage" ? "How to use" : "License & credits"}
            {tab === t && <TabIndicator id={indicatorId} />}
          </button>
        ))}
      </div>
      <section
        key={tab}
        className="tab-content"
        id="documentation-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
      >
        {tab === "source" ? (
          <div className="source-layout">
            <div className="source-main">
              <div className="code-panel">
                <div className="panel-toolbar">
                  <div className="file-select">
                    <Icon name="code" size={14} />
                    <select
                      aria-label="Source file"
                      value={fileIndex}
                      onChange={(e) => setFileIndex(Number(e.target.value))}
                    >
                      {files.map((f, index) => (
                        <option value={index} key={f.path}>
                          {f.path}
                        </option>
                      ))}
                    </select>
                  </div>
                  <CopyButton value={file.content} label="Copy code" />
                </div>
                <div className="code-files-bar" aria-label="Source files">
                  {files
                    .filter((f) => !f.path.startsWith("licenses/") && !f.path.startsWith("public/"))
                    .map((f) => (
                      <button
                        key={f.path}
                        aria-pressed={file.path === f.path}
                        onClick={() => setFileIndex(files.indexOf(f))}
                      >
                        {f.path.split("/").pop()}
                      </button>
                    ))}
                </div>
                <div
                  key={file.path}
                  className="code-content"
                  tabIndex={0}
                  aria-label={`Source code for ${file.path}`}
                  dangerouslySetInnerHTML={{ __html: file.html }}
                />
                <div className="code-status">
                  <span>
                    {file.content.split("\n").length} lines · {file.language}
                  </span>
                  <span>{files.length} files in this example</span>
                </div>
              </div>
            </div>
            <aside className="source-aside">
              <div>
                <h3>Make it yours</h3>
                <p>
                  <strong>Copy code</strong> copies the selected file.
                  <br />
                  <strong>Copy for AI</strong> includes every file, dependency, asset, and setup
                  instruction.
                </p>
              </div>
              <div>
                <h3>A little credit</h3>
                <p>
                  Created by{" "}
                  <a href={source.github} target="_blank" rel="noreferrer">
                    {source.name}
                  </a>{" "}
                  and shared under MIT. Keep the included license when you use the code.
                </p>
              </div>
              <div>
                <h3>Need a hand?</h3>
                <p>
                  <Link href="/getting-started">Read the getting started guide ↗</Link>
                </p>
              </div>
            </aside>
          </div>
        ) : tab === "usage" ? (
          <div className="usage-content">
            <h2>01 · Install the dependencies</h2>
            <p>
              Use React 19 and Tailwind CSS 4. Install the packages used by this specific component.
            </p>
            <div className="terminal-block">
              <code>{install}</code>
              <CopyButton value={install} label="Copy" />
            </div>
            <h2>02 · Bring the files into your project</h2>
            <p>
              Keep the relative folder structure. Copy for AI gives your coding assistant the
              complete example, including styles and local artwork.
            </p>
            <div className="file-list">
              {files
                .filter((f) => !f.path.startsWith("licenses/"))
                .map((f) => (
                  <code key={f.path}>{f.path}</code>
                ))}
            </div>
            <CopyButton value={bundle.prompt} label="Copy complete example" primary />
            <h2>03 · Add the example</h2>
            <p>
              Import the demo stylesheet once. Its tokens and keyframes support the component’s
              original appearance; merge them into your existing Tailwind setup if needed.
            </p>
            <div className="terminal-block">
              <code style={{ whiteSpace: "pre-wrap" }}>{bundle.usage}</code>
              <CopyButton value={bundle.usage} label="Copy" />
            </div>
            <h2>04 · Make it fit</h2>
            <p>
              The demo shows the props and event handlers in use. Replace its sample content and
              connect the callbacks to your application. Add <code>.dark</code> to your root element
              for dark variants. Keep the copyright and license files with your code.
            </p>
          </div>
        ) : (
          <div className="usage-content">
            <h2>Built by {source.name}</h2>
            <p>
              The original code is pinned to revision <code>{item.commit.slice(0, 12)}</code>. The
              catalog adapts imports for plain React, provides local sample media, and includes
              compatibility and accessibility fixes. The original visual style is preserved.
            </p>
            <p style={{ margin: "12px 0 20px" }}>
              <a className="text-button" href={item.sourceUrl} target="_blank" rel="noreferrer">
                View this version on GitHub <Icon name="external" size={12} />
              </a>
            </p>
            {files
              .filter((f) => f.path.startsWith("licenses/"))
              .map((f) => (
                <div key={f.path}>
                  <h2>{f.path.split("/").pop()}</h2>
                  <pre className="license-text">{f.content}</pre>
                </div>
              ))}
          </div>
        )}
      </section>
      <section className="related-section">
        <div className="related-heading">
          <h2>A few more to explore</h2>
          <Link href={`/category/${category.id}`}>
            View {category.label.toLowerCase()} <Icon name="forward" size={12} />
          </Link>
        </div>
        <div className="component-grid">
          {related.map((c) => (
            <ComponentCard
              key={c.slug}
              item={c}
              favorite={favorites.includes(c.slug)}
              onFavorite={() => toggle(c.slug)}
              active={active === c.slug}
              activate={() => setActive(c.slug)}
              deactivate={() => setActive((current) => (current === c.slug ? null : current))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
