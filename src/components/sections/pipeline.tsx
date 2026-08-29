"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Spotlight } from "@/components/ui/spotlight";
import { leadsDashboard } from "@/lib/site";
import { useSpotlight } from "@/lib/use-spotlight";

/**
 * The status vocabulary is the one the live dashboard uses, so a visitor who
 * clicks through sees the same words. Counts are deliberately *not* mirrored
 * here — they change hourly and this page is statically prerendered.
 */
const stages = [
  {
    index: "01",
    name: "Researching",
    detail: "Company enriched, contact found, address verified.",
  },
  {
    index: "02",
    name: "Ready",
    detail: "Email drafted by the agent, queued for a human read.",
  },
  {
    index: "03",
    name: "Approved",
    detail: "Signed off and cleared to send.",
  },
  {
    index: "04",
    name: "Sent",
    detail: "Initial email out, follow-ups scheduled behind it.",
  },
  {
    index: "05",
    name: "Replied",
    detail: "Pulled out of the sequence and handed to a person.",
  },
] as const;

/**
 * Client component (unlike most sections here) because the status card
 * carries the mouse-tracking spotlight glow, which needs `useSpotlight`'s
 * pointer handler.
 */
export function Pipeline() {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <section
      id="pipeline"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-8 md:py-32 lg:px-10"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
        {/* ── Left: the pitch ──────────────────────────────────────────── */}
        <Reveal className="md:col-span-5">
          <Eyebrow>Live Dashboard</Eyebrow>

          <h1 className="mt-6 max-w-[16ch] bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-transparent md:text-5xl">
            Our lead engine, in the open.
          </h1>

          <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-muted md:text-base">
            We run our own outreach on a pipeline we built. Every lead moves
            through the statuses below, and the dashboard reads straight from
            it, with no screenshots and no edited numbers.
          </p>

          <a
            href={leadsDashboard.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "mt-10")}
          >
            View the dashboard
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        {/* ── Right: the status list ───────────────────────────────────── */}
        <Reveal delay={0.08} className="md:col-span-7">
          <div
            ref={ref}
            onPointerMove={onPointerMove}
            className="group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-linear-to-b from-white/10 to-white/4 p-2 shadow-card backdrop-blur-xl transition-shadow duration-300 hover:shadow-card-hover"
          >
            <Spotlight />

            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="truncate font-mono text-[11px] tracking-[0.04em] text-subtle">
                {leadsDashboard.host}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-background/60 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-subtle uppercase">
                <span
                  aria-hidden="true"
                  className="size-1.5 animate-pulse rounded-full bg-accent"
                />
                Live
              </span>
            </div>

            <ul className="rounded-xl border border-line bg-background/45 p-1.5">
              {stages.map((stage) => (
                <li
                  key={stage.index}
                  className="flex items-baseline gap-4 rounded-lg px-3 py-3.5 transition-colors duration-200 hover:bg-surface md:px-4"
                >
                  <span className="font-mono text-[11px] tracking-[0.04em] text-subtle">
                    {stage.index}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-foreground">
                      {stage.name}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="px-3 pt-3 pb-2 text-[15px] leading-relaxed text-muted">
              Counts update on the dashboard. Lead identities and contact
              details are never published.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
