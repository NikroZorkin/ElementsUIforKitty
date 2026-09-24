/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/HoverExpand";
import { artworks } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Hover, click or use the arrow keys to explore."}>
      <Component
        className="h-64 w-full max-w-lg"
        items={artworks.slice(0, 4).map((art) => ({ ...art, image: art.src, alt: art.title }))}
      />
    </DemoFrame>
  );
}
