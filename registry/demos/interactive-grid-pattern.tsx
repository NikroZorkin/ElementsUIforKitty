/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { InteractiveGridPattern } from "../magicui/InteractiveGridPattern";

export default function Demo() {
  return (
    <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-background p-8">
      <InteractiveGridPattern
        width={32}
        height={32}
        squares={[48, 24]}
        aria-hidden="true"
        className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"
        squaresClassName="hover:fill-blue-400/25"
      />
      <div className="pointer-events-none relative z-10 max-w-sm text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
          Move across the surface
        </p>
        <h2 className="text-4xl font-semibold tracking-tight">Room to explore.</h2>
      </div>
    </div>
  );
}
