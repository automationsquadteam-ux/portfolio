import type { Variants } from "motion/react";

/** ease-out-expo — the only easing curve this site uses. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = { reveal: 0.6, micro: 0.25, image: 0.7 } as const;

export const HOVER_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 26,
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE },
  },
};
