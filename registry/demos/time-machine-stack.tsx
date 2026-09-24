/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/TimeMachineStack";
import { useState } from "react";
import { artworks, ArtTile } from "../shared/SampleArt";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [index, setIndex] = useState(0);
  return (
    <DemoFrame>
      <Component
        className="h-64 w-72"
        index={index}
        onIndexChange={setIndex}
        items={artworks
          .slice(0, 4)
          .map((art, i) => ({ id: art.id, content: <ArtTile index={i} /> }))}
      />
      <div className="flex items-center gap-5">
        <button
          className="demo-action"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          aria-label="Previous snapshot"
        >
          <ArrowLeftIcon size={15} />
        </button>
        <span className="text-xs">Snapshot {index + 1} / 4</span>
        <button
          className="demo-action"
          disabled={index === 3}
          onClick={() => setIndex(index + 1)}
          aria-label="Next snapshot"
        >
          <ArrowRightIcon size={15} />
        </button>
      </div>
    </DemoFrame>
  );
}
