/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/HolographicFoil";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <Component className="flex text-white min-h-[300px] w-72 flex-col justify-between rounded-2xl border border-white/20 p-7">
        <span className="text-xs tracking-[.25em]">COLLECTOR’S EDITION</span>
        <h2 className="text-4xl font-semibold tracking-tight">
          Something
          <br />
          rare.
        </h2>
        <span className="text-xs">NO. 001 / 100</span>
      </Component>
    </DemoFrame>
  );
}
