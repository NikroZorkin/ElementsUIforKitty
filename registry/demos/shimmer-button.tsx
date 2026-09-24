/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { ShimmerButton } from "../magicui/ShimmerButton";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [ready, setReady] = useState(false);
  return (
    <DemoFrame
      hint={ready ? "Your next idea is ready to begin." : "A little light around the edges."}
    >
      <ShimmerButton onClick={() => setReady(!ready)} shimmerColor="#9bc9ff">
        <span className="relative z-10 flex items-center gap-3 text-sm">
          {ready ? "Start again" : "Start something"}
          <ArrowUpRightIcon size={16} />
        </span>
      </ShimmerButton>
    </DemoFrame>
  );
}
