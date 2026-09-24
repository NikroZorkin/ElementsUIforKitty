/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../kokonut/TypeWriter";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <Component
        sequences={[
          { text: "Build something.", deleteAfter: true },
          { text: "Make it yours.", deleteAfter: true },
          { text: "Keep creating.", deleteAfter: true },
        ]}
      />
    </DemoFrame>
  );
}
