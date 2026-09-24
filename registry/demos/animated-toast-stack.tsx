/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { DemoFrame } from "../shared/DemoFrame";
import { AnimatedToastStack, useAnimatedToastStack } from "../beui/AnimatedToastStack";
export default function Demo() {
  const stack = useAnimatedToastStack({
    defaultDuration: 5000,
    limit: 4,
    initialToasts: [
      {
        title: "A little good news",
        description: "Your workspace is ready.",
        status: "success",
        duration: 0,
      },
    ],
  });
  return (
    <DemoFrame>
      <button
        className="demo-action"
        onClick={() =>
          stack.showToast({
            title: "Changes saved",
            description: "Everything is right where you left it.",
            status: "success",
          })
        }
      >
        Show notification
      </button>
      <div className="relative min-h-40 w-full max-w-sm">
        <AnimatedToastStack
          toasts={stack.toasts}
          onDismiss={stack.dismissToast}
          placement="static"
          position="bottom-center"
        />
      </div>
    </DemoFrame>
  );
}
