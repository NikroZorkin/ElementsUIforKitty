/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/GlowHoverCard";
import { artworks } from "../shared/SampleArt";
import { StackIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Move between the cards to follow the light."}>
      <Component
        className="grid w-full max-w-lg grid-cols-2 gap-4"
        items={artworks.slice(0, 2).map((art, index) => ({
          id: art.id,
          theme: { hue: index ? 32 : 168, saturation: 70, lightness: 60 },
          element: (
            <div className="rounded-2xl border bg-background p-6">
              <StackIcon className="mb-12" size={26} />
              <h3 className="font-semibold">{art.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{art.description}</p>
            </div>
          ),
        }))}
      />
    </DemoFrame>
  );
}
