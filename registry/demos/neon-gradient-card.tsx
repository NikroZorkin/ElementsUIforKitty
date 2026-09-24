/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { PlanetIcon } from "@phosphor-icons/react";
import { NeonGradientCard } from "../magicui/NeonGradientCard";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [warm, setWarm] = useState(false);
  return (
    <DemoFrame hint="Change the palette and watch the border move.">
      <NeonGradientCard
        className="h-60 w-80 max-w-full"
        borderSize={2}
        neonColors={
          warm
            ? { firstColor: "#fb923c", secondColor: "#fb7185" }
            : { firstColor: "#60a5fa", secondColor: "#a78bfa" }
        }
      >
        <PlanetIcon size={28} weight="light" />
        <h3 className="mt-5 text-xl font-medium">Ideas in orbit.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A new perspective, one detail at a time.
        </p>
        <button
          className="mt-5 text-sm underline underline-offset-4"
          onClick={() => setWarm(!warm)}
        >
          {warm ? "Try cool colors" : "Try warm colors"}
        </button>
      </NeonGradientCard>
    </DemoFrame>
  );
}
