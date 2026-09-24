/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Book";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Move over the cover to see its depth."}>
      <Component
        title="A little less, a little better."
        color="#75b3a0"
        width={190}
        illustration={
          <img
            src="/media/art-03.svg"
            alt="Abstract green contours"
            className="h-full w-full object-cover"
          />
        }
        logo={<span className="text-[10px] tracking-widest">STUDIO NOTES / 01</span>}
      />
    </DemoFrame>
  );
}
