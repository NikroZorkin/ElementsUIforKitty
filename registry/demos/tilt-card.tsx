/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/TiltCard";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <Component className="w-72 rounded-2xl border border-border bg-card p-7">
        <div data-tilt-depth="30" className="mb-14 text-sm text-muted-foreground">
          FIELD NOTES — 01
        </div>
        <div data-tilt-depth="55">
          <div className="mb-6 size-20 rounded-full bg-gradient-to-br from-orange-200 via-rose-300 to-indigo-500 shadow-xl" />
          <h2 className="text-3xl font-semibold tracking-tight">
            Another
            <br />
            perspective.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Move a little. See a little more.</p>
        </div>
      </Component>
    </DemoFrame>
  );
}
