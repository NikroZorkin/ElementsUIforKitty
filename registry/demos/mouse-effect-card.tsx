/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/MouseEffectCard";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("");
  return (
    <DemoFrame className="min-h-[420px] p-0 gap-0" hint={message}>
      <div
        className="w-full shrink-0 scale-[.84] flex justify-center"
        onClick={(event) => {
          const action = (event.target as HTMLElement).closest("a");
          if (action) {
            event.preventDefault();
            setMessage(`${action.textContent} selected in this demo.`);
          }
        }}
      >
        <Component />
      </div>
    </DemoFrame>
  );
}
