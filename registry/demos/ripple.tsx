/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { Ripple as Component } from "../magicui/Ripple";
export default function Demo() {
  return (
    <>
      <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-background p-8">
        <Component mainCircleSize={120} numCircles={7} />
        <div className="pointer-events-none relative z-10 max-w-sm text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
            A background for your next idea
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">A small ripple.</h2>
        </div>
      </div>
    </>
  );
}
