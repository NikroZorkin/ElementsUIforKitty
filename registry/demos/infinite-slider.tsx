/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/InfiniteSlider";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Hover to pause. Take your time.">
      <Component className="w-full" speed={35} speedOnHover={0}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <img
            key={i}
            src={`/media/art-0${i}.svg`}
            alt={`Field notes poster ${i}`}
            className="h-60 w-44 rounded-xl object-cover"
          />
        ))}
      </Component>
    </DemoFrame>
  );
}
