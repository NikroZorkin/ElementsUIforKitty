/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AiTaskList";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [step, setStep] = useState(1);
  const labels = ["Read the brief", "Collect references", "Build the layout", "Check the details"];
  return (
    <DemoFrame>
      <div className="w-full max-w-sm">
        <Component
          label="Design checklist"
          tasks={labels.map((label, index) => ({
            id: String(index),
            label,
            status: index < step ? "done" : index === step ? "running" : "pending",
          }))}
        />
        <button className="demo-action mt-7" onClick={() => setStep(step === 4 ? 0 : step + 1)}>
          {step === 4 ? "Start again" : "Complete next step"}
        </button>
      </div>
    </DemoFrame>
  );
}
