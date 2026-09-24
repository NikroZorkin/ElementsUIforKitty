/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/OrbitalImageWheel";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Drag to explore the collection.">
      <Component
        className="h-[380px] w-full"
        radius={130}
        items={[1, 2, 3, 4, 5, 6].map((i) => ({
          id: String(i),
          image: `/media/art-0${i}.svg`,
          alt: `Field notes poster ${i}`,
          label: `Edition 0${i}`,
        }))}
      />
    </DemoFrame>
  );
}
