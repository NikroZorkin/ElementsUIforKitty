/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/NotificationBadge";
import { useState } from "react";
import { BellIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [count, setCount] = useState(3);
  return (
    <DemoFrame hint={`${count} unread notifications`}>
      <div className="flex items-center gap-8">
        <Component count={count} ping>
          <button
            className="grid size-16 place-items-center rounded-2xl border bg-background"
            onClick={() => setCount(0)}
            aria-label="Read all notifications"
          >
            <BellIcon size={28} />
          </button>
        </Component>
        <div>
          <p className="font-medium">A little update.</p>
          <p className="mt-1 text-xs text-muted-foreground">Tap the bell to mark all as read.</p>
        </div>
      </div>
      <button className="demo-action" onClick={() => setCount(count + 1)}>
        Add notification
      </button>
    </DemoFrame>
  );
}
