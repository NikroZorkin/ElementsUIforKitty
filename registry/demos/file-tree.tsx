/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/FileTree";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [selected, setSelected] = useState("button");
  return (
    <DemoFrame hint={`Selected: ${selected}`}>
      <div className="w-full max-w-sm rounded-xl border bg-background p-5">
        <Component
          selected={selected}
          onSelectedChange={setSelected}
          defaultExpanded={["project", "components"]}
          items={[
            {
              id: "project",
              name: "kitty-studio",
              type: "folder",
              children: [
                {
                  id: "components",
                  name: "components",
                  type: "folder",
                  children: [
                    { id: "button", name: "Button.tsx", type: "file" },
                    { id: "card", name: "Card.tsx", type: "file" },
                  ],
                },
                {
                  id: "styles",
                  name: "styles",
                  type: "folder",
                  children: [{ id: "theme", name: "theme.css", type: "file" }],
                },
                { id: "readme", name: "README.md", type: "file" },
              ],
            },
          ]}
        />
      </div>
    </DemoFrame>
  );
}
