/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { DemoFrame } from "../shared/DemoFrame";
import { ExpandableTabs } from "../beui/ExpandableTabs";
import { Folder, Heart, Clock } from "lucide-react";
export default function Demo() {
  return (
    <DemoFrame>
      <ExpandableTabs
        items={[
          {
            id: "files",
            label: "Files",
            icon: <Folder size={17} />,
            content: (
              <div className="w-60 p-5">
                <h2 className="mb-3 font-medium">Your workspace</h2>
                <p className="text-sm text-muted-foreground">
                  A home for ideas, drafts, and everything in between.
                </p>
              </div>
            ),
          },
          {
            id: "saved",
            label: "Saved",
            icon: <Heart size={17} />,
            content: (
              <div className="w-60 p-5">
                <h2 className="mb-3 font-medium">The good stuff</h2>
                <p className="text-sm text-muted-foreground">
                  Keep the things you want to come back to.
                </p>
              </div>
            ),
          },
          {
            id: "recent",
            label: "Recent",
            icon: <Clock size={17} />,
            content: (
              <div className="w-60 p-5">
                <h2 className="mb-3 font-medium">Pick up where you left off</h2>
                <p className="text-sm text-muted-foreground">
                  Your latest ideas, all in one place.
                </p>
              </div>
            ),
          },
        ]}
      />
    </DemoFrame>
  );
}
