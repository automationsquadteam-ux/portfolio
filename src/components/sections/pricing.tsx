"use client";

import { Download } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Spotlight } from "@/components/ui/spotlight";
import { useSpotlight } from "@/lib/use-spotlight";
import {
  addOns,
  bundles,
  coreServices,
  formatUSD,
  pricingHowWeWork,
  pricingIntro,
  pricingUpdated,
  ratecard,
  type Bundle,
  type CoreService,
} from "@/lib/pricing";

/** lg-breakpoint column width for the core-services bento grid — see the
 * `span` field on CoreService in src/lib/pricing.ts for why width is the
 * only thing that varies (never row height). */
const spanClass: Record<CoreService["span"], string> = {
  full: "sm:col-span-2 lg:col-span-6",
  half: "sm:col-span-2 lg:col-span-3",
  third: "sm:col-span-1 lg:col-span-2",
};

/** Shared setup/monthly stat block used on both service and bundle cards. */
function PriceStats({
  setup,
  monthly,
  monthlyNote,
}: {
  setup: number;
  monthly: number;
  monthlyNote?: string;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
      <div>
        <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-subtle uppercase">
          Setup
        </p>
        <p className="mt-1 text-xl font-semibold tracking-[-0.02em]">
          {formatUSD(setup)}
        </p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-subtle uppercase">
          Monthly
        </p>
        <p className="mt-1 text-xl font-semibold tracking-[-0.02em]">
          {formatUSD(monthly)}
          {monthlyNote && (
            <span className="ml-1 text-xs font-normal text-subtle">
              {monthlyNote}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: CoreService }) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={[
        "group/spot relative isolate flex flex-col overflow-hidden rounded-2xl border border-line",
        "glass-panel p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover",
        spanClass[service.span],
      ].join(" ")}
    >
      <Spotlight />
      <h3 className="text-lg font-semibold tracking-[-0.01em]">
        {service.name}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted">
        {service.description}
      </p>

      <PriceStats
        setup={service.setup}
        monthly={service.monthly}
        monthlyNote={service.monthlyNote}
      />
    </article>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className="group/spot relative isolate flex flex-col overflow-hidden rounded-2xl border border-line glass-panel p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:p-8"
    >
      <Spotlight />
      <h3 className="text-xl font-semibold tracking-[-0.02em]">
        {bundle.name}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted">
        {bundle.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {bundle.includes.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-subtle"
          >
            {item}
          </li>
        ))}
      </ul>

      <PriceStats
        setup={bundle.setup}
        monthly={bundle.monthly}
        monthlyNote={bundle.monthlyNote}
      />

      {bundle.savings && (
        <p className="mt-4 text-[13px] font-medium text-foreground">
          {bundle.savings}
        </p>
      )}
    </article>
  );
}

/**
 * Client component (unlike the section it most resembles structurally,
 * About) because every service and bundle card carries the mouse-tracking
 * spotlight glow via `useSpotlight`.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      {/* ── Header + PDF download ────────────────────────────────────── */}
      <Reveal>
        <div className="glass-panel flex flex-col gap-6 rounded-2xl border border-line px-6 py-8 shadow-card sm:flex-row sm:items-end sm:justify-between md:px-10 md:py-10">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-6 max-w-[20ch] bg-linear-to-b from-foreground to-foreground/75 bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-transparent md:text-5xl">
              Every service, priced up front.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted md:text-base">
              {pricingIntro}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <a
              href={ratecard.href}
              download={ratecard.downloadName}
              className={buttonClass("secondary")}
            >
              <Download className="size-4" aria-hidden="true" />
              Download rate card
              <span className="sr-only"> (PDF)</span>
            </a>
            <p className="font-mono text-[11px] tracking-[0.04em] text-subtle">
              Updated {pricingUpdated}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Core services — asymmetric bento grid ────────────────────── */}
      <Reveal delay={0.08} className="mt-20 md:mt-24">
        {/* Subhead blocks get their own compact panel rather than a full-width
            one, so the video still shows between them and the grids below. */}
        <div className="glass-panel inline-block rounded-2xl border border-line px-6 py-5 shadow-card">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
            Core Services
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Pick what you need
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-6">
          {coreServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Reveal>

      {/* ── Bundles ───────────────────────────────────────────────────── */}
      <Reveal delay={0.08} className="mt-20 md:mt-24">
        <div className="glass-panel inline-block rounded-2xl border border-line px-6 py-5 shadow-card">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
            Bundles
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Combine services and save
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
            Each bundle below costs less than buying the same services
            separately.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:gap-6 lg:grid-cols-2">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </Reveal>

      {/* ── Add-ons + how we work ────────────────────────────────────── */}
      <Reveal
        delay={0.08}
        className="mt-20 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-12 md:gap-6"
      >
        <div className="glass-panel h-fit rounded-2xl border border-line px-6 py-7 shadow-card md:col-span-5">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
            Add-Ons
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
            Extend any service
          </h2>

          <div className="mt-6 rounded-xl border border-line bg-white/5 p-2">
            <ul className="divide-y divide-line">
              {addOns.map((addOn) => (
                <li
                  key={addOn.id}
                  className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="text-[15px] text-foreground">
                    {addOn.name}
                  </span>
                  <span className="shrink-0 font-mono text-[12px] tracking-[0.02em] text-subtle">
                    {addOn.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-panel h-fit rounded-2xl border border-line px-6 py-7 shadow-card md:col-span-7">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
            How We Work
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
            Getting started
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
            {pricingHowWeWork}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
