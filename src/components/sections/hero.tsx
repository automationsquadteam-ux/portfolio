"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { buttonClass } from "@/components/ui/button";

/**
 * The headline, split for the per-word staggered reveal. Kept as data rather
 * than parsed from a string so the accent phrase stays explicit: `accent`
 * marks the words that carry the shimmering gradient.
 */
const HEADLINE = [
  { word: "We", accent: false },
  { word: "Build", accent: false },
  { word: "Websites,", accent: false },
  { word: "Automations", accent: false },
  { word: "&", accent: false },
  { word: "AI", accent: true },
  { word: "Agents", accent: true },
];

/** First word lands at 0.15s, each following word 0.08s behind the last. */
const WORD_DELAY_BASE = 0.15;
const WORD_DELAY_STEP = 0.08;
const SUBTEXT_DELAY =
  WORD_DELAY_BASE + HEADLINE.length * WORD_DELAY_STEP + 0.14;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="mx-auto flex w-full max-w-[1200px] flex-col justify-center px-6 pt-[70px] pb-8 md:px-8 lg:px-10 min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-4.5rem)]"
    >
      {/* Deliberately capped well short of the container width and left-aligned:
          the panel has to leave the right-hand side of the viewport clear so the
          video's sphere and its gold glow stay visible beside the copy rather
          than being covered by it. */}
      <div className="glass-panel flex max-w-[680px] flex-col items-start rounded-2xl border border-line px-7 py-10 shadow-card md:px-10 md:py-12">
        <motion.span
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="inline-flex items-center rounded-full border border-accent/30 bg-background/60 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase backdrop-blur-md md:text-xs"
        >
          Software House · AI Automations · Web Development
        </motion.span>

        {/* One step down from the pre-panel scale — 72px+ type inside a 680px
            panel wrapped to five ragged lines. */}
        <h1 className="mt-6 flex flex-wrap gap-x-[0.25em] text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          {HEADLINE.map((item, index) => (
            <motion.span
              key={`${item.word}-${index}`}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: WORD_DELAY_BASE + index * WORD_DELAY_STEP,
                ease: EASE,
              }}
              className={
                item.accent
                  ? "bg-linear-to-r from-accent via-blue-300 to-accent bg-size-[200%_auto] bg-position-[0%_center] bg-clip-text text-transparent animate-[text-shimmer_4s_linear_infinite]"
                  : "bg-linear-to-b from-foreground via-foreground/95 to-foreground/75 bg-clip-text text-transparent"
              }
            >
              {item.word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: SUBTEXT_DELAY, ease: EASE }}
          className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted md:mt-8 md:text-lg"
        >
          We are a software house helping businesses automate workflows, launch
          websites, and build AI tools that are fast, scalable, and
          conversion-focused.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: SUBTEXT_DELAY + 0.1, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
        >
          <Link href="/projects" className={buttonClass("primary")}>
            View Projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className={buttonClass("secondary")}>
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
