/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";
import { Dock, DockItem, DockSeparator } from "../beui/Dock";
import { Home, Folder, Heart, Settings } from "lucide-react";
export default function Demo() {
  const [active, setActive] = useState("Home");
  return (
    <DemoFrame hint={`${active} selected`}>
      <Dock>
        {[
          { label: "Home", Icon: Home },
          { label: "Files", Icon: Folder },
          { label: "Saved", Icon: Heart },
        ].map(({ label, Icon }) => (
          <DockItem key={label} active={active === label} onClick={() => setActive(label)}>
            <Icon size={22} aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </DockItem>
        ))}
        <DockSeparator />
        <DockItem onClick={() => setActive("Settings")} active={active === "Settings"}>
          <Settings size={22} aria-hidden="true" />
          <span className="sr-only">Settings</span>
        </DockItem>
      </Dock>
    </DemoFrame>
  );
}
