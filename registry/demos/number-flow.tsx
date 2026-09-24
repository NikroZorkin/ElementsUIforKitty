/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/NumberFlow";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [value, setValue] = useState(128);
  return (
    <DemoFrame hint={"Use the controls to roll the digits."}>
      <div className="text-center">
        <p className="mb-5 text-xs uppercase tracking-widest text-muted-foreground">
          Small things add up
        </p>
        <Component value={value} onChange={setValue} min={0} max={999} />
      </div>
    </DemoFrame>
  );
}
