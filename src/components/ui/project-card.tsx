"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";
import { HOVER_SPRING, staggerItem } from "@/lib/motion";
import { useSpotlight } from "@/lib/use-spotlight";
import { Spotlight } from "@/components/ui/spotlight";

export function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      variants={staggerItem}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={HOVER_SPRING}
      className={[
        "group/spot group relative isolate overflow-hidden rounded-2xl border border-line",
        "glass-panel p-2 shadow-card",
        "transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card-hover",
        project.wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <Spotlight />

      {/* ── Preview image ────────────────────────────────────────────── */}
      <div
        className={[
          "relative w-full overflow-hidden rounded-xl bg-surface-hover",
          project.wide ? "aspect-[16/7]" : "aspect-[16/10]",
        ].join(" ")}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={
            project.wide
              ? "(min-width: 1200px) 1180px, 100vw"
              : "(min-width: 768px) 50vw, 100vw"
          }
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        {/* mono index badge, top-left */}
        <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white/85 uppercase backdrop-blur-sm">
          {project.badge}
        </span>
      </div>

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-4 pt-6 pb-5 md:px-5 md:pb-6">
        <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
          {project.category}
        </span>

        <h2 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
          {project.title}
        </h2>

        <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[11px] tracking-[0.04em] text-subtle after:ml-2 after:text-line-strong after:content-['·'] last:after:content-none"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
        >
          View Project
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">({project.title}, opens in a new tab)</span>
        </a>
      </div>
    </motion.article>
  );
}
