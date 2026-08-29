import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      <Reveal className="glass-panel rounded-2xl border border-line px-6 py-10 shadow-card md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          {/* The page's h1. This section has no display heading of its own —
              the label *is* the heading — so it carries the level rather than
              inventing new copy for one. */}
          <div className="md:col-span-3">
            <Eyebrow as="h1">About</Eyebrow>
          </div>

          <p className="max-w-[52ch] bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-xl leading-[1.45] tracking-[-0.015em] text-transparent md:col-span-9 md:text-2xl lg:text-[1.75rem]">
            We are a software house focused on building websites, AI
            automations, AI agents, and modern web applications. We create
            software that saves businesses time through automation while
            delivering polished user experiences.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
