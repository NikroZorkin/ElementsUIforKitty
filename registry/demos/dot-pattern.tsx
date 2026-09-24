/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { DotPattern } from "../magicui/DotPattern";

export default function Demo() {
  return (
    <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-background p-8">
      <DotPattern
        glow
        width={24}
        height={24}
        cr={1.4}
        className="text-foreground/50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="relative z-10 max-w-sm text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
          Small details, quietly moving
        </p>
        <h2 className="text-4xl font-semibold tracking-tight">Connect the dots.</h2>
      </div>
    </div>
  );
}
