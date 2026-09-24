/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/GlassCard";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <div className="relative grid w-full max-w-md place-items-center rounded-3xl bg-[url(/media/art-05.svg)] bg-cover bg-center p-8">
        <Component className="w-full text-white">
          <div className="mb-14 flex justify-between text-xs">
            <span>STUDIO MEMBERSHIP</span>
            <span>↗</span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight">Less, but better.</h2>
          <p className="mt-3 text-sm text-white/80">A space for your next idea.</p>
          <div className="mt-12 flex justify-between text-xs">
            <span>ELEMENTS / 001</span>
            <span>2026</span>
          </div>
        </Component>
      </div>
    </DemoFrame>
  );
}
