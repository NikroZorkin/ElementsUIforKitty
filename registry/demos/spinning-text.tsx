/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { AsteriskIcon } from "@phosphor-icons/react";
import { SpinningText } from "../magicui/SpinningText";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [reverse, setReverse] = useState(false);
  return (
    <DemoFrame>
      <div className="relative h-56 w-56">
        <SpinningText
          radius={8}
          duration={24}
          reverse={reverse}
          className="h-full w-full font-mono text-base"
        >
          MAKE A LITTLE SPACE · STAY CURIOUS ·
        </SpinningText>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AsteriskIcon size={36} weight="light" />
        </span>
      </div>
      <button className="demo-action" onClick={() => setReverse(!reverse)} aria-pressed={reverse}>
        Reverse direction
      </button>
    </DemoFrame>
  );
}
