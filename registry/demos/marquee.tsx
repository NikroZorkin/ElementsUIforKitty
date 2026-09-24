/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { Marquee as Component } from "../beui/Marquee";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Pause on hover. Keep the conversation going.">
      <Component className="w-full" speed={35}>
        {[
          "Design is a conversation.",
          "Make room for play.",
          "Stay curious.",
          "Less, but better.",
        ].map((text) => (
          <div
            key={text}
            className="flex h-44 w-60 items-end rounded-xl border border-border bg-card p-6 text-2xl font-medium tracking-tight"
          >
            {text}
          </div>
        ))}
      </Component>
    </DemoFrame>
  );
}
