/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { InteractiveHoverButton } from "../magicui/InteractiveHoverButton";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [step, setStep] = useState(0);
  return (
    <DemoFrame
      hint={
        step ? `Step ${step} · A little further along.` : "Hover, focus, then take the next step."
      }
    >
      <InteractiveHoverButton onClick={() => setStep(step + 1)}>Keep going</InteractiveHoverButton>
    </DemoFrame>
  );
}
