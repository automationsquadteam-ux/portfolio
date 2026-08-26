import type { ReactNode } from "react";

/**
 * The accent pill used for each section's single primary eyebrow (Hero,
 * Pipeline, Pricing, About). Deliberately not used for secondary in-section
 * labels like Pricing's "Core Services" / "Bundles" — those stay plain
 * `text-subtle` mono text so the accent budget stays spent in one place per
 * section (see BUILD_SPEC.md §3.1).
 *
 * Hero renders its own equivalent markup directly on a `motion.span`
 * instead of using this component, since its eyebrow needs to participate
 * in the hero's stagger-entrance `variants` — everywhere else, this is the
 * one place that markup lives.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
      {children}
    </span>
  );
}
