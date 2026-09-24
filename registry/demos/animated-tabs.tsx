/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedTabs";
import { useState } from "react";
import { ArrowUpRightIcon, PenNibIcon, CodeIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [tab, setTab] = useState("design");
  return (
    <DemoFrame>
      <div className="w-full max-w-md rounded-2xl border bg-background p-6">
        <Component
          tabs={[
            { id: "design", label: "Design", icon: <PenNibIcon size={16} /> },
            { id: "build", label: "Build", icon: <CodeIcon size={16} /> },
            { id: "ship", label: "Ship", icon: <ArrowUpRightIcon size={16} /> },
          ]}
          activeTab={tab}
          onChange={setTab}
          variant="pill"
        />
        <div role="tabpanel" className="mt-8 rounded-xl bg-muted p-6">
          <h3 className="text-lg font-medium">
            {tab === "design"
              ? "Start with a sketch."
              : tab === "build"
                ? "Give it some life."
                : "Ready for the world."}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            One step at a time. Make something worth keeping.
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}
