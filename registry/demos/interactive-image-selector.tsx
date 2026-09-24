/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/InteractiveImageSelector";
import { useState } from "react";
import { artworks } from "../shared/SampleArt";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [selected, setSelected] = useState<number[]>([]);
  const [status, setStatus] = useState("Select a few pieces for your collection.");
  return (
    <DemoFrame className="gap-4 p-6" hint={status}>
      <Component
        className="w-full max-w-lg"
        selectable
        images={artworks.map((a, id) => ({ id, src: a.src }))}
        selectedImages={selected}
        onChange={setSelected}
        onShare={(ids) => setStatus(`${ids.length} images ready to share`)}
        onDelete={(ids) => {
          setStatus(`${ids.length} images removed`);
          setSelected([]);
        }}
      />
    </DemoFrame>
  );
}
