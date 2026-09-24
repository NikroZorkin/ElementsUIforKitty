/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/VectorEditorToolbar";
import { useState } from "react";
import { PenNibIcon, TextTIcon, CursorIcon, FrameCornersIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [tool, setTool] = useState("select");
  return (
    <DemoFrame hint={"Click a tool or use its keyboard shortcut."}>
      <div className="relative flex h-64 w-full max-w-lg flex-col items-center gap-10 rounded-xl border bg-muted/40 p-6">
        <Component
          activeTool={tool}
          onToolChange={setTool}
          tools={[
            { id: "select", label: "Select", shortcut: "V", icon: CursorIcon },
            { id: "frame", label: "Frame", shortcut: "F", icon: FrameCornersIcon },
            { id: "pen", label: "Pen", shortcut: "P", icon: PenNibIcon },
            { id: "text", label: "Text", shortcut: "T", icon: TextTIcon },
          ]}
        />
        <div className="grid h-24 w-36 place-items-center rounded-lg border border-dashed border-foreground/30 bg-background text-sm">
          {tool} tool
        </div>
      </div>
    </DemoFrame>
  );
}
