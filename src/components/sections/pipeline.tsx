import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { leadsDashboard } from "@/lib/site";

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

export function Pipeline() {
  return (
    <section
      id="pipeline"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 border-t border-line px-6 py-24 md:px-8 md:py-32 lg:px-10"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
        {/* ── Left: the pitch ──────────────────────────────────────────── */}
        <Reveal className="md:col-span-5">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            Live Dashboard
          </span>

          <h2 className="mt-6 max-w-[16ch] text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Our lead engine, in the open.
          </h2>

          <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-muted md:text-base">
            We run our own outreach on a pipeline we built. Every lead moves
            through the statuses below, and the dashboard reads straight from
            it — no screenshots, no edited numbers.
          </p>

          <a
            href={leadsDashboard.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "mt-10")}
          >
            View the dashboard
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">— opens in a new tab</span>
          </a>
        </Reveal>

        {/* ── Right: the status list ───────────────────────────────────── */}
        <Reveal delay={0.08} className="md:col-span-7">
          <div className="rounded-3xl border border-line bg-surface p-2">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="truncate font-mono text-[11px] tracking-[0.04em] text-subtle">
                {leadsDashboard.host}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-background px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-subtle uppercase">
                <span
                  aria-hidden="true"
                  className="size-1.5 animate-pulse rounded-full bg-accent"
                />
                Live
              </span>
            </div>

            <ul className="rounded-2xl border border-line bg-background p-1.5">
              {stages.map((stage) => (
                <li
                  key={stage.index}
                  className="flex items-baseline gap-4 rounded-xl px-3 py-3.5 transition-colors duration-200 hover:bg-surface md:px-4"
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
