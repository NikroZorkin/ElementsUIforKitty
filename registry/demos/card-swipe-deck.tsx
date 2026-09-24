/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/CardSwipeDeck";
import { useState, useRef } from "react";
import { artworks, ArtTile } from "../shared/SampleArt";
import { ArrowClockwiseIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
import type { CardSwipeDeckHandle } from "../smoothui/CardSwipeDeck";
export default function Demo() {
  const ref = useRef<CardSwipeDeckHandle>(null);
  const [last, setLast] = useState("Swipe a card to sort the collection.");
  return (
    <DemoFrame hint={last}>
      <Component
        ref={ref}
        className="h-64 w-64"
        items={artworks
          .slice(0, 4)
          .map((art, index) => ({ id: art.id, content: <ArtTile index={index} /> }))}
        labels={{ left: "Later", right: "Keep" }}
        onSwipe={(id, direction) =>
          setLast(`${id}: ${direction === "right" ? "kept" : "saved for later"}`)
        }
      />
      <div className="flex gap-3">
        <button
          className="demo-action"
          onClick={() => ref.current?.swipeLeft()}
          aria-label="Save card for later"
        >
          <ArrowLeftIcon size={16} />
        </button>
        <button
          className="demo-action"
          onClick={() => ref.current?.reset()}
          aria-label="Reset deck"
        >
          <ArrowClockwiseIcon size={16} />
        </button>
        <button
          className="demo-action"
          onClick={() => ref.current?.swipeRight()}
          aria-label="Keep card"
        >
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </DemoFrame>
  );
}
