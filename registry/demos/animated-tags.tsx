/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedTags";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [selected, setSelected] = useState<string[]>(["Motion"]);
  return (
    <DemoFrame hint={`${selected.length} tools selected`}>
      <div className="w-full max-w-sm">
        <h3 className="mb-5 text-lg font-medium">What are you building with?</h3>
        <Component
          initialTags={["React", "Tailwind", "Motion", "TypeScript", "Figma"]}
          selectedTags={selected}
          onChange={setSelected}
        />
      </div>
    </DemoFrame>
  );
}
