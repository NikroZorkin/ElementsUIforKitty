/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/GravityLetters";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Click the letters. Click again to bring them back."}>
      <Component text="LET IT GO" trigger="click" className="text-5xl font-bold tracking-tight" />
    </DemoFrame>
  );
}
