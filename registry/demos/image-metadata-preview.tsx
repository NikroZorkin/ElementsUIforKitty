/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ImageMetadataPreview";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [status, setStatus] = useState("Open the details to inspect this artwork.");
  return (
    <DemoFrame hint={status}>
      <div className="w-72">
        <Component
          imageSrc="/media/art-03.svg"
          imageClassName="h-52 w-full object-cover"
          alt="Abstract blue landscape"
          filename="blue-hour.svg"
          description="A study from the Kitty studio collection."
          metadata={{
            by: "Kitty Studio",
            created: "September 12, 2026",
            updated: "September 18, 2026",
            source: "Original SVG artwork",
          }}
          onShare={() => setStatus("Artwork selected for sharing")}
        />
      </div>
    </DemoFrame>
  );
}
