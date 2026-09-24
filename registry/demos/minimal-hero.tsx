/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Header6";
import { useState } from "react";
export default function Demo() {
  const [exploring, setExploring] = useState(false);
  return (
    <div className="section-example">
      <Component onExplore={() => setExploring(true)} />
      {exploring && (
        <div className="mx-auto mb-8 max-w-md rounded-xl border p-5">
          <p className="font-medium" role="status">
            Start with the little details.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Buttons, cards and movement. Everything begins with one component.
          </p>
        </div>
      )}
    </div>
  );
}
