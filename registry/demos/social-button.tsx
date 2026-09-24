/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/SocialButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Choose a sharing action.");
  return (
    <DemoFrame hint={message}>
      <Component onShare={(_, item) => setMessage(`${item.label} selected.`)} />
    </DemoFrame>
  );
}
