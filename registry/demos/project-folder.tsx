/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { ProjectFolder as Component } from "../beui/ProjectFolder";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Open a folder. Find something good.">
      <Component
        title="Field notes"
        description="A collection of quiet places."
        count={6}
        previews={[1, 2, 3, 4, 5].map((i) => ({
          id: String(i),
          content: (
            <img
              src={`/media/art-0${i}.svg`}
              alt={`Field notes artwork ${i}`}
              className="h-full w-full object-cover"
            />
          ),
        }))}
      />
    </DemoFrame>
  );
}
