/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/MotionLoader";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
import type { MotionLoaderVariant } from "../smoothui/MotionLoader";
export default function Demo() {
  const [variant, setVariant] = useState<MotionLoaderVariant>("orbit");
  return (
    <DemoFrame hint={"Four rhythms, one compact loading indicator."}>
      <Component variant={variant} size={56} color="#0088ff" />
      <div className="flex flex-wrap justify-center gap-2">
        {(["orbit", "hourglass", "wave-bars", "cube-flip"] as const).map((item) => (
          <button
            className="rounded-lg border bg-background px-3 py-2 text-xs"
            key={item}
            aria-pressed={variant === item}
            onClick={() => setVariant(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </DemoFrame>
  );
}
