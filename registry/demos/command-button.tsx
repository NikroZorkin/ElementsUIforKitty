/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/CommandButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Click to run a demo command.");
  return (
    <DemoFrame hint={message}>
      <Component onClick={() => setMessage("Command received.")}>Run command</Component>
    </DemoFrame>
  );
}
