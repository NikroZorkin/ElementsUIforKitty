/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/MagneticButton";
import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <DemoFrame hint={count ? `Activated ${count} times` : "Move closer, then click."}>
      <Component size="lg" onClick={() => setCount(count + 1)}>
        Make it happen <ArrowUpRightIcon size={17} />
      </Component>
    </DemoFrame>
  );
}
