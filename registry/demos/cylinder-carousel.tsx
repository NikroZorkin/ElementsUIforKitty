/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { CylinderCarousel as Component } from "../beui/CylinderCarousel";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Scroll through a different perspective.">
      <Component className="w-full" itemSize={140} height={300} autoRotate={false}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <img
            key={i}
            src={`/media/art-0${i}.svg`}
            alt={`Field notes poster ${i}`}
            className="h-56 w-full rounded-xl object-cover"
          />
        ))}
      </Component>
    </DemoFrame>
  );
}
