"use client";
import { useEffect, Component as ReactComponent, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { demos } from "@/data/generated/preview-registry";
class PreviewErrorBoundary extends ReactComponent<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div
        role="alert"
        className="flex min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <p>This preview needs a fresh start.</p>
        <button className="demo-action" onClick={() => location.reload()}>
          Reload preview
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function PreviewRenderer({ slug }: { slug: string }) {
  useEffect(() => {
    const root = document.querySelector(`[data-demo="${slug}"]`);
    if (!root) return;
    let cancelled = false;
    const signal = () => {
      if (!root.children.length || root.querySelector("[data-preview-loading]")) return;
      observer.disconnect();
      void document.fonts.ready.then(() =>
        requestAnimationFrame(() => {
          root.setAttribute("data-preview-ready", "true");
          if (!cancelled)
            window.parent.postMessage({ type: "kitty-preview-ready", slug }, location.origin);
        }),
      );
    };
    const observer = new MutationObserver(signal);
    observer.observe(root, { childList: true, subtree: true });
    signal();
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [slug]);
  const Demo = demos[slug];
  return (
    <MotionConfig reducedMotion="user">
      <PreviewErrorBoundary>
        <div data-demo={slug} style={{ minHeight: "100vh", display: "grid", alignItems: "center" }}>
          <Demo />
        </div>
      </PreviewErrorBoundary>
    </MotionConfig>
  );
}
