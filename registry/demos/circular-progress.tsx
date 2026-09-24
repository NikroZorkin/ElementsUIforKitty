/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { AnimatedCircularProgressBar } from "../magicui/AnimatedCircularProgressBar";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [value, setValue] = useState(64);
  return (
    <DemoFrame
      hint={value === 100 ? "All set. Ready for the next idea." : "Sample upload progress"}
    >
      <AnimatedCircularProgressBar
        value={value}
        gaugePrimaryColor="#0088ff"
        gaugeSecondaryColor="var(--border)"
      />
      <div className="flex gap-3">
        <button
          className="demo-action"
          disabled={value === 100}
          onClick={() => setValue(Math.min(100, value + 12))}
        >
          Advance
        </button>
        <button className="demo-action" onClick={() => setValue(0)}>
          Reset
        </button>
      </div>
    </DemoFrame>
  );
}
