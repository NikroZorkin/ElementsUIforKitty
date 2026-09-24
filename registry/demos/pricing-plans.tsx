/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Pricing1";
import { useState } from "react";
export default function Demo() {
  const [plan, setPlan] = useState("");
  return (
    <div className="section-example">
      <Component onPlanSelect={setPlan} />
      {plan && (
        <p className="p-4 text-center text-sm" role="status">
          {plan} plan selected for this example.
        </p>
      )}
    </div>
  );
}
