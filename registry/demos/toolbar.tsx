/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/Toolbar";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Select a tool to see it expand.");
  return (
    <DemoFrame hint={message}>
      <Component onSelect={(id) => setMessage(`${id} tool selected.`)} />
    </DemoFrame>
  );
}
