/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedProgressBar";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [value, setValue] = useState(42);
  return (
    <DemoFrame hint={value === 100 ? "All assets ready" : "Sample progress"}>
      <div className="w-full max-w-sm">
        <Component value={value} label={`Uploading assets · ${value}%`} color="#0088ff" />
        <div className="mt-7 flex gap-3">
          <button
            className="demo-action"
            onClick={() => setValue(Math.min(value + 19, 100))}
            disabled={value === 100}
          >
            Advance
          </button>
          <button className="demo-action" onClick={() => setValue(0)}>
            Reset
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}
