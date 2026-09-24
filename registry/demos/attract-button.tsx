/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/AttractButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Move your pointer over the button.");
  return (
    <DemoFrame hint={message}>
      <Component onClick={() => setMessage("Let’s make something.")}>Get started</Component>
    </DemoFrame>
  );
}
