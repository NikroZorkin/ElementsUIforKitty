/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { Meteors as Component } from "../magicui/Meteors";
export default function Demo() {
  return (
    <>
      <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-background p-8">
        <Component number={18} minDuration={3} maxDuration={7} />
        <div className="pointer-events-none relative z-10 max-w-sm text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground">
            A background for your next idea
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">After the sun goes down.</h2>
        </div>
      </div>
    </>
  );
}
