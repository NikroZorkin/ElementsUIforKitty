"use client";

import { motion, useReducedMotion } from "motion/react";

export function TabIndicator({ id }: { id: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="tab-indicator"
      layoutId={id}
      aria-hidden="true"
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 460, damping: 36 }}
    />
  );
}
