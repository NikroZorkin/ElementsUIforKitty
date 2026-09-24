/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Cta1";
import { useState } from "react";
export default function Demo() {
  const [status, setStatus] = useState("");
  return (
    <div className="section-example">
      <Component
        onPrimaryAction={() => setStatus("A fresh start. Your next idea is ready.")}
        onSecondaryAction={() => setStatus("Start with a component, then make it yours.")}
      />
      {status && (
        <p className="p-4 text-center text-sm" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
