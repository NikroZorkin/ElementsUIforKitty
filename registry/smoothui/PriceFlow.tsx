/** Adapted from SmoothUI PriceFlow. MIT; licenses/smoothui.txt.
 * https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/components/price-flow/index.tsx
 * Supports arbitrary digit counts and reduced motion; preserves the rolling-digit presentation. */
"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../shared/utils";

export interface PriceFlowProps {
  className?: string;
  value: number;
}
export default function PriceFlow({ value, className = "" }: PriceFlowProps) {
  const reduce = useReducedMotion();
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
  return (
    <span
      className={cn("relative inline-flex items-center tabular-nums", className)}
      aria-label={formatted}
    >
      {Array.from(formatted).map((char, index) => (
        <span
          key={formatted.length - index}
          aria-hidden="true"
          className="relative inline-block overflow-hidden"
          style={{ width: /\d/.test(char) ? ".62em" : ".3em", height: "1.2em", lineHeight: 1.2 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={char}
              className="block text-center"
              initial={{ y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduce ? 0 : "-100%", opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
