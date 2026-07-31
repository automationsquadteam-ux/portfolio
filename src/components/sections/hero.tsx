"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { buttonClass } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1200px] px-6 pt-36 pb-24 md:px-8 md:pt-44 md:pb-32 lg:px-10 lg:pt-52 lg:pb-40"
    >
      {/* single, very subtle depth cue — delete if it reads as decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.p
          variants={staggerItem}
          className="font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase md:text-xs"
        >
          Software House · AI Automations · Web Development
        </motion.p>

        <motion.h1
          variants={staggerItem}
          className="mt-6 max-w-[18ch] text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          We Build Websites, AI Automations &amp; Chatbots
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
    </section>
  );
}
