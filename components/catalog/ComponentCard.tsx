"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CatalogItem } from "@/types/catalog";
import { findSource } from "@/data/catalog";
import { useTheme } from "@/components/layout/ThemeProvider";
import { PreviewFrame } from "@/components/demos/PreviewFrame";
import { Icon } from "@/components/ui/Icon";

export function ComponentCard({
  item,
  favorite,
  onFavorite,
  active,
  activate,
  deactivate,
  index = 0,
}: {
  item: CatalogItem;
  favorite: boolean;
  onFavorite: () => void;
  active: boolean;
  activate: () => void;
  deactivate: () => void;
  index?: number;
}) {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) deactivate();
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [deactivate]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setReady(false);
      activate();
    }, 200);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    deactivate();
    setReady(false);
  };
  const source = findSource(item.source);
  return (
    <article
      ref={ref}
      className="component-card"
      style={{ "--enter-delay": `${Math.min(index, 8) * 32}ms` } as CSSProperties}
      onMouseEnter={enter}
      onMouseLeave={leave}
      data-component={item.slug}
    >
      <div className="card-preview">
        {/* Real screenshots are generated from the same local demo used by the iframe. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="preview-image"
          src={`/thumbnails/${item.slug}-${theme}.jpg`}
          alt={`${item.title} component preview`}
          width={600}
          height={420}
          loading={item.order < 6 ? "eager" : "lazy"}
        />
        {active && (
          <PreviewFrame
            className={ready ? "card-iframe ready" : "card-iframe"}
            src={`/preview/${item.slug}?mode=card&theme=${theme}`}
            title={`Live preview: ${item.title}`}
            viewportWidth={item.category === "sections" ? 1440 : 600}
            tabIndex={-1}
            onReady={() => setReady(true)}
          />
        )}
        <Link
          className="preview-link"
          href={`/components/${item.slug}`}
          aria-label={`Explore ${item.title}`}
          onFocus={enter}
          onBlur={leave}
        >
          <span className="preview-open">
            <Icon name="external" size={14} />
          </span>
        </Link>
        <span className={`preview-badge ${active && ready ? "is-live" : ""}`}>
          {active && ready ? (
            <>
              <span />
              Live preview
            </>
          ) : item.featured ? (
            <>
              <Icon name="backgrounds" size={11} />
              Featured
            </>
          ) : null}
        </span>
        <button
          className={`save-button ${favorite ? "is-saved" : ""}`}
          onClick={onFavorite}
          aria-label={`${favorite ? "Unsave" : "Save"} ${item.title}`}
          aria-pressed={favorite}
          title={favorite ? "Remove from saved" : "Save component"}
        >
          <Icon name="bookmark" size={16} filled={favorite} />
        </button>
        <button
          className="touch-preview"
          onClick={() => {
            if (active) leave();
            else {
              setReady(false);
              activate();
            }
          }}
          aria-label={`${active ? "Stop" : "Play"} ${item.title} preview`}
        >
          <Icon name={active ? "close" : "play"} size={13} />
        </button>
      </div>
      <div className="card-meta">
        <div>
          <Link className="card-title" href={`/components/${item.slug}`}>
            {item.title}
          </Link>
          <p className="card-description">{item.description}</p>
          <Link className="card-source" href={`/?source=${source.id}`}>
            <span className={`source-mark ${source.id}`}>{source.initials}</span>
            {source.name}
          </Link>
        </div>
        <span className="card-language">React</span>
      </div>
    </article>
  );
}
