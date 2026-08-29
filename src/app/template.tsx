"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Page transition. `template.tsx` (not `layout.tsx`) is what makes this work:
 * Next gives it a key per route segment, so it remounts on every navigation
 * and its entrance animation replays. A layout would mount once and never
 * animate again.
 *
 * Two parts, played together on each route change:
 *   1. A curtain that collapses upward off-screen (scaleY 1 → 0, origin-top).
 *   2. The incoming page fading up behind it, starting slightly before the
 *      curtain finishes so the two overlap instead of running end to end.
 *
 * The curtain sits at z-40, below the header's z-50, so the nav stays put
 * while the content area wipes — navigating feels like swapping a panel in an
 * app rather than reloading a document. It's opaque rather than a frosted
 * blur: a full-viewport backdrop-filter animating at 60fps is exactly the kind
 * of effect that janks on low-end hardware, and the video is only hidden for
 * half a second.
 *
 * Only opacity and transform are animated (R9). Under reduced motion the
 * curtain is dropped entirely and the page just fades.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 origin-top bg-background-deep"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
