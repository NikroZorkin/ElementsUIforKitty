/** SmoothUI · MIT. License: licenses/smoothui.txt
 * Source: https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/components/scramble-hover/index.tsx
 * Adapted imports for portable React. */
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

export interface ScrambleHoverProps {
  children: string;
  className?: string;
  duration?: number; // total animation duration in ms
  speed?: number; // interval between scrambles in ms
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?".split("");

function scrambleText(original: string) {
  return original
    .split("")
    .map((char) => (char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]))
    .join("");
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  children,
  duration = 600,
  speed = 30,
  className = "",
}) => {
  const [display, setDisplay] = useState(children);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    setShouldReduceMotion(motionQuery.matches);
    setIsHoverDevice(hoverQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };
    const handleHoverChange = (e: MediaQueryListEvent) => {
      setIsHoverDevice(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    hoverQuery.addEventListener("change", handleHoverChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      hoverQuery.removeEventListener("change", handleHoverChange);
    };
  }, []);

  const handleMouseEnter = () => {
    if (shouldReduceMotion || !isHoverDevice) {
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDisplay(() => scrambleText(children));
    }, speed);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setDisplay(children);
    }, duration);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplay(children);
  };

  return (
    <button
      className={className}
      onBlur={handleMouseLeave}
      onFocus={isHoverDevice ? handleMouseEnter : undefined}
      onMouseEnter={isHoverDevice ? handleMouseEnter : undefined}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        cursor: "pointer",
        display: "inline-block",
        font: "inherit",
        padding: 0,
        textAlign: "inherit",
      }}
      type="button"
    >
      {display}
    </button>
  );
};

export default ScrambleHover;
