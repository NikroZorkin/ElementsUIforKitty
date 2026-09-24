"use client";
import Link from "next/link";
import { Suspense, useId, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { catalog, categories, sources, findSource } from "@/data/catalog";
import { useFavorites, usePreference, savePreference } from "@/lib/preferences";
import type { CategoryId } from "@/types/catalog";
import { Icon } from "@/components/ui/Icon";
import { ComponentCard } from "./ComponentCard";
import { TabIndicator } from "@/components/ui/TabIndicator";

type CatalogProps = { category?: CategoryId; saved?: boolean };
export function Catalog(props: CatalogProps) {
  return (
    <Suspense fallback={<CatalogView {...props} queryParams="" />}>
      <CatalogWithQuery {...props} />
    </Suspense>
  );
}
function CatalogWithQuery(props: CatalogProps) {
  const params = useSearchParams();
  return <CatalogView {...props} queryParams={params.toString()} />;
}
function CatalogView({
  category,
  saved = false,
  queryParams,
}: CatalogProps & { queryParams: string }) {
  const params = new URLSearchParams(queryParams);
  const path = usePathname();
  const indicatorId = useId();
  const { favorites, toggle } = useFavorites();
  const layout = usePreference("kitty-layout", "grid");
  const [active, setActive] = useState<string | null>(null);
  const query = params.get("q") ?? "",
    source = params.get("source") ?? "",
    sort = params.get("sort") ?? "featured",
    featured = params.get("featured") === "1";
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    window.history.replaceState(null, "", `${path}${next.size ? "?" + next : ""}`);
  };
  const categoryInfo = categories.find((c) => c.id === category),
    sourceInfo = source ? sources.find((s) => s.id === source) : undefined;
  const title = saved
    ? "Your collection"
    : (categoryInfo?.label ?? sourceInfo?.name ?? "All components");
  const description = saved
    ? "The little things you want to come back to. Saved on this device."
    : (categoryInfo?.description ??
      sourceInfo?.description ??
      "Thoughtfully selected. Ready to play with. Yours to build on.");
  const base = catalog.filter(
    (item) =>
      (!category || item.category === category) && (!saved || favorites.includes(item.slug)),
  );
  const visible = base
    .filter(
      (item) =>
        (!source || item.source === source) &&
        (!featured || item.featured) &&
        query
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .every((word) =>
            `${item.title} ${item.description} ${item.tags.join(" ")} ${findSource(item.source).name}`
              .toLowerCase()
              .includes(word),
          ),
    )
    .sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title) : a.order - b.order));
  const clear = () => {
    window.history.replaceState(null, "", path);
  };
  return (
    <div className="catalog-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            {saved
              ? "PERSONAL LIBRARY"
              : category
                ? "THE COLLECTION"
                : "A TOOLBOX FOR YOUR NEXT IDEA"}
          </div>
          <h1>
            {title}
            <span className="heading-count">{base.length}</span>
          </h1>
          <p>{description}</p>
        </div>
        <div className="collection-note">
          <span className="status-dot" />
          Free & open source
        </div>
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-tabs" aria-label="Component selection">
          <button
            className={!featured ? "active" : ""}
            aria-pressed={!featured}
            onClick={() => update("featured", "")}
          >
            All components
            {!featured && <TabIndicator id={indicatorId} />}
          </button>
          <button
            className={featured ? "active" : ""}
            aria-pressed={featured}
            onClick={() => update("featured", "1")}
          >
            <Icon name="backgrounds" size={14} />
            Featured
            {featured && <TabIndicator id={indicatorId} />}
          </button>
        </div>
        <div className="catalog-filters">
          <label className="select-control">
            <span className="sr-only">Filter by source</span>
            <select
              aria-label="Filter by source"
              value={source}
              onChange={(e) => update("source", e.target.value)}
            >
              <option value="">All sources</option>
              {sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <Icon name="down" size={12} />
          </label>
          <label className="select-control sort-control">
            <span className="sr-only">Sort components</span>
            <select
              aria-label="Sort components"
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Curated order</option>
              <option value="az">Name: A–Z</option>
            </select>
            <Icon name="down" size={12} />
          </label>
          <div className="view-switch">
            <button
              aria-label="Grid view"
              aria-pressed={layout !== "list"}
              onClick={() => savePreference("kitty-layout", "grid")}
            >
              <Icon name="grid" size={16} />
            </button>
            <button
              aria-label="List view"
              aria-pressed={layout === "list"}
              onClick={() => savePreference("kitty-layout", "list")}
            >
              <Icon name="rows" size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="results-line">
        <span aria-live="polite">
          {visible.length} component{visible.length !== 1 ? "s" : ""}
          {query && (
            <>
              {" "}
              matching <strong>“{query}”</strong>
            </>
          )}
        </span>
        <span className="preview-hint">
          <Icon name="play" size={11} />
          Hover to preview · Click to explore
        </span>
        {(query || source || featured) && (
          <button className="text-button" onClick={clear}>
            Clear filters <Icon name="close" size={11} />
          </button>
        )}
      </div>
      {visible.length > 0 ? (
        <div
          key={`${source}-${featured}-${sort}-${layout}`}
          className={`component-grid ${layout === "list" ? "list-view" : ""}`}
        >
          {visible.map((item, index) => (
            <ComponentCard
              key={item.slug}
              item={item}
              index={index}
              favorite={favorites.includes(item.slug)}
              onFavorite={() => toggle(item.slug)}
              active={active === item.slug}
              activate={() => setActive(item.slug)}
              deactivate={() => setActive((current) => (current === item.slug ? null : current))}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Icon name={saved && !base.length ? "bookmark" : "search"} size={32} />
          </div>
          <h2>{saved && !base.length ? "A home for your favorites" : "Nothing here just yet"}</h2>
          <p>
            {saved && !base.length
              ? "Save a component with the bookmark button. It’ll be waiting here when you need it."
              : "Try a different search, or clear your filters to explore the collection."}
          </p>
          {saved && !base.length ? (
            <Link className="mac-button mac-button-primary" href="/">
              Explore components <Icon name="forward" size={15} />
            </Link>
          ) : (
            <button className="mac-button" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
      )}
      <footer className="catalog-footer">
        <div>
          <Icon name="cube" size={16} />
          <span>Good things are better shared.</span>
        </div>
        <Link href="/sources">
          Meet the makers <Icon name="external" size={12} />
        </Link>
      </footer>
    </div>
  );
}
