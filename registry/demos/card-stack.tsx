/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/CardStack";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame className="h-[420px] p-0">
      <div className="w-full shrink-0 scale-[.75] flex justify-center">
        <Component />
      </div>
    </DemoFrame>
  );
}
