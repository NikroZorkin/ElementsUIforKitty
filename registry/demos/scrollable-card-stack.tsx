/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ScrollableCardStack";
import { artworks } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame className="gap-4 p-6" hint={"Scroll or drag through the collection."}>
      <Component
        className="w-full max-w-sm"
        cardHeight={220}
        items={artworks.slice(0, 4).map((art) => ({
          id: art.id,
          image: art.src,
          imageAlt: art.title,
          avatar: art.src,
          handle: "studio-notes",
          name: art.title,
          href: "https://github.com/NikroZorkin/ElementsUIforKitty",
        }))}
      />
    </DemoFrame>
  );
}
