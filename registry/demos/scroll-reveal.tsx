/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { ScrollReveal as Component } from "../beui/ScrollReveal";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <div className="grid w-full max-w-md gap-5">
        {["Start with an idea.", "Give it some space.", "Make it your own."].map((text, i) => (
          <Component key={text} delay={i * 0.15}>
            <div className="flex items-center gap-5 rounded-xl border border-border bg-card p-6">
              <span className="text-sm text-muted-foreground">0{i + 1}</span>
              <h2 className="text-xl font-medium tracking-tight">{text}</h2>
            </div>
          </Component>
        ))}
      </div>
    </DemoFrame>
  );
}
