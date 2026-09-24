/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ButtonCopy";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [copied, setCopied] = useState(false);
  return (
    <DemoFrame hint={copied ? "Command copied" : "Copy the installation command."}>
      <div className="flex items-center gap-8 rounded-xl border bg-background p-5">
        <code className="text-sm">npm install motion</code>
        <Component
          onCopy={async () => {
            await navigator.clipboard.writeText("npm install motion");
            setCopied(true);
          }}
          loadingDuration={350}
        />
      </div>
    </DemoFrame>
  );
}
