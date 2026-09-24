/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/HoldButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Hold for 1.5 seconds to confirm.");
  return (
    <DemoFrame hint={message}>
      <Component
        holdDuration={1500}
        onConfirm={() => setMessage("Confirmed. You can safely start again.")}
      />
    </DemoFrame>
  );
}
