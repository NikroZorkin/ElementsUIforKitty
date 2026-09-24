/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/FolderReveal";
import { artworks, ArtTile } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Open the folder to reveal its contents."}>
      <Component
        label="Studio studies"
        trigger="click"
        size={240}
        items={artworks
          .slice(0, 3)
          .map((art, index) => ({ id: art.id, content: <ArtTile index={index} /> }))}
      />
    </DemoFrame>
  );
}
