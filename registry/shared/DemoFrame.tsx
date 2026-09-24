/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
import type { ReactNode } from "react";

/** Layout for this example only. The component itself has no catalog dependency. */
export function DemoFrame({
  children,
  className = "",
  hint,
}: {
  children: ReactNode;
  className?: string;
  hint?: string;
}) {
  return (
    <div
      className={`relative flex min-h-[420px] w-full flex-col items-center justify-center gap-7 overflow-hidden p-8 ${className}`}
    >
      {children}
      {hint && (
        <p className="text-center text-xs text-muted-foreground" role="status">
          {hint}
        </p>
      )}
    </div>
  );
}
