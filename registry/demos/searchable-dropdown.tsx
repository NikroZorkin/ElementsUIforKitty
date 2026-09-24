/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/SearchableDropdown";
import { useState } from "react";
import { artworks } from "../shared/SampleArt";
import { FolderIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [selected, setSelected] = useState("Pick a project");
  return (
    <DemoFrame hint={selected}>
      <Component
        label="Find a project"
        placeholder="Search projects…"
        items={artworks.map((art) => ({
          id: art.id,
          label: art.title,
          description: art.description,
          icon: <FolderIcon size={18} />,
        }))}
        onChange={(item) => setSelected(item.label)}
      />
    </DemoFrame>
  );
}
