/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ContributionGraph";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const data = Array.from({ length: 365 }, (_, index) => ({
    date: new Date(Date.UTC(2026, 0, index + 1)).toISOString().slice(0, 10),
    count: (index * 7 + Math.floor(index / 3)) % 17,
    level: (index * 7 + Math.floor(index / 3)) % 5,
  }));
  return (
    <DemoFrame hint={"Sample activity · Explore a day for details."}>
      <div className="w-full max-w-lg rounded-2xl border bg-background p-5">
        <h3 className="mb-5 font-medium">A year of small steps</h3>
        <Component year={2026} data={data} />
      </div>
    </DemoFrame>
  );
}
