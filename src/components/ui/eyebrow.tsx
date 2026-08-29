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
 * in the hero's staggered entrance — if you ever touch the pill's visual
 * design, change both places.
 *
 * `as` exists for the About page, where this label is the page's only
 * heading and therefore has to be the `h1`.
 */
export function Eyebrow({
  children,
  as: Tag = "span",
}: {
  children: ReactNode;
  as?: "span" | "h1" | "h2";
}) {
  return (
    <Tag className="inline-flex items-center rounded-full border border-accent/30 bg-background/60 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase backdrop-blur-md">
      {children}
    </Tag>
  );
}
