/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { Lens } from "../magicui/Lens";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [zoom, setZoom] = useState(1.6);
  return (
    <DemoFrame hint="Move over the artwork to look a little closer.">
      <div className="w-80 max-w-full">
        <Lens
          zoomFactor={zoom}
          lensSize={140}
          defaultPosition={{ x: 160, y: 100 }}
          ariaLabel="Magnify studio artwork"
        >
          <img
            src="/media/art-02.svg"
            alt="In orbit — an abstract landscape from the studio"
            width={400}
            height={260}
            className="h-52 w-full object-cover"
          />
        </Lens>
      </div>
      <button className="demo-action" onClick={() => setZoom(zoom === 1.6 ? 2.4 : 1.6)}>
        Zoom · {zoom}×
      </button>
    </DemoFrame>
  );
}
