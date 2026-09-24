/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ClipCornersButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("A new angle on the everyday button.");
  return (
    <DemoFrame hint={message}>
      <Component onClick={() => setMessage("Off we go.")}>Explore more</Component>
    </DemoFrame>
  );
}
