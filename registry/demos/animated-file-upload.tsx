/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedFileUpload";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <DemoFrame
      hint={
        names.length
          ? `${names.length} files selected locally`
          : "Choose a file to try the interaction. Files stay on this device."
      }
    >
      <Component
        className="w-full max-w-md"
        multiple
        onFilesSelected={(files) => setNames(files.map((f) => f.name))}
      />
    </DemoFrame>
  );
}
