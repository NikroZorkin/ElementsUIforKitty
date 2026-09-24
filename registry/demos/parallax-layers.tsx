/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ParallaxLayers";

export default function Demo() {
  return (
    <Component
      className="h-[420px] w-full overflow-hidden rounded-2xl bg-[#dfebde]"
      layers={[
        {
          id: "back",
          depth: 0.2,
          content: <div className="absolute right-10 top-5 size-60 rounded-full bg-[#b9c8b3]" />,
        },
        {
          id: "middle",
          depth: 0.6,
          content: (
            <div className="absolute -bottom-20 -left-20 h-80 w-[700px] rotate-12 rounded-[50%] bg-[#5d7962]" />
          ),
        },
        {
          id: "front",
          depth: 1,
          content: (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#233729]">
              <p className="text-xs tracking-[.3em]">FIND YOUR OWN PACE</p>
              <h2 className="mt-5 text-6xl font-semibold tracking-tight">Slow down.</h2>
            </div>
          ),
        },
      ]}
      pointerParallax
    />
  );
}
