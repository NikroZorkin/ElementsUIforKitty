/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { RippleButton } from "../magicui/RippleButton";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <DemoFrame hint={count ? `${count} little ripples` : "Click anywhere on the button."}>
      <RippleButton rippleColor="#60a5fa" className="px-7 py-3" onClick={() => setCount(count + 1)}>
        Make a ripple
      </RippleButton>
    </DemoFrame>
  );
}
