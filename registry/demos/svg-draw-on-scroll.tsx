/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/SvgDrawOnScroll";

export default function Demo() {
  return (
    <div className="w-full">
      <p className="pt-16 text-center text-xs tracking-[.2em] text-muted-foreground">
        FOLLOW THE THREAD ↓
      </p>
      <Component
        className="mx-auto h-[600px] w-full max-w-lg"
        viewBox="0 0 400 600"
        path="M200 20 C30 60 30 200 200 220 S370 400 200 420 S30 540 200 580"
        stroke="#a186bf"
        strokeWidth={3}
      />
      <p className="pb-44 text-center text-sm text-muted-foreground">
        Every journey starts with a line.
      </p>
    </div>
  );
}
