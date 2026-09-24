/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/BasicDropdown";
import { useState } from "react";
import { LightbulbIcon, CircleHalfIcon, ArchiveIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [selected, setSelected] = useState("No destination selected");
  return (
    <DemoFrame hint={selected}>
      <Component
        label="Move to…"
        items={[
          { id: "ideas", label: "Ideas", icon: <LightbulbIcon size={17} /> },
          { id: "active", label: "In progress", icon: <CircleHalfIcon size={17} /> },
          { id: "archive", label: "Archive", icon: <ArchiveIcon size={17} /> },
        ]}
        onChange={(item) => setSelected(item.label)}
      />
    </DemoFrame>
  );
}
