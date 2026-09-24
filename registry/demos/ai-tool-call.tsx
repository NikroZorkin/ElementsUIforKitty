/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AiToolCall";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [done, setDone] = useState(false);
  return (
    <DemoFrame>
      <div className="w-full max-w-md">
        <Component
          name="Inspect components"
          status={done ? "success" : "running"}
          summary={done ? "15 components checked" : "Reading the collection"}
          args={<code className="text-xs">category: cards</code>}
          result={
            done ? (
              <p className="text-sm">All examples include source files and a license.</p>
            ) : undefined
          }
          defaultOpen
        />
        <button className="demo-action mt-5" onClick={() => setDone(!done)}>
          {done ? "Inspect again" : "Complete inspection"}
        </button>
      </div>
    </DemoFrame>
  );
}
