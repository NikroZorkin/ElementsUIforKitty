/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/GravityStars";

export default function Demo() {
  return (
    <Component
      className="flex min-h-[420px] w-full items-center justify-center bg-[#090b14]"
      color="#d3deff"
    >
      <div className="pointer-events-none relative z-10 text-center text-white">
        <p className="mb-4 text-xs tracking-[.3em]">SOMEWHERE OUT THERE</p>
        <h2 className="text-5xl font-light tracking-tight">A little closer.</h2>
      </div>
    </Component>
  );
}
