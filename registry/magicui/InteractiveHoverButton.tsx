/** Magic UI · MIT. License: licenses/magicui.txt
 * Source: https://github.com/magicuidesign/magicui/blob/d7207e5692d14c00dceafa8488d6d01f197fa0e4/apps/www/registry/magicui/interactive-hover-button.tsx
 * Adapted imports for portable React. */
"use client";
import { ArrowRight } from "lucide-react";

import { cn } from "../shared/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8] group-focus-visible:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-focus-visible:translate-x-12 group-hover:opacity-0 group-focus-visible:opacity-0">
          {children}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-focus-visible:-translate-x-5 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
