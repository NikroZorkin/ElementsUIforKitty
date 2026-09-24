/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/CoverflowCarousel";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Drag, or use the arrow keys.">
      <Component
        className="w-full"
        items={[1, 2, 3, 4, 5].map((i) => ({
          id: String(i),
          image: `/media/art-0${i}.svg`,
          alt: `Field notes poster ${i}`,
        }))}
      />
    </DemoFrame>
  );
}
