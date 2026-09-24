/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedInput";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [value, setValue] = useState("");
  return (
    <DemoFrame hint={value ? `Working on ${value}` : "Give your next idea a name."}>
      <div className="w-full max-w-sm">
        <Component label="Project name" value={value} onChange={setValue} />
      </div>
    </DemoFrame>
  );
}
