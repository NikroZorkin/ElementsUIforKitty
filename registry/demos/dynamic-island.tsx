/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/DynamicIsland";
import { SparkleIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint="Switch between a call, timer, notification, and music.">
      <Component
        idleContent={
          <span className="flex items-center gap-3 px-5 py-3 text-sm text-white/90">
            <SparkleIcon size={18} /> Ready when you are
          </span>
        }
        ringContent={<div className="px-6 py-4 text-sm text-white">Mira is calling…</div>}
      />
    </DemoFrame>
  );
}
