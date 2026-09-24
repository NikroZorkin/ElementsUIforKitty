/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ExpandableCards";
import { artworks } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Select a card to read its story."}>
      <Component
        className="w-full"
        cards={artworks.slice(0, 3).map((art, index) => ({
          id: index,
          image: art.src,
          title: art.title,
          content: art.description,
        }))}
      />
    </DemoFrame>
  );
}
