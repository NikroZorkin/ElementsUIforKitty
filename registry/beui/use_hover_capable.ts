/**
 * Derived from starc007/ui-components @ fa3393a3891723d4d2daec1f1d82ead175442f44.
 * Copyright (c) 2026 Saurabh Chauhan. MIT License.
 * Full license: licenses/beui.txt.
 * Adapted imports for a standalone React export; sample media is local.
 */
"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only on devices that have a true hover (mouse / trackpad).
 * Touch devices fire phantom `:hover` on tap that sticks until tap-elsewhere
 * — gate hover-only effects (scale lifts, magnetic pulls) behind this.
 */
export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return canHover;
}
