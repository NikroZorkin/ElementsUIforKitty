/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/HoverImageList";
import { artworks } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Move through the list to reveal each image."}>
      <Component
        className="w-full max-w-lg"
        revealMode="fixed"
        items={artworks.slice(0, 4).map((art, index) => ({
          id: art.id,
          image: art.src,
          alt: art.title,
          title: art.title,
          meta: `Study 0${index + 1}`,
        }))}
      />
    </DemoFrame>
  );
}
