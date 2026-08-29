import type { ElementType, ReactNode } from "react";

/**
 * A dark glass sheet for text to sit on.
 *
 * This exists because of the background video: the footage is bright
 * (near-white ground), so body copy placed directly on the page would be
 * unreadable. Every block of text on the site therefore lives on one of these.
 * It is a legibility primitive, not decoration — see BUILD_SPEC §3.7.
 *
 * Cards that need their own hover/spotlight behaviour (project cards, pricing
 * cards) compose the same look from the `glass-panel` utility directly instead
 * of using this component, since they need control over their own wrapper.
 */
export function Panel({
  children,
  className = "",
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`glass-panel rounded-2xl border border-line shadow-card ${className}`}
    >
      {children}
    </Tag>
  );
}
