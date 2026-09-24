/** SmoothUI · MIT. License: licenses/smoothui.txt
 * Source: https://github.com/educlopez/smoothui/blob/df0453c967224a91d460aa3bd1786c737c2c95bc/packages/smoothui/blocks/pricing/pricing-1/index.tsx
 * Adapted imports for portable React. */
"use client";

import SmoothButton from "./SmoothButton";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import PriceFlow from "./PriceFlow";

export function PricingSimple({ onPlanSelect }: { onPlanSelect?: (plan: string) => void } = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section>
      <div className="relative bg-muted/50 py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-bold text-3xl md:text-4xl lg:text-5xl lg:tracking-tight">
              Simple pricing for everyone
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-foreground/70 text-lg">
              One plan, all features. No hidden fees, no complicated tiers.
            </p>
            <div className="my-12">
              <div
                className="relative mx-auto grid w-fit grid-cols-2 rounded-full border bg-background p-1 *:block *:h-8 *:w-24 *:rounded-full *:text-foreground *:text-sm *:hover:opacity-75"
                data-period={isAnnual ? "annually" : "monthly"}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-1 w-1/2 rounded-full border border-transparent bg-brand shadow ring-1 ring-foreground/5 transition-transform duration-500 ease-in-out ${
                    isAnnual ? "translate-x-full" : "translate-x-0"
                  }`}
                />
                <button
                  className="relative duration-500 data-[active=true]:font-medium data-[active=true]:text-white"
                  data-active={!isAnnual}
                  onClick={() => setIsAnnual(false)}
                  type="button"
                >
                  Monthly
                </button>
                <button
                  className="relative duration-500 data-[active=true]:font-medium data-[active=true]:text-white"
                  data-active={isAnnual}
                  onClick={() => setIsAnnual(true)}
                  type="button"
                >
                  Annually
                </button>
              </div>
              <div className="mt-3 text-center text-xs">
                <span className="font-medium text-brand">Save 20%</span> On Annual Billing
              </div>
            </div>
          </div>
          <div className="container">
            <div className="mx-auto max-w-md">
              <motion.div
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                className="group relative flex h-[650px] cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background p-8"
                data-animate-card
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {/* Gradient Accent */}
                <div className="gradient-accent absolute top-0 right-0 h-4 w-32 rounded-bl-2xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400" />

                <div className="card-content relative z-10 flex h-full flex-col">
                  {/* Title */}
                  <h3 className="mb-4 font-bold text-2xl text-foreground">Pro</h3>
                  {/* Price & Duration */}
                  <div className="mb-6">
                    <span className="font-semibold text-3xl text-foreground">
                      <PriceFlow value={isAnnual ? 15 : 19} />€
                    </span>
                    <span className="mx-2 text-foreground/70">•</span>
                    <span className="text-foreground/70">Perfect for individuals</span>
                  </div>
                  {/* CTA Button */}
                  <SmoothButton
                    onClick={() => onPlanSelect?.(isAnnual ? "Annual Pro" : "Monthly Pro")}
                    className="mb-6 w-full"
                    variant="candy"
                  >
                    Get Started
                  </SmoothButton>
                  {/* Description */}
                  <p className="mb-6 flex-grow text-foreground/70 text-sm leading-relaxed">
                    Everything you need to build and deploy amazing applications. Simple, powerful,
                    and affordable.
                  </p>
                  {/* What's Included */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground/70 text-xs uppercase tracking-wider">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Unlimited Projects",
                        "Email Support",
                        "All Features",
                        "Advanced Analytics",
                        "Team Collaboration",
                        "Custom Domains",
                        "Priority Updates",
                        "API Access",
                      ].map((item) => (
                        <li className="flex items-center gap-3 text-foreground text-sm" key={item}>
                          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
                            <svg
                              aria-hidden="true"
                              className="h-2 w-2 text-background"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                clipRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSimple;
