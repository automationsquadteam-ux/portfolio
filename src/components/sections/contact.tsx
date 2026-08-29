"use client";

import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Spotlight } from "@/components/ui/spotlight";
import { useSpotlight } from "@/lib/use-spotlight";
import { gmailComposeUrl, mailtoUrl, site } from "@/lib/site";

/**
 * Client component (unlike most sections here) because the panel carries
 * the mouse-tracking spotlight glow — this is the page's final conversion
 * moment, so it gets the same emphasis treatment as a bundle/service card.
 */
export function Contact() {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      <Reveal>
        <div
          ref={ref}
          onPointerMove={onPointerMove}
          className="group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-linear-to-b from-white/10 to-white/4 px-8 py-14 shadow-card backdrop-blur-xl md:px-14 md:py-20 lg:px-20 lg:py-24"
        >
          <Spotlight />

          <h1 className="max-w-[18ch] bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-transparent md:text-5xl lg:text-[3.5rem]">
            Have a project in mind? Let&apos;s build something together.
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
            <CopyEmailButton email={site.email} />
          </div>

          <a
            href={mailtoUrl}
            className="mt-6 inline-block font-mono text-[13px] text-subtle transition-colors duration-200 hover:text-foreground"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
