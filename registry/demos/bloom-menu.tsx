/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { BloomMenu as Component } from "../beui/BloomMenu";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Create something new.");
  return (
    <DemoFrame hint={message}>
      <Component onSelect={(label) => setMessage(`${label} created in this demo.`)} />
    </DemoFrame>
  );
}
