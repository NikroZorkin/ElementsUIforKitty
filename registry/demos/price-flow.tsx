/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/PriceFlow";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [yearly, setYearly] = useState(false);
  return (
    <DemoFrame hint={yearly ? "Billed yearly" : "Billed monthly"}>
      <div className="text-center">
        <p className="mb-4 text-xs text-muted-foreground">Studio plan · example pricing</p>
        <div className="flex items-baseline justify-center text-6xl font-semibold">
          <span>$</span>
          <Component value={yearly ? 288 : 29} />
        </div>
        <button className="demo-action mt-8" onClick={() => setYearly(!yearly)}>
          {yearly ? "Show monthly" : "Show yearly"}
        </button>
      </div>
    </DemoFrame>
  );
}
