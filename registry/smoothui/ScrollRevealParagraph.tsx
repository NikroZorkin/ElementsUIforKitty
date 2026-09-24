/**
 * Derived from educlopez/smoothui @ df0453c967224a91d460aa3bd1786c737c2c95bc.
 * Copyright (c) 2024 Eduardo Calvo. MIT License.
 * Full license: licenses/smoothui.txt.
 * Adapted imports for a standalone React export; sample media is local.
 */
"use client";

import { type MotionValue, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const KEY_PREFIX_LENGTH = 3;

export interface ScrollRevealParagraphProps {
  className?: string;
  paragraph: string;
}

export default function ScrollRevealParagraph({
  paragraph,
  className = "",
}: ScrollRevealParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start 0.9", "start 0.25"],
    target: container,
  });

  const words = paragraph.split(" ");

  return (
    <p className={`text-lg leading-relaxed ${className}`} ref={container}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const shouldReduceMotion = useReducedMotion();
  const opacity = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0, 1]);

  return (
    <span className="relative mr-2 inline-block">
      {shouldReduceMotion ? null : <span className="text-foreground/10">{children}</span>}
      <motion.span className="absolute inset-0 text-foreground" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};
