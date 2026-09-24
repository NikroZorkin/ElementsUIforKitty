/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/SkeletonLoader";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <DemoFrame>
      <div className="w-72 rounded-2xl border bg-background p-4">
        <Component loading={loading} className="rounded-xl">
          <img
            src="/media/art-06.svg"
            alt="Paper studies artwork"
            width={280}
            height={130}
            className="h-28 w-full rounded-xl object-cover"
          />
        </Component>
        <Component loading={loading} className="mt-5">
          <h3 className="text-lg font-medium">Paper studies</h3>
        </Component>
        <Component loading={loading} className="mt-2">
          <p className="text-sm text-muted-foreground">Collected shapes from the studio.</p>
        </Component>
      </div>
      <button className="demo-action" onClick={() => setLoading(!loading)}>
        {loading ? "Load content" : "Show skeleton"}
      </button>
    </DemoFrame>
  );
}
