/** SmoothUI · MIT. License: licenses/smoothui.txt
 * Source: https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/blocks/ctas/cta-1/index.tsx
 * Adapted imports for portable React. */
"use client";

import SmoothButton from "./SmoothButton";
import { motion, useReducedMotion } from "motion/react";

const SPRING = {
  bounce: 0.1,
  duration: 0.25,
  type: "spring" as const,
};

export function CtaCentered({
  onPrimaryAction,
  onSecondaryAction,
}: { onPrimaryAction?: () => void; onSecondaryAction?: () => void } = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="cta-centered-heading">
      <div className="relative overflow-hidden bg-muted/50 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.08,transparent_70%)]"
        />
        <motion.div
          className="relative mx-auto max-w-3xl px-6 text-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          transition={shouldReduceMotion ? { duration: 0 } : { ...SPRING, staggerChildren: 0.08 }}
          viewport={{ once: true }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          <h2
            className="text-balance font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl"
            id="cta-centered-heading"
          >
            Ready to build something amazing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-foreground/70 text-lg">
            Start building with beautifully animated components today. Free, open source, and ready
            for production.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <SmoothButton onClick={onPrimaryAction} size="lg" variant="candy">
              Get Started
            </SmoothButton>
            <SmoothButton onClick={onSecondaryAction} size="lg" variant="outline">
              Learn More
            </SmoothButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaCentered;
