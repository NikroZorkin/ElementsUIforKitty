/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/WalletCard";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame>
      <Component
        className="w-full max-w-sm"
        accounts={[
          {
            id: "daily",
            label: "Everyday",
            balance: 4820.5,
            currency: "USD",
            last4: "2048",
            holder: "ALEX MORGAN",
            network: "visa",
            gradient: "bg-[linear-gradient(135deg,#353b35,#121814)]",
          },
          {
            id: "studio",
            label: "Studio",
            balance: 12450,
            currency: "USD",
            last4: "8812",
            holder: "ALEX MORGAN",
            network: "mastercard",
            gradient: "bg-[linear-gradient(135deg,#665c75,#302e3e)]",
          },
        ]}
      />
    </DemoFrame>
  );
}
