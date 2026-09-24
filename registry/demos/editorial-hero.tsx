/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Header5";
import { useState } from "react";
export default function Demo() {
  const [action, setAction] = useState("");
  return (
    <div className="section-example">
      <Component
        onPrimaryAction={() => setAction("Your new project is ready to begin.")}
        onSecondaryAction={() => setAction("Explore the component collection below.")}
      />
      {action && (
        <p className="p-4 text-center text-sm" role="status">
          {action}
        </p>
      )}
    </div>
  );
}
