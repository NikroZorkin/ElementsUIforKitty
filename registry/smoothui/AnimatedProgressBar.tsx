/** SmoothUI · MIT. License: licenses/smoothui.txt
 * Source: https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/components/animated-progress-bar/index.tsx
 * Adapted imports for portable React. */
"use client";
import { motion, useReducedMotion } from "motion/react";

export interface AnimatedProgressBarProps {
  barClassName?: string;
  className?: string;
  color?: string;
  label?: string;
  labelClassName?: string;
  value: number; // 0-100
  /**
   * To replay the animation, change the React 'key' prop on this component from the parent.
   */
}

const MIN_PROGRESS_VALUE = 0;
const MAX_PROGRESS_VALUE = 100;

const SPRING = {
  damping: 10,
  duration: 0.25,
  mass: 0.75,
  stiffness: 100,
  type: "spring" as const,
};

export default function AnimatedProgressBar({
  value,
  label,
  color = "#6366f1",
  className = "",
  barClassName = "",
  labelClassName = "",
}: AnimatedProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full ${className}`}>
      {label ? <div className={`mb-1 font-medium text-sm ${labelClassName}`}>{label}</div> : null}
      <div
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.max(0, Math.min(100, value))}
        className="relative h-3 w-full overflow-hidden rounded border bg-background"
      >
        <motion.div
          animate={{
            scaleX: Math.max(MIN_PROGRESS_VALUE, Math.min(MAX_PROGRESS_VALUE, value)) / 100,
          }}
          className={`h-full rounded bg-background ${barClassName}`}
          initial={{ scaleX: MIN_PROGRESS_VALUE }}
          style={{ backgroundColor: color, transformOrigin: "left" }}
          transition={shouldReduceMotion ? { duration: 0 } : SPRING}
        />
      </div>
    </div>
  );
}
