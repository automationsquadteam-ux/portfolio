"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { staggerContainer } from "@/lib/motion";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-transparent md:text-5xl">
            Featured Projects
          </h1>
          <span className="font-mono text-[11px] tracking-[0.18em] text-subtle uppercase">
            Selected Work · 03
          </span>
        </div>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
