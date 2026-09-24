/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Breadcrumb";
import { useState } from "react";
import { FolderIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [folder, setFolder] = useState("Components");
  return (
    <DemoFrame>
      <div
        className="w-full max-w-md rounded-2xl border bg-background p-6"
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest("a");
          if (link) {
            event.preventDefault();
            setFolder(link.textContent ?? "Library");
          }
        }}
      >
        <Component
          items={[
            { label: "Library", href: "#library" },
            { label: "Design system", href: "#design-system" },
            { label: folder },
          ]}
        />
        <div className="mt-8 flex items-center gap-4 rounded-xl bg-muted p-5">
          <FolderIcon size={32} />
          <div>
            <p className="font-medium">{folder}</p>
            <p className="text-xs text-muted-foreground">Your collection, one level at a time.</p>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
