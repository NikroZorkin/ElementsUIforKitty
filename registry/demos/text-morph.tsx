/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/TextMorph";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [index, setIndex] = useState(0);
  const phrases = ["A little idea.", "A little motion.", "A little magic."];
  return (
    <DemoFrame>
      <Component
        text={phrases[index]}
        className="text-center text-4xl font-semibold tracking-tight"
      />
      <button className="demo-action" onClick={() => setIndex((index + 1) % phrases.length)}>
        Change the phrase
      </button>
    </DemoFrame>
  );
}
