"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { buttonClass } from "@/components/ui/button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Cinematic scroll-out: the hero fades, shrinks and drifts down slightly
  // as it scrolls past, tracked only across its own height (not the whole
  // page) so the effect is finished well before Projects arrives.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const parallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1200px] px-6 pt-36 pb-24 md:px-8 md:pt-44 md:pb-32 lg:px-10 lg:pt-52 lg:pb-40"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : { opacity: parallaxOpacity, scale: parallaxScale, y: parallaxY }
        }
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase md:text-xs"
          >
            Software House · AI Automations · Web Development
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="mt-6 max-w-[18ch] bg-linear-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.035em] text-balance text-transparent sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            We Build Websites, Automations &amp;{" "}
            <span className="bg-linear-to-r from-accent via-blue-300 to-accent bg-size-[200%_auto] bg-position-[0%_center] bg-clip-text text-transparent animate-[text-shimmer_4s_linear_infinite]">
              AI Agents
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted md:mt-8 md:text-lg"
          >
            We are a software house helping businesses automate workflows,
            launch websites, and build AI tools that are fast, scalable, and
            conversion-focused.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
          >
            <a href="#projects" className={buttonClass("primary")}>
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#contact" className={buttonClass("secondary")}>
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
