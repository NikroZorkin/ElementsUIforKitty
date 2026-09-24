/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/AnimatedStepper";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame>
      <Component
        className="w-full max-w-lg"
        allowClickNavigation
        steps={[
          {
            label: "Details",
            description: "Name your project",
            content: <p className="p-6 text-sm">Choose a name and make it yours.</p>,
          },
          {
            label: "Design",
            description: "Choose a direction",
            content: <p className="p-6 text-sm">Collect the details that matter.</p>,
          },
          {
            label: "Ready",
            description: "Start building",
            content: <p className="p-6 text-sm">You have everything you need.</p>,
          },
        ]}
      />
    </DemoFrame>
  );
}
