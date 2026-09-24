/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Stats1";
export default function Demo() {
  return (
    <div className="section-example">
      <Component
        title="A year in the studio."
        description="Small projects, thoughtful details. Example studio metrics."
        stats={[
          { value: "124", label: "Studies", description: "Ideas explored" },
          { value: "38", label: "Projects", description: "Things made real" },
          { value: "17", label: "Collaborators", description: "Different points of view" },
          { value: "9", label: "Countries", description: "Across time zones" },
        ]}
      />
    </div>
  );
}
