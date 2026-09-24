/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AuroraCurtain";

export default function Demo() {
  return (
    <Component className="flex min-h-[420px] w-full items-center justify-center bg-[#08121b]">
      <div className="relative z-10 text-center text-white">
        <p className="mb-4 text-xs tracking-[.3em] text-white/70">AFTER HOURS</p>
        <h2 className="text-5xl font-medium tracking-tight">Stay a little longer.</h2>
        <p className="mt-5 text-sm text-white/65">There’s a whole world after the sun goes down.</p>
      </div>
    </Component>
  );
}
