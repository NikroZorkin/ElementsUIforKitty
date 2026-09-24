/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/SwitchboardCard";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [pattern, setPattern] = useState(0);
  return (
    <DemoFrame hint={"Try the action to change the light pattern."}>
      <Component
        title="Signal found."
        subtitle="A small idea, ready to light up."
        randomLights={false}
        gridPattern={Array.from({ length: 90 }, (_, i) => ((i + pattern) % 3 === 0 ? 1 : 0))}
        onButtonClick={() => setPattern(pattern + 1)}
        className="w-full max-w-xs"
      />
    </DemoFrame>
  );
}
