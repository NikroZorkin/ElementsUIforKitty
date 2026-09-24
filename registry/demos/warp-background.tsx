/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { WarpBackground as Component } from "../magicui/WarpBackground";
export default function Demo() {
  return (
    <>
      <Component className="flex min-h-[420px] w-full items-center justify-center p-14">
        <div className="pointer-events-none relative z-10 max-w-sm text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
            A background for your next idea
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">A different dimension.</h2>
        </div>
      </Component>
    </>
  );
}
