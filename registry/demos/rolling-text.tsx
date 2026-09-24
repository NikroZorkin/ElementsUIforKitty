/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/RollingText";
import { useState } from "react";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [replay, setReplay] = useState(0);
  return (
    <DemoFrame>
      <Component
        key={replay}
        text="MAKE IT YOURS"
        className="text-center text-4xl font-semibold tracking-tight"
      />
      <button className="demo-action" onClick={() => setReplay(replay + 1)}>
        Replay <ArrowClockwiseIcon size={15} />
      </button>
    </DemoFrame>
  );
}
