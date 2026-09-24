/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/MatrixText";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <Component text="HELLO, HUMAN." className="text-4xl font-mono" />
    </DemoFrame>
  );
}
