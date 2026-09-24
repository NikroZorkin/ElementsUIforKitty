/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/SlideTextButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Hover to reveal another thought.");
  return (
    <DemoFrame hint={message}>
      <Component
        href="#"
        text="Say hello"
        hoverText="Let’s talk ↗"
        onClick={(event) => {
          event.preventDefault();
          setMessage("Hello! Thanks for stopping by.");
        }}
      />
    </DemoFrame>
  );
}
