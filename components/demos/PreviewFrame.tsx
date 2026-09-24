"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export function PreviewFrame({
  src,
  title,
  className,
  style,
  onReady,
  tabIndex,
  viewportWidth,
}: {
  src: string;
  title: string;
  className?: string;
  style?: CSSProperties;
  onReady: () => void;
  tabIndex?: number;
  viewportWidth?: number;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || !viewportWidth) return;
    const update = () => setScale(parent.clientWidth / viewportWidth);
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    update();
    return () => observer.disconnect();
  }, [viewportWidth]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin === location.origin &&
        event.source === ref.current?.contentWindow &&
        event.data?.type === "kitty-preview-ready"
      )
        onReady();
    };
    if (ref.current?.contentDocument?.querySelector('[data-preview-ready="true"]')) onReady();
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onReady, src]);
  return (
    <iframe
      ref={ref}
      onLoad={() => {
        if (ref.current?.contentDocument?.querySelector('[data-preview-ready="true"]')) onReady();
      }}
      src={src}
      title={title}
      className={className}
      style={
        viewportWidth
          ? {
              ...style,
              width: viewportWidth,
              height: Math.round(viewportWidth * 0.7),
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }
          : style
      }
      tabIndex={tabIndex}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
