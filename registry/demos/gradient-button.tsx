/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/GradientButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("A little color goes a long way.");
  return (
    <DemoFrame hint={message}>
      <Component label="Join the waitlist" onClick={() => setMessage("You’re on the list.")}>
        Join the waitlist
      </Component>
    </DemoFrame>
  );
}
