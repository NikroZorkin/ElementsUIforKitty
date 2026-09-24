/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ExpandableNavbar";
import { ArtTile } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Open a section to explore its panel."}>
      <div className="relative min-h-72 w-full max-w-lg pt-5">
        <Component
          openOnHover={false}
          width="100%"
          items={[
            {
              id: "library",
              label: "Library",
              panel: (
                <div className="grid grid-cols-2 gap-4 p-5">
                  <div>
                    <h3 className="font-semibold">The essentials</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Buttons, cards and the little details.
                    </p>
                  </div>
                  <ArtTile index={2} />
                </div>
              ),
            },
            {
              id: "studio",
              label: "Studio",
              panel: (
                <div className="p-6">
                  <h3 className="text-lg font-medium">Room for your next idea.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A quiet place to work on something new.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </DemoFrame>
  );
}
