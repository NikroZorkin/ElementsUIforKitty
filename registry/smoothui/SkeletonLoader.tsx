/** SmoothUI · MIT. License: licenses/smoothui.txt
 * Source: https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/components/skeleton-loader/index.tsx
 * Adapted imports for portable React. */
"use client";

import { cn } from "../shared/utils";
import type { ReactNode } from "react";

export interface SkeletonProps {
  /** Content to wrap - skeleton will match its dimensions */
  children?: ReactNode;
  /** Additional classes */
  className?: string;
  /** When true, shows skeleton effect. When false, shows children */
  loading?: boolean;
}

const Skeleton = ({ loading = true, children, className }: SkeletonProps) => {
  // If not loading and has children, just render children
  if (!loading && children) {
    return <>{children}</>;
  }

  // If loading with children, wrap them and apply skeleton effect
  if (loading && children) {
    return (
      <div aria-busy="true" aria-live="polite" className={cn("relative", className)}>
        {/* Children are invisible but maintain layout */}
        <div className="invisible">{children}</div>
        {/* Skeleton overlay that matches children's dimensions */}
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-[inherit] bg-muted-foreground/20"
        />
      </div>
    );
  }

  // Basic skeleton block (no children)
  return (
    <div
      aria-busy="true"
      className={cn("animate-pulse rounded-md bg-muted-foreground/20", className)}
    />
  );
};

export default Skeleton;
