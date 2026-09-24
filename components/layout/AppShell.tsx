"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MotionConfig } from "motion/react";
import { categories, catalog, sources } from "@/data/catalog";
import { useFavorites } from "@/lib/preferences";
import { Icon } from "@/components/ui/Icon";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function KittyMark() {
  return (
    <svg width="27" height="27" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M5 13V5l8 5a19 19 0 0 1 6 0l8-5v8c2 3 2 7 0 10-4 6-18 6-22 0-2-3-2-7 0-10Z"
        fill="currentColor"
      />
      <path
        d="m10 17 3 2-3 2m12-4-3 2 3 2"
        stroke="var(--surface)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Sidebar(props: { close?: () => void }) {
  return (
    <Suspense fallback={<SidebarContent {...props} />}>
      <SidebarWithQuery {...props} />
    </Suspense>
  );
}
function SidebarWithQuery(props: { close?: () => void }) {
  const params = useSearchParams();
  return <SidebarContent {...props} sourceFilter={params.get("source") ?? ""} />;
}
function SidebarContent({
  close,
  sourceFilter = "",
}: {
  close?: () => void;
  sourceFilter?: string;
}) {
  const path = usePathname(),
    { favorites } = useFavorites();
  const { preference, setTheme } = useTheme();
  const allActive = path === "/" && !sourceFilter;
  return (
    <>
      <Link href="/" className="brand" onClick={close}>
        <KittyMark />
        <span>
          Elements<small>for Kitty</small>
        </span>
      </Link>
      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="nav-label">Library</div>
        <Link
          className={allActive ? "nav-item selected" : "nav-item"}
          href="/"
          onClick={close}
          aria-current={allActive ? "page" : undefined}
        >
          <Icon name="grid" />
          <span>All components</span>
          <small>{catalog.length}</small>
        </Link>
        <Link
          className={path === "/saved" ? "nav-item selected" : "nav-item"}
          href="/saved"
          onClick={close}
          aria-current={path === "/saved" ? "page" : undefined}
        >
          <Icon name="bookmark" />
          <span>Saved</span>
          {favorites.length > 0 && <small>{favorites.length}</small>}
        </Link>
        <div className="nav-label category-label">Categories</div>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={path === `/category/${category.id}` ? "nav-item selected" : "nav-item"}
            href={`/category/${category.id}`}
            onClick={close}
            aria-current={path === `/category/${category.id}` ? "page" : undefined}
          >
            <Icon name={category.id} />
            <span>{category.label}</span>
            <small>{catalog.filter((c) => c.category === category.id).length}</small>
          </Link>
        ))}
        <div className="nav-label category-label">Made by the community</div>
        {sources.map((source) => (
          <Link
            href={`/?source=${source.id}`}
            key={source.id}
            onClick={close}
            className={
              path === "/" && sourceFilter === source.id ? "nav-item selected" : "nav-item"
            }
            aria-current={path === "/" && sourceFilter === source.id ? "page" : undefined}
          >
            <span className={`source-mark ${source.id}`}>{source.initials}</span>
            <span>{source.name}</span>
            <small>{catalog.filter((component) => component.source === source.id).length}</small>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link
          href="/getting-started"
          className={path === "/getting-started" ? "nav-item selected" : "nav-item"}
          aria-current={path === "/getting-started" ? "page" : undefined}
          onClick={close}
        >
          <Icon name="info" />
          <span>Getting started</span>
        </Link>
        <Link
          href="/sources"
          className={path === "/sources" ? "nav-item selected" : "nav-item"}
          aria-current={path === "/sources" ? "page" : undefined}
          onClick={close}
        >
          <Icon name="code" />
          <span>Sources & licenses</span>
        </Link>
        <div className="sidebar-bottom">
          <span>Appearance</span>
          <div className="theme-switch" aria-label="Appearance">
            {[
              ["light", "sun"],
              ["dark", "moon"],
              ["system", "monitor"],
            ].map(([value, icon]) => (
              <button
                type="button"
                key={value}
                onClick={() => setTheme(value)}
                aria-label={`${value[0].toUpperCase() + value.slice(1)} theme`}
                aria-pressed={preference === value}
                title={`${value} theme`}
              >
                <Icon name={icon} size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function Search() {
  const params = useSearchParams(),
    path = usePathname(),
    router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const isCatalog = path === "/" || path === "/saved" || path.startsWith("/category/");
  const [draft, setDraft] = useState("");
  const value = isCatalog ? (params.get("q") ?? "") : draft;
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
        input.current?.select();
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  const update = (next: string) => {
    if (!isCatalog) {
      setDraft(next);
      return;
    }
    const query = new URLSearchParams(params);
    if (next) query.set("q", next);
    else query.delete("q");
    window.history.replaceState(null, "", `${path}${query.size ? "?" + query : ""}`);
  };
  return (
    <form
      className="global-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isCatalog) router.push(`/?q=${encodeURIComponent(draft)}`);
      }}
    >
      <Icon name="search" size={16} />
      <input
        ref={input}
        aria-label="Search components"
        placeholder="Search components…"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            update("");
            input.current?.focus();
          }}
          aria-label="Clear search"
        >
          <Icon name="close" size={13} />
        </button>
      ) : (
        <kbd>⌘ K</kbd>
      )}
    </form>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const category = categories.find((c) => path === `/category/${c.id}`);
  const title =
    category?.label ??
    (path === "/saved"
      ? "Saved"
      : path.startsWith("/components/")
        ? "Component"
        : path === "/sources"
          ? "Sources & licenses"
          : path === "/getting-started"
            ? "Getting started"
            : "All components");
  return (
    <div className="desktop">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="app-window">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <div className="main-column">
          <header className="titlebar">
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button className="icon-button mobile-menu" aria-label="Open navigation">
                  <Icon name="sidebar" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="drawer-overlay" />
                <Dialog.Content className="drawer">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Browse the component library.
                  </Dialog.Description>
                  <Dialog.Close className="icon-button drawer-close" aria-label="Close navigation">
                    <Icon name="close" />
                  </Dialog.Close>
                  <Sidebar close={() => setOpen(false)} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className="breadcrumb">
              <Icon
                name={category?.id ?? (path.startsWith("/components/") ? "cube" : "folder")}
                size={19}
              />
              <span>{title}</span>
            </div>
            <Suspense
              fallback={
                <div className="global-search">
                  <Icon name="search" size={16} />
                  <input aria-label="Search components" placeholder="Search components…" readOnly />
                </div>
              }
            >
              <Search />
            </Suspense>
            <a
              className="icon-button github-link"
              href="https://github.com/NikroZorkin/ElementsUIforKitty"
              target="_blank"
              rel="noreferrer"
              title="View on GitHub"
              aria-label="View repository on GitHub"
            >
              <Icon name="github" size={20} />
            </a>
          </header>
          <main id="main" tabIndex={-1}>
            <div key={path} className="route-content">
              {children}
            </div>
          </main>
        </div>
      </div>
      <div className="desktop-caption">
        <span>A little UI goes a long way.</span>
        <span>React · Tailwind CSS · Open source</span>
      </div>
    </div>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Shell>{children}</Shell>
      </MotionConfig>
    </ThemeProvider>
  );
}
