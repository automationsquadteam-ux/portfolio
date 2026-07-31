import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 border-t border-line px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            About
          </span>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-9">
          <p className="max-w-[52ch] text-xl leading-[1.45] tracking-[-0.015em] text-foreground md:text-2xl lg:text-[1.75rem]">
            We are a software house focused on building websites, AI
            automations, intelligent chatbots, and modern web applications. We
            create software that saves businesses time through automation while
            delivering polished user experiences.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
