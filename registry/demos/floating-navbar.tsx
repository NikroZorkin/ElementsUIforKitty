/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/FloatingNavbar";
import { useState } from "react";
import { StackIcon, HouseIcon, TextTIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [active, setActive] = useState("home");
  return (
    <DemoFrame>
      <div className="relative flex h-72 w-full max-w-lg items-center justify-center rounded-2xl border bg-[url(/media/art-01.svg)] bg-cover">
        <Component
          className="top-5"
          hideOnScroll={false}
          items={[
            { id: "home", label: "Home", icon: <HouseIcon size={16} /> },
            { id: "work", label: "Work", icon: <StackIcon size={16} /> },
            { id: "notes", label: "Notes", icon: <TextTIcon size={16} /> },
          ]}
          activeId={active}
          onActiveChange={setActive}
        />
        <div className="rounded-xl bg-background/90 px-8 py-5 text-center backdrop-blur">
          <p className="text-sm font-medium">
            {active === "home"
              ? "A place to begin."
              : active === "work"
                ? "Things we have made."
                : "Notes along the way."}
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}
