/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/ParticleButton";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("Click for a little celebration.");
  return (
    <DemoFrame hint={message}>
      <Component onSuccess={() => setMessage("A little celebration. Nicely done.")}>
        Make it happen
      </Component>
    </DemoFrame>
  );
}
