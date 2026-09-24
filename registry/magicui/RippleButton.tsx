/** Magic UI · MIT. License: licenses/magicui.txt
 * Source: https://github.com/magicuidesign/magicui/blob/d7207e5692d14c00dceafa8488d6d01f197fa0e4/apps/www/registry/magicui/ripple-button.tsx
 * Adapted imports for portable React. */
"use client";

import React, { useEffect, useRef, useState, type MouseEvent } from "react";

import { useReducedMotion } from "motion/react";

import { cn } from "../shared/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    { className, children, rippleColor = "#ffffff", duration = "600ms", onClick, ...props },
    ref,
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const nextKey = useRef(0);
    const reducedMotion = useReducedMotion();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!reducedMotion) createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = (event.detail === 0 ? rect.width / 2 : event.clientX - rect.left) - size / 2;
      const y = (event.detail === 0 ? rect.height / 2 : event.clientY - rect.top) - size / 2;

      const newRipple = { x, y, size, key: nextKey.current++ };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (!buttonRipples.length) return;
      const parsed = Number.parseFloat(duration);
      const milliseconds = Number.isFinite(parsed)
        ? parsed * (duration.endsWith("ms") ? 1 : 1000)
        : 600;
      const timeout = setTimeout(() => setButtonRipples([]), Math.max(0, milliseconds));
      return () => clearTimeout(timeout);
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          "bg-background text-primary relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 px-4 py-2 text-center",
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling bg-background absolute rounded-full opacity-30"
              key={ripple.key}
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: `scale(0)`,
                  "--duration": duration,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";
