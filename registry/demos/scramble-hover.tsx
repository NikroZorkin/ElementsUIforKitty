/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ScrambleHover";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Hover or focus the words to decode them."}>
      <Component className="text-5xl font-semibold tracking-tight">Stay curious.</Component>
    </DemoFrame>
  );
}
