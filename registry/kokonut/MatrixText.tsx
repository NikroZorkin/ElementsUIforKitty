/**
 * Derived from kokonut-labs/kokonutui @ 83eec6d982d400a18438001a8efdbac1f159dd43.
 * Copyright (c) 2025 kokonutUI. MIT License.
 * Full license: licenses/kokonut.txt.
 * Adapted imports for a standalone React export; sample media is local.
 */
"use client";

/**
 * @author: @dorianbaffier
 * @description: Matrix Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../shared/utils";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixTextProps {
  text?: string;
  className?: string;
  initialDelay?: number;
  letterAnimationDuration?: number;
  letterInterval?: number;
}

const MatrixText = ({
  text = "HelloWorld!",
  className,
  initialDelay = 200,
  letterAnimationDuration = 500,
  letterInterval = 100,
}: MatrixTextProps) => {
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    })),
  );
  const isAnimating = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduce = useReducedMotion();
  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = setTimeout(fn, delay);
    timers.current.push(timer);
  }, []);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return;

      schedule(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          if (!newLetters[index].isSpace) {
            newLetters[index] = {
              ...newLetters[index],
              char: getRandomChar(),
              isMatrix: true,
            };
          }
          return newLetters;
        });

        schedule(() => {
          setLetters((prev) => {
            const newLetters = [...prev];
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            };
            return newLetters;
          });
        }, letterAnimationDuration);
      }, 0);
    },
    [getRandomChar, text, letterAnimationDuration, schedule],
  );

  const startAnimation = useCallback(() => {
    if (isAnimating.current || reduce) return;

    isAnimating.current = true;
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        isAnimating.current = false;
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      schedule(animate, letterInterval);
    };

    animate();
  }, [animateLetter, text, reduce, letterInterval, schedule]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, initialDelay);
    return () => {
      clearTimeout(timer);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      isAnimating.current = false;
    };
  }, [initialDelay, startAnimation]);

  const motionVariants = useMemo(
    () => ({
      // initial: {
      //     color: "rgb(var(--foreground-rgb))",
      // },
      matrix: {
        color: "#00ff00",
        textShadow: "0 2px 4px rgba(0, 255, 0, 0.5)",
      },
      // normal: {
      //     color: "rgb(var(--foreground-rgb))",
      //     textShadow: "none",
      // },
    }),
    [],
  );

  return (
    <div
      aria-label="Matrix text animation"
      className={cn(
        "flex min-h-screen items-center justify-center text-black dark:text-white",
        className,
      )}
    >
      <div className="flex h-24 items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          {letters.map((letter, index) => (
            <motion.div
              animate={letter.isMatrix ? "matrix" : "normal"}
              className="w-[1ch] overflow-hidden text-center font-mono text-4xl md:text-6xl"
              initial="initial"
              key={`${index}-${letter.char}`}
              style={{
                display: "inline-block",
                fontVariantNumeric: "tabular-nums",
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
              variants={motionVariants}
            >
              {letter.isSpace ? "\u00A0" : letter.char}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixText;
