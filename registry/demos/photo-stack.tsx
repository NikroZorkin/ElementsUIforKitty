/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/PhotoStack";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Click or drag to turn the page.">
      <Component
        photos={[1, 2, 3, 4, 5].map((i) => ({
          id: String(i),
          src: `/media/art-0${i}.svg`,
          alt: `Field notes poster ${i}`,
        }))}
      />
    </DemoFrame>
  );
}
