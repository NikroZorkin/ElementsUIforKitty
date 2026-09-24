"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function CopyButton({
  value,
  label = "Copy code",
  primary = false,
  className,
}: {
  value: string;
  label?: string;
  primary?: boolean;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.append(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        className={cn("mac-button", primary && "mac-button-primary", className)}
      >
        <Icon
          name={status === "copied" ? "check" : label.includes("AI") ? "backgrounds" : "copy"}
          size={14}
        />
        {status === "copied" ? "Copied!" : label}
      </button>
      <span role="status" className={status === "error" ? "copy-error" : "sr-only"}>
        {status === "error"
          ? "Could not copy. Select the code and copy it manually."
          : status === "copied"
            ? `${label} copied to clipboard`
            : ""}
      </span>
    </span>
  );
}
