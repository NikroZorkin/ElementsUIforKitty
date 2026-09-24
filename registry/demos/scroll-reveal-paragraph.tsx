/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ScrollRevealParagraph";

export default function Demo() {
  return (
    <div className="mx-auto max-w-lg px-8">
      <p className="mb-20 pt-24 text-xs uppercase tracking-[.2em] text-muted-foreground">
        Scroll to read ↓
      </p>
      <Component
        paragraph="Good design gives us room to breathe. It turns a small interaction into a moment worth remembering. Make something that feels a little more human."
        className="text-4xl font-medium leading-snug tracking-tight"
      />
      <div className="h-[60vh]" />
    </div>
  );
}
