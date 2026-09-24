/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AiApproval";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [decision, setDecision] = useState("");
  const [version, setVersion] = useState(0);
  return (
    <DemoFrame hint={decision || "Choose a direction to resolve the card."}>
      <div className="w-full max-w-md">
        <Component
          key={version}
          question="Which direction should we explore?"
          options={[
            { id: "quiet", label: "Keep it quiet", detail: "Soft surfaces and small details." },
            {
              id: "bold",
              label: "Add some energy",
              detail: "Stronger contrast and expressive motion.",
            },
          ]}
          onDecide={(option) => setDecision(option.label)}
        />
        {decision && (
          <button
            className="demo-action mt-5"
            onClick={() => {
              setDecision("");
              setVersion(version + 1);
            }}
          >
            Try another direction
          </button>
        )}
      </div>
    </DemoFrame>
  );
}
