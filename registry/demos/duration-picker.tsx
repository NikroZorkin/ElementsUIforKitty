/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/DurationPicker";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [seconds, setSeconds] = useState(1530);
  return (
    <DemoFrame hint={`${Math.floor(seconds / 60)} minutes · Drag a segment or use the arrow keys.`}>
      <Component label="Focus session" value={seconds} onValueChange={setSeconds} max={10800} />
    </DemoFrame>
  );
}
