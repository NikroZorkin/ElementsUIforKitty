/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AiLoader";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <DemoFrame>
      <div className="grid min-h-24 place-items-center">
        {loading ? (
          <Component label="Putting the pieces together" showElapsed variant="dots" />
        ) : (
          <p className="font-medium">Everything is ready.</p>
        )}
      </div>
      <button className="demo-action" onClick={() => setLoading(!loading)}>
        {loading ? "Finish" : "Start again"}
      </button>
    </DemoFrame>
  );
}
