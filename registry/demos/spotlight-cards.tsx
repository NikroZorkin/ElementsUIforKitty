/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/SpotlightCards";
import { Zap, Lock, Globe, Code } from "lucide-react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame className="h-[420px] p-0">
      <div className="w-full shrink-0 scale-[.68] flex justify-center">
        <Component
          items={[
            {
              icon: Zap,
              title: "Instant",
              description: "Small details. A satisfying response.",
              color: "#f59e0b",
            },
            {
              icon: Lock,
              title: "Thoughtful",
              description: "Keep the essentials close at hand.",
              color: "#60a5fa",
            },
            {
              icon: Globe,
              title: "Connected",
              description: "A shared space for your next idea.",
              color: "#34d399",
            },
            {
              icon: Code,
              title: "Made for you",
              description: "A little room to make it your own.",
              color: "#a78bfa",
            },
          ]}
        />
      </div>
    </DemoFrame>
  );
}
