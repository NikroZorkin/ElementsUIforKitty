/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { LightRays as Component } from "../magicui/LightRays";
export default function Demo() {
  return (
    <>
      <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-background p-8">
        <Component color="rgba(84,153,227,0.65)" speed={5} blur={22} />
        <div className="pointer-events-none relative z-10 max-w-sm text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
            A background for your next idea
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">Let a little light in.</h2>
        </div>
      </div>
    </>
  );
}
