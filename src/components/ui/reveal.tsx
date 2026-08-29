"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion";

/**
 * The single scroll-reveal primitive: fade up, once, on entering the viewport.
 *
 * This also covers the `FadeUp` role from the video-theme spec — same
 * animation, same easing, same `viewport: { once, amount: 0.2 }` — so the
 * codebase keeps one reveal component rather than two that do the same thing.
 * `as` was added for that: it lets a reveal render as the semantic element it
 * wraps (an <h1>, a <p>) instead of always adding a wrapper <div>.
 */
type RevealTag = "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "nav";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** seconds */
  delay?: number;
  /** seconds */
  duration?: number;
  /** px travel; ignored when the user prefers reduced motion */
  y?: number;
  /** element to render — defaults to a wrapper div */
  as?: RevealTag;
  /** re-animate every time it re-enters the viewport when false */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = DURATION.reveal,
  y = 24,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  // The motion proxy resolves each tag to its own props type; they're all
  // structurally identical for what this component sets, so one cast keeps
  // the dynamic tag usable without widening every prop to `any`.
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
