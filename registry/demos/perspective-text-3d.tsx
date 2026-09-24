/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/PerspectiveText3d";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Move your pointer to change the perspective."}>
      <Component
        text={"A different\npoint of view."}
        split="lines"
        driver="pointer"
        className="text-center text-4xl font-semibold leading-tight"
        depth={36}
      />
    </DemoFrame>
  );
}
