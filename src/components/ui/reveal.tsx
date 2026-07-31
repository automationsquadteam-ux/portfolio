"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** px travel; ignored when the user prefers reduced motion */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.reveal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
