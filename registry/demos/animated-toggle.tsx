/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedToggle";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [checked, setChecked] = useState(true);
  return (
    <DemoFrame hint={checked ? "Focus mode is on" : "Focus mode is off"}>
      <div className="flex w-full max-w-xs items-center justify-between rounded-2xl border bg-background p-6">
        <div>
          <h3 className="font-medium">Focus mode</h3>
          <p className="mt-1 text-xs text-muted-foreground">Make a little space.</p>
        </div>
        <Component label="Focus mode" checked={checked} onChange={setChecked} variant="morph" />
      </div>
    </DemoFrame>
  );
}
