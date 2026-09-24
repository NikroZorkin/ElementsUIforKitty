/**
 * Derived from educlopez/smoothui @ df0453c967224a91d460aa3bd1786c737c2c95bc.
 * Copyright (c) 2024 Eduardo Calvo. MIT License.
 * Full license: licenses/smoothui.txt.
 * Adapted imports for a standalone React export; sample media is local.
 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import type React from "react";

export interface WaveTextProps {
  amplitude?: number;
  children: string;
  className?: string;
  duration?: number;
  staggerDelay?: number;
}

const WaveText: React.FC<WaveTextProps> = ({
  children,
  amplitude = 8,
  duration = 1.2,
  staggerDelay = 0.05,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, -amplitude, 0, amplitude * 0.5, 0] }}
          key={`${i}-${char}`}
          style={{
            display: "inline-block",
            willChange: shouldReduceMotion ? undefined : "transform",
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  delay: i * staggerDelay,
                  duration,
                  ease: [0.37, 0, 0.63, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }
          }
        >
          {char === " " ? "\u00A0" : String(char)}
        </motion.span>
      ))}
    </span>
  );
};

export default WaveText;
