/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/BasicToast";
import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <DemoFrame hint={"Try a notification. Dismiss it or let it close automatically."}>
      <button className="demo-action" onClick={() => setVisible(true)}>
        Save changes <CheckIcon size={16} />
      </button>
      <Component
        isVisible={visible}
        onClose={() => setVisible(false)}
        message="Your changes have been saved."
        type="success"
        duration={4500}
      />
    </DemoFrame>
  );
}
