/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/Loader";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="A moment, please.">
      <Component />
    </DemoFrame>
  );
}
