/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AiContextMeter";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [used, setUsed] = useState(18400);
  return (
    <DemoFrame>
      <div className="w-full max-w-xs rounded-2xl border bg-background p-6">
        <h3 className="mb-2 font-medium">A little room to think.</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Hover over the meter to see how the context is used.
        </p>
        <div>
          <Component
            used={used}
            limit={64000}
            breakdown={[
              { label: "Conversation", tokens: Math.round(used * 0.6) },
              { label: "Documents", tokens: Math.round(used * 0.4) },
            ]}
          />
        </div>
        <button
          className="demo-action mt-8"
          onClick={() => setUsed(used > 48000 ? 18400 : used + 16000)}
        >
          {used > 48000 ? "Reset context" : "Add context"}
        </button>
      </div>
    </DemoFrame>
  );
}
