# BUILD SPEC — Automation Squad Portfolio

**Read this whole file before you write a single line of code.**

You are building a **multi-page, dark-mode, premium-minimal portfolio site** for
**Automation Squad**, an AI-automation & full-stack development studio.

**Current theme (2026-08-27, §3.7): white-on-video.** A single looping video is fixed
behind the whole site; every page is transparent and floats over it, held legible by a
scrim and by glass cards with backdrop blur. Type is Helvetica Now Var, white at
descending opacities. The **one blue accent** is unchanged and still brand-linked (§3.1).

The card language from the previous "deep space with ambient light" pass survives intact —
16px radii, multi-layer glow shadows, mouse-tracking spotlights, gradient headline type,
expo-out easing (§3.2–§3.6). Only the *background layer* changed: the animated gradient
blobs were replaced by the video. Read §3.7 for what that means before touching the scrim
or the palette, because the contrast figures in §3.1 depend on both.

---

## ✅ BUILD STATUS — 2026-07-31

**The site described in this document has been built.** Every file in §7 exists and
`npm run lint` + `npm run build` are both clean. Steps are marked `✅ DONE` inline below.

| Area | Status |
| --- | --- |
| §7.0 – §7.13 — all 15 site files | ✅ Built |
| §7.14 Lead pipeline section (added 2026-08-05) | ✅ Built — lint + build re-run clean, `/` still static |
| §7.15 Pricing section + rate-card PDF download (added 2026-08-22) | ✅ Built — lint + build re-run clean, `/` still static, PDF serves `200 application/pdf` |
| §3.6 / §7.16 "Deep space with ambient light" redesign (added 2026-08-26) | ✅ Built — every section restyled, hamburger mobile menu added, lint + build re-run clean, `/` still static |
| §7.17 Copy pass: no em dashes, "chatbot" → "AI agent" (added 2026-08-26) | ✅ Built — lint + build re-run clean, `/` still static, verified no stale "chatbot"/em-dash text in rendered HTML. ⬜ PDF rate card not regenerated — see §7.17's follow-up note |
| §3.7 / §7.18 Video-background theme (added 2026-08-27) | ✅ Built — fixed background video + legibility scrim, white-on-video palette, Helvetica Now Var. Replaces the ambient-blob system from §7.16 |
| §7.19 Multi-page conversion + route transitions (added 2026-08-27) | ✅ Built — 6 routes, all prerendered static, each with one `h1`, its own title/description/canonical. Curtain-wipe page transition via `template.tsx` |
| §7.20 Generated sitemap (added 2026-08-27) | ✅ Built — `/sitemap.xml` lists all six routes; stale `public/sitemap.xml` that was shadowing it deleted. `robots.ts` needed no change |
| §7.21 Scrim depth, sticky footer, Home nav (added 2026-08-29) | ✅ Built — scrim deepened and §3.1 contrast re-derived, footer pinned to the viewport bottom and made opaque, `Home` added to the nav |
| §6.2 Brand assets (favicons, icons, logo mark, lockup) | ✅ Generated from the master logo |
| §6.3 Metadata, OG image, manifest, robots, sitemap, JSON-LD | ✅ Built and verified in the served output |
| §12 Domain + Vercel deploy steps | ✅ Documented — ⬜ owner to execute |
| `npm run lint` | ✅ Zero problems |
| `npm run build` | ✅ Zero errors, zero warnings |
| Static render (`/` prerendered) | ✅ Verified — all copy, links and section IDs present in the HTML |
| §10 Accessibility / performance | ✅ Code-level items done · ⬜ Lighthouse + reduced-motion pass need a browser |
| §11 Manual QA | ⬜ **Owner to run** — hover, responsive and Lighthouse checks need a real browser |
| Project screenshots | ⚠️ **Placeholders in place** — see the box below |

> ### ⚠️ Replace the placeholder images
> `public/projects/anchor.png`, `lumberwiz.png` and `charmeem.png` are currently generated
> gradient placeholders (a framed rectangle with an X through it) so the layout renders and
> the build stays green. **Overwrite all three with the real screenshots** — same filenames,
> no code changes needed. Instructions: [`public/projects/README.md`](public/projects/README.md).

This document is still the source of truth. If you change the site, change this file too.

---

## TABLE OF CONTENTS

0. [Hard rules](#0-hard-rules)
1. [What already exists in this repo](#1-what-already-exists-in-this-repo)
2. [Next.js 16 gotchas](#2-nextjs-16-gotchas-read-or-you-will-ship-warnings)
3. [Design system — the source of truth](#3-design-system--the-source-of-truth)
4. [Page map + wireframes](#4-page-map--wireframes)
5. [Exact copy (do not paraphrase)](#5-exact-copy-do-not-paraphrase)
6. [Assets, brand & SEO](#6-assets-brand--seo)
7. [Build steps — file by file](#7-build-steps--file-by-file)
8. [Motion spec](#8-motion-spec)
9. [Responsive spec](#9-responsive-spec)
10. [Accessibility + performance checklist](#10-accessibility--performance-checklist)
11. [How to verify you are done](#11-how-to-verify-you-are-done)
12. [Deploy](#12-deploy)
13. [Troubleshooting](#13-troubleshooting)
14. [Out of scope](#14-out-of-scope--do-not-build-these)

---

## 0. HARD RULES

Break any of these and the work is wrong.

| # | Rule |
| --- | --- |
| R1 | ~~**One page only.**~~ **SUPERSEDED 2026-08-27 (§7.19).** The site is now **multi-page**: `/` (hero), `/projects`, `/pipeline`, `/pricing`, `/about`, `/contact`. Navigation is `next/link` routing, not hash anchors. The section `id`s (`#projects`, `#about`, …) are kept on the section elements so old inbound links still land somewhere sensible, but they are no longer how the nav works. |
| R2 | **Dark mode only.** There is no light theme and no theme toggle. Do not write `dark:` variants. |
| R3 | **Exactly 3 projects.** Anchor Builders, Lumber Wiz, Char Meem Clothing. No more, no fewer. |
| R4 | **No Tech Stack section.** Tech names appear *only* as small tags inside project cards. This was explicitly cut. |
| R5 | **No testimonials, blog, timeline, resume, stats counters, or logo walls.** Two approved additions to this list: the **Lead pipeline** section (§7.14, added 2026-08-05) links out to the live outreach dashboard, and the **Pricing** section (§7.15, added 2026-08-22) mirrors the official rate-card PDF. Do not delete either, and do not let the pipeline section grow into a stats-counter block. |
| R6 | **No emoji anywhere.** Icons come from `lucide-react` only. |
| R7 | **Use the design tokens in §3.** Never hard-code a hex value inside a component. |
| R8 | **Every animation must respect `prefers-reduced-motion`.** Use `useReducedMotion()` from `motion/react`. |
| R9 | **Only animate `opacity` and `transform`.** Never animate `width`, `height`, `top`, `left`, or `box-shadow`. |
| R10 | `npm run build` and `npm run lint` must both pass with **zero errors and zero warnings** before you say you are done. |

**Definition of done:** every box in §11 is ticked.

---

## 1. WHAT ALREADY EXISTS IN THIS REPO

The scaffold is done. **Do not re-run `create-next-app`. Do not re-install dependencies.**

### 1.1 Installed versions (already in `package.json`)

```
next          16.2.12      (App Router, Turbopack)
react         19.2.4
react-dom     19.2.4
typescript    ^5
tailwindcss   ^4           (CSS-first config — there is NO tailwind.config.js)
motion        ^12.43.0     (this is Framer Motion, renamed)
lucide-react  ^1.28.0      (icons)
eslint        ^9 + eslint-config-next
```

### 1.2 Current file tree  ✅ AS BUILT

```
portfolio/
├── public/
│   ├── projects/
│   │   ├── anchor.png              ⚠️ placeholder — replace with the real screenshot
│   │   ├── lumberwiz.png           ⚠️ placeholder
│   │   ├── charmeem.png            ⚠️ placeholder
│   │   └── README.md               how to capture and drop in the real ones
│   ├── logo-mark.png               §6.2 transparent gear mark (header chip, OG card)
│   ├── logo-lockup.png             §6.2 transparent full lockup (JSON-LD logo)
│   ├── icon-192.png                §6.2 PWA icon
│   ├── icon-512.png                §6.2 PWA icon
│   └── Automation_Squad_Rate_Card.pdf  §6.4 the rate-card PDF, downloadable from §7.15
├── src/
│   ├── app/
│   │   ├── favicon.ico             §6.2 multi-res 16/32/48/64, branded
│   │   ├── icon.png                §6.2 512² primary favicon
│   │   ├── apple-icon.png          §6.2 180² iOS home-screen icon
│   │   ├── opengraph-image.tsx     §6.3 1200×630 OG card via next/og
│   │   ├── twitter-image.tsx       §6.3 re-exports the OG card
│   │   ├── manifest.ts             §6.3 /manifest.webmanifest
│   │   ├── robots.ts               §6.3 /robots.txt
│   │   ├── sitemap.ts              §7.20 /sitemap.xml — all six routes, derived from navLinks
│   │   ├── globals.css             §7.1  tokens, shadow tokens (§3.3), font @import, shimmer keyframes, reduced motion
│   │   ├── layout.tsx              §7.2  fonts, metadata, viewport; renders <BackgroundVideo> + header + <main> + footer
│   │   ├── template.tsx            §7.19 client — the page transition (remounts per route)
│   │   ├── page.tsx                §7.19 /          → <Hero>
│   │   ├── projects/page.tsx       §7.19 /projects  → <Projects> + <ProjectsCollectionData>
│   │   ├── pipeline/page.tsx       §7.19 /pipeline  → <Pipeline>
│   │   ├── pricing/page.tsx        §7.19 /pricing   → <Pricing>
│   │   ├── about/page.tsx          §7.19 /about     → <About>
│   │   └── contact/page.tsx        §7.19 /contact   → <Contact>
│   ├── components/
│   │   ├── site-header.tsx         §7.9  client — sticky, frosts on scroll, Link nav + active state, hamburger below lg
│   │   ├── site-footer.tsx         §7.12 server — translucent, carries the full route list
│   │   ├── structured-data.tsx     §6.3  server — site-wide @graph + <ProjectsCollectionData> (§7.19)
│   │   ├── sections/
│   │   │   ├── hero.tsx            §7.10 client — full-viewport, per-word staggered headline (§7.18)
│   │   │   ├── projects.tsx        §7.10 client — stagger container
│   │   │   ├── pipeline.tsx        §7.14 client — lead dashboard link-out (client since §7.16, for the spotlight card)
│   │   │   ├── pricing.tsx         §7.15 client — services, bundles, add-ons (client since §7.16, for the spotlight cards)
│   │   │   ├── about.tsx           §7.10 server
│   │   │   └── contact.tsx         §7.10 client — client since §7.16, for the spotlight card
│   │   └── ui/
│   │       ├── reveal.tsx          §7.6  client — the scroll-reveal primitive (absorbed FadeUp's API in §7.18)
│   │       ├── button.tsx          §7.7  server — buttonClass() + ButtonLink, glow shadow + shine sweep (§7.16)
│   │       ├── project-card.tsx    §7.8  client — hover lift + image zoom + spotlight (§7.16)
│   │       ├── copy-email-button.tsx §7.11 client — clipboard + Copied state
│   │       ├── background-video.tsx §3.7/§7.18 client — the fixed background video + legibility scrim
│   │       ├── spotlight.tsx       §3.6/§7.16 — the mouse-tracking glow overlay
│   │       └── eyebrow.tsx         §3.1/§7.16 server — the shared accent-pill section label
│   └── lib/
│       ├── site.ts                 §7.3  name, email, Gmail/mailto URLs, nav routes + segments
│       ├── projects.ts             §7.4  the three projects
│       ├── motion.ts               §7.5  EASE, DURATION, variants
│       ├── pricing.ts              §7.15 services, bundles, add-ons — mirrors the PDF; `span` field added in §7.16
│       └── use-spotlight.ts        §3.6/§7.16 client hook — pointer tracking for <Spotlight>
├── AGENTS.md                       points here
├── BUILD_SPEC.md                   <- you are here
├── eslint.config.mjs
├── next.config.ts                  untouched default
├── postcss.config.mjs              untouched default
├── tsconfig.json                   untouched default (`@/*` -> `./src/*`)
└── package.json
```

The five `create-next-app` SVGs (`file`, `globe`, `next`, `vercel`, `window`) were deleted in §7.0.

### 1.3 Import alias

`@/` maps to `./src/`. So `@/lib/projects` → `src/lib/projects.ts`.

---

## 2. NEXT.JS 16 GOTCHAS (read, or you will ship warnings)

This is Next.js **16**, not 13/14/15. Things changed.

1. **`<Image priority>` is deprecated.** Use `preload` instead.
   ```tsx
   <Image src="..." alt="..." preload />   {/* ✅ Next 16 */}
   <Image src="..." alt="..." priority />  {/* ❌ deprecated warning */}
   ```
   For this site you need **neither** — all three project images are below the fold, so
   the default lazy loading is correct. Do not add `preload` to any of them.

2. **Tailwind v4 has no `tailwind.config.js`.** All theme config lives in
   `src/app/globals.css` inside an `@theme inline { … }` block. Do not create a JS config file.

3. **`motion` package, `motion/react` import path.**
   ```tsx
   "use client";
   import { motion, AnimatePresence, useReducedMotion } from "motion/react"; // ✅
   import { motion } from "framer-motion";                                    // ❌ not installed
   ```

4. **`motion.*` components are client components.** Any file that renders one needs
   `"use client"` on line 1. Keep `"use client"` at the leaves — `page.tsx` and `layout.tsx`
   stay server components.

5. If anything else looks unfamiliar, the full docs for this exact version are on disk at
   `node_modules/next/dist/docs/`. Read them instead of guessing.

---

## 3. DESIGN SYSTEM — THE SOURCE OF TRUTH

> **2026-08-26 — "Deep space with ambient light" redesign.** Every token in this section
> was revised to integrate a Linear-style ambient-lighting system: near-black canvas,
> translucent glass surfaces, floating blurred light pools, mouse-tracking card glows,
> gradient typography. §3.6 is new and documents that system specifically. The accent
> **stayed** the brand-linked blue (`#3B82F6`), not Linear's stock indigo (`#5E6AD2`) —
> that was a deliberate call, not an oversight, see the box in §3.1.

### 3.1 Colour tokens

> **Revised 2026-08-27 for the video theme (§3.7).** Text is now white at descending
> opacities rather than grey hex values, and glass is heavier — a 5% white panel that
> read fine over a static dark canvas is invisible over moving footage.

Dark is the only theme. Surfaces and borders are translucent white, not flat hex, so the
background video shows through every card.

**Contrast is guaranteed by the scrim, not by the video.** The figures below are computed
against the scrim's *lightest* point (87% `#050506`) composited over a worst-case
pure-white video frame, i.e. `~#252525`. That is the floor: any darker frame only
improves them. Lowering the scrim opacity in `ui/background-video.tsx` invalidates this
entire column — re-derive it before you touch that gradient.

| Token | Value | Tailwind class | Used for | Contrast (worst case) |
| --- | --- | --- | --- | --- |
| `--background` | `#050506` | `bg-background` | Painted behind the video: covers the pre-decode moment, and is the permanent fallback if it never loads | — |
| `--background-deep` | `#020203` | `bg-background-deep` | Footer ground (fully opaque) and the page-transition curtain | — |
| `--surface` | `rgba(255,255,255,0.06)` | `bg-surface` | Card backgrounds — translucent so the video shows through | — |
| `--surface-hover` | `rgba(255,255,255,0.1)` | `bg-surface-hover` | Card + button hover | — |
| `--line` | `rgba(255,255,255,0.1)` | `border-line` | Hairline borders, dividers | — |
| `--line-strong` | `rgba(255,255,255,0.18)` | `border-line-strong` | Border on hover | — |
| `--foreground` | `#FFFFFF` | `text-foreground` | Headings, primary text | ~15.3:1 ✅ |
| `--muted` | `rgba(255,255,255,0.85)` | `text-muted` | Body copy, descriptions | ~11.4:1 ✅ |
| `--subtle` | `rgba(255,255,255,0.62)` | `text-subtle` | Meta labels, footer, tags | ~6.8:1 — **≥14px only** |
| `--accent` | `#3B82F6` | `text-accent` | Accent **text** (eyebrows, category labels) | ~4.2:1 ⚠️ — see below |
| `--accent-solid` | `#2563EB` | `bg-accent-solid` | Solid button **fill** (with white text) | 5.0:1 ✅ |
| `--accent-hover` | `#1D4ED8` | `bg-accent-hover` | Solid button hover fill | ✅ |
| `--accent-fg` | `#FFFFFF` | `text-accent-fg` | Text on top of accent fill | ✅ |
| `--accent-glow` | `rgba(59,130,246,0.3)` | *(not a Tailwind utility — see below)* | Spotlight glow, shadow glows | — |

> ### ⚠️ `--accent` as text is the tightest value on the page
> At the worst case above it measures **~4.2:1**, just under the 4.5:1 AA floor for
> small text. Two things keep that from biting in practice: it requires a *fully white*
> video frame, and the two places accent text appears are both mitigated —
> the `<Eyebrow>` pill sits on a **darkened** chip (`bg-background/60`, not the lightening
> `bg-surface` it used before 2026-08-29), which lifts it to ~5.1:1.
>
> Project **category labels** sit on a glass card, which lightens their local ground
> instead, and are the one spot that can still fall short on a bright frame. If it ever
> shows: lighten the accent *text* token toward `#60A5FA` (~6:1 at the same worst case)
> while keeping `#2563EB` for button fills. That was not done pre-emptively because it
> weakens the brand-navy tie documented below.

> **Why `--foreground` is now pure `#FFFFFF`.** The earlier passes used `#EDEDEF` and §3.5
> still lists pure white as an anti-pattern — that rule was written for text on a *static*
> near-black ground, where pure white is needlessly harsh. Over video the constraint
> inverts: the background is the brightest and least predictable surface on the page, and
> the extra headroom is what keeps type crisp against it. The video theme spec calls for
> `#fff` explicitly. Treat §3.5's "no pure white" as scoped to non-video surfaces.

`--accent-glow` is deliberately **not** wired into `@theme inline`. Exposing it as
`bg-accent-glow` / `border-accent-glow` etc. would generate confusingly-named utilities
(`border-accent-glow` reads like a border color, not a glow). It's used the way it's
meant to be used: as a raw `var(--accent-glow)` inside the shadow tokens in §3.3 and
inside `<Spotlight>`'s inline `radial-gradient()`.

> **Why two blues?** `#3B82F6` is bright enough to read as *text* on the page background
> (5.1:1). `#2563EB` is dark enough for *white text on top of it* (5.0:1). Using one blue
> for both fails WCAG AA in one direction or the other. Use the right one for the job.

> **Why the accent stayed blue, not Linear's indigo.** The reference "Deep space with
> ambient light" system specifies `#5E6AD2` (Linear's actual brand indigo) as its accent.
> This site's blue is deliberately close to the logo's brand navy (`#052957` — see §6.2's
> hue-distance rationale, unchanged). Swapping to indigo would have been full fidelity to
> the reference system, but would break that accent-to-logo relationship for no real
> gain — the ambient-lighting language works identically with either hue since it's a
> *lightness/depth* system, not a *hue* system. That reasoning still holds under the video
> theme, where the accent is now the only chromatic element on the page at all.

**Accent budget — unchanged in spirit, widened in scope.** Exactly one accent-coloured
element per section: the section's `<Eyebrow>` pill (`ui/eyebrow.tsx`). Also still
accent: primary buttons, project category labels, link hover, focus rings. Secondary in-section
labels — Pricing's "Core Services" / "Bundles" / "Add-Ons" / "How We Work" — stay
`text-subtle`, no pill. If it starts feeling colourful, you have used too much.

### 3.2 Typography

Fonts are still Geist + Geist Mono via `next/font/google` — **the reference system's own
stack is `"Inter", "Geist Sans", system-ui`, and we kept Geist over introducing Inter.**
Geist is Vercel's product font, already closer to this aesthetic's register than a
generic Inter swap would be, and typeface wasn't part of what this redesign changed.

| Role | Family | Class |
| --- | --- | --- |
| Headings + body | Geist | `font-sans` (default) |
| Eyebrows, labels, tags, index numbers | Geist Mono | `font-mono` |

**Type scale** — sizes are unchanged from the original build; what's new is that
headlines and one big-statement paragraph now render as gradient text (see below).

| Element | Classes |
| --- | --- |
| H1 (hero) | `text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold leading-[1.03] tracking-[-0.035em] text-balance` + gradient fill, see below |
| H2 (section titles) | `text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.03em]` |
| H3 (project titles) | `text-xl md:text-2xl font-semibold tracking-[-0.02em]` |
| Big statement (About) | `text-xl md:text-2xl lg:text-[1.75rem] leading-[1.45] tracking-[-0.015em]` + gradient fill |
| Body / descriptions | `text-[15px] md:text-base leading-relaxed text-muted` |
| Eyebrow / label (mono) | `font-mono text-[11px] md:text-xs font-medium uppercase tracking-[0.18em]` |
| Tags (mono) | `font-mono text-[11px] tracking-[0.04em] text-subtle` |
| Button label | `text-sm font-medium` |

**Gradient text.** Two patterns, both composed directly with Tailwind utilities against
the `foreground`/`accent` tokens — no separate CSS class needed:

```
/* Headline treatment — Hero H1, Contact H2, About's big statement */
bg-linear-to-b from-foreground via-foreground/95 to-foreground/70
  bg-clip-text text-transparent
/* (Contact/About use a shorter two-stop version: from-foreground to-foreground/75) */

/* Accent emphasis — one phrase inside the Hero H1 only ("AI Automations") */
bg-linear-to-r from-accent via-blue-300 to-accent
  bg-size-[200%_auto] bg-position-[0%_center]
  bg-clip-text text-transparent
  animate-[text-shimmer_4s_linear_infinite]   /* keyframes in globals.css */
```

`bg-linear-to-*`, not `bg-gradient-to-*` — Tailwind v4's canonical name for the same
utility; `bg-gradient-to-*` still works but is the deprecated alias. Use `bg-linear-to-*`
in any new code so the codebase doesn't end up with both spellings.

> **R9 note on the shimmer.** `text-shimmer` animates `background-position`, not
> `opacity`/`transform` — technically outside R9's letter. It's a narrow, deliberate
> exception: the element is a few words of text, so the repaint cost is negligible, and
> it's the one place the reference system's "animated gradient shimmer" bold-factor
> lives. Don't reach for `background-position` animation anywhere else on the page.

Rules: body line-height ≥ 1.5 · body copy capped at `max-w-[46ch]` · headings never below
`leading-[1.0]` · **never** go below 14px for body text.

### 3.3 Spacing, radius, borders, shadows

```
Spacing scale (only these):   4  8  12  16  24  32  48  64  96  128  (px)
                              1  2  3   4   6   8   12  16  24  32   (Tailwind units)

Container:      mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-10
Section rhythm: py-24 md:py-32 lg:py-40
Grid gap:       gap-5 md:gap-6

Radius:  buttons               -> rounded-lg    (8px)   — was rounded-full; badges/pills
                                                            kept the pill shape, see below
         badges & pills        -> rounded-full           (Eyebrow, project badges, bundle
                                                            tags, the header's Let's Talk
                                                            chip on mobile-menu links)
         cards, glass panels   -> rounded-2xl   (16px)   — was rounded-3xl (24px) / rounded-[32px]
         card images (nested)  -> rounded-xl    (12px)   — one step down from the card's own 16px

Borders: 1px, border-line (translucent white 6%). Hover -> border-line-strong (10%).
```

**Radius note.** The original build used larger, softer radii (24–32px) for a
"marketing site" feel. This redesign's reference system specifies 16px cards uniformly —
tighter, more "software," closer to how Linear's actual app looks. Buttons dropped the
pill shape for the same reason (`rounded-lg`); pills stayed pills where they're actually
badges (a status chip, a tag), matching the reference system's own radius table, which
gives buttons and badges two different shapes.

**Shadow system — centralized as Tailwind's own `shadow-*` scale**, not one-off arbitrary
`shadow-[...]` strings on each component. Defined once in `globals.css`'s `@theme inline`
block as `--shadow-card` / `--shadow-card-hover` / `--shadow-cta` / `--shadow-cta-hover` /
`--shadow-inset`, which makes them ordinary Tailwind utilities (`shadow-card`,
`hover:shadow-card-hover`, …) usable with any variant:

```
--shadow-card:       0 0 0 1px var(--line), 0 2px 20px rgba(0,0,0,.4), 0 0 40px rgba(0,0,0,.2)
--shadow-card-hover:  0 0 0 1px var(--line-strong), 0 8px 40px rgba(0,0,0,.5), 0 0 80px var(--accent-glow)
--shadow-cta:         0 0 0 1px rgba(59,130,246,.5), 0 4px 12px var(--accent-glow), inset 0 1px 0 0 rgba(255,255,255,.2)
--shadow-cta-hover:   0 0 0 1px rgba(59,130,246,.65), 0 6px 20px rgba(59,130,246,.4), inset 0 1px 0 0 rgba(255,255,255,.25)
--shadow-inset:       inset 0 1px 0 0 rgba(255,255,255,.1)
```

Every glass card (project cards, pricing service/bundle cards, the pipeline status
panel, the contact panel, the add-ons list) uses `shadow-card hover:shadow-card-hover`.
Primary buttons use `shadow-cta hover:shadow-cta-hover`. Secondary buttons use
`shadow-inset` (a one-line top-edge highlight, not a full multi-layer shadow). **Never
write a new one-off `shadow-[...]` arbitrary value for a card or button** — add a token
here instead, the same way the five above were added.

### 3.4 Motion tokens

| Token | Value | Where |
| --- | --- | --- |
| Standard easing | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) | All scroll reveals, header, mobile menu |
| Reveal duration | `0.6s` | Section / card entrances |
| Micro-interaction | `0.2s`–`0.3s` | Buttons, links, borders, mobile menu open/close |
| Image zoom | `0.7s` | Card image `scale` on hover |
| Stagger | `0.08s` per child | Hero lines, project grid |
| Hover spring | `{ type: "spring", stiffness: 300, damping: 26 }` | Card lift |
| Button shine sweep | `0.5s`, expo-out | Primary button `before:` pseudo-element, hover only — see §3.3/§7.7 |
| Blob float | `9s`/`10s`/`11s`, ease-in-out, infinite, staggered via negative `animation-delay` | Ambient background blobs — see §3.6 |
| Text shimmer | `4s`, linear, infinite | The one accent gradient phrase in the Hero H1 |
| Hero parallax | scroll-linked (not time-based) — opacity `1→0`, scale `1→0.95`, y `0→100px` over the hero's own scroll range | Hero section only — see §7.10 |

### 3.5 Do / Don't

| ✅ Do | ❌ Don't |
| --- | --- |
| Whitespace as the main design element | Decorative blobs *without restraint* — ours are 3 max, one hue family, low opacity (§3.6) |
| Hairline borders for structure, softened by the shadow tokens in §3.3 | Heavy, single-layer drop shadows |
| Two font weights max per block (500/600) | Six different weights |
| One primary CTA per section | Three equally loud buttons |
| Cards lift `-6px` on hover, glass gradient + spotlight glow | Cards that rotate, skew, or tilt |
| Text stays perfectly readable while animating | Blur-in text, letter-by-letter typing |
| One monochrome blob hue family (shades of the brand blue) | Multiple unrelated hues in the ambient system (the reference system's own purple/indigo mix) |

### 3.6 Spotlight system (added 2026-08-26)

> The other half of this section — `<AmbientBackground />`, the four-layer gradient/noise/
> blob/grid canvas — **no longer exists.** It was replaced wholesale by the background
> video on 2026-08-27 and the component was deleted. See §3.7. The spotlight system below
> survived the theme change unchanged and is still used on every glass card.

**`useSpotlight()` + `<Spotlight />`** (`lib/use-spotlight.ts` + `ui/spotlight.tsx`) —
the mouse-tracking radial glow on every glass card. The hook writes pointer position to
`--spot-x` / `--spot-y` custom properties directly on the DOM node via
`ref.current.style.setProperty(...)` — no React state, no re-render per mouse move.
`<Spotlight />` renders as a card's first child and reads those properties in a
`radial-gradient(280px circle at var(--spot-x) var(--spot-y), var(--accent-glow),
transparent 70%)`, revealed via `group-hover/spot:opacity-100`.

Usage pattern, every time:

```tsx
const { ref, onPointerMove } = useSpotlight<HTMLElement>();

<article ref={ref} onPointerMove={onPointerMove} className="group/spot relative isolate ...">
  <Spotlight />
  {/* rest of the card */}
</article>
```

`relative isolate` is required, not optional — `<Spotlight>` sits at `-z-10` so it paints
behind the card's own (static, non-positioned) text content. Without `isolate` creating a
stacking context on the parent, that negative z-index can escape and stack against
unrelated page furniture instead of staying scoped to the card. See the doc comment in
`ui/spotlight.tsx` for the full reasoning.

Every glass card sitewide is a spotlight card: project cards, pricing service/bundle
cards, the pipeline status panel, the contact panel. The pricing add-ons list is the one
glass surface that deliberately **isn't** — it's a reference list, not a decision
surface, so it gets the shadow/gradient treatment without the glow.

### 3.7 Background video & legibility scrim (added 2026-08-27)

The current theme. One fixed, looping, muted video sits behind the entire site; every
page is transparent and floats over it.

**`<BackgroundVideo />`** (`ui/background-video.tsx`) — rendered once in `layout.tsx`,
**outside `{children}`**, which matters: being outside `template.tsx` means client-side
navigation never remounts it, so the footage plays continuously across route changes
instead of restarting on every page. `position: fixed`, `-z-10`, so it paints above
`<body>`'s background-color but below all page content and no section needs a `z-index`
of its own.

Attributes are `autoPlay muted loop playsInline preload="metadata"`, plus `tabIndex={-1}`
and `aria-hidden` on the wrapper — it is decoration and must never take focus or be
announced.

**The scrim is load-bearing, not decoration.** A gradient overlay sits between the video
and the content:

```
linear-gradient(180deg,
  rgba(5,5,6,0.95) 0%,     /* under the fixed header */
  rgba(5,5,6,0.87) 38%,    /* lightest point — the figure §3.1 is derived from */
  rgba(5,5,6,0.89) 70%,
  rgba(5,5,6,0.96) 100%)   /* under the footer */
```

> **Deepened 2026-08-29 (§7.21).** The original range was `0.88 / 0.75 / 0.78 / 0.90`,
> which left the page reading as washed-out grey rather than near-black — content sat too
> close to its own background in value. Every figure in §3.1 was re-derived for the new
> range. Do not revert to the old numbers without re-deriving them again.

Every contrast number in §3.1 is computed at that 0.75 point over a hypothetical
pure-white video frame. **Reducing any of those opacities silently breaks WCAG AA across
the whole site**, on footage we don't control and could be re-cut at any time. If the
video is ever swapped, the scrim stays or gets darker, never lighter.

Glass cards additionally carry `backdrop-blur-xl`. That is also not cosmetic: without it,
body copy sits directly over moving footage and becomes genuinely hard to read even at
passing contrast ratios, because the *motion* behind the text is the problem, not the
luminance.

**Reduced motion.** The video is a client component purely so it can honour
`prefers-reduced-motion` — it pauses on a reduced-motion preference, leaving a still
frame. `autoPlay` is set statically in JSX rather than conditionally: `useReducedMotion()`
returns `null` during SSR and first render, so a conditional attribute would produce a
hydration mismatch. The cost is a few frames of playback before the effect pauses it,
which is the better trade.

**Failure modes are all handled.** If the video is blocked, fails, or autoplay is refused
(iOS Low Power Mode), the first frame or the flat `--background` shows through and the
site is still fully legible — no layout shift and no dependency on the video for contrast,
since the scrim is a separate opaque-ish layer.

---

## 4. PAGE MAP + WIREFRAMES

> ### ⚠️ This section describes the OLD single-page layout
> **Superseded 2026-08-27 (§7.19).** The site is multi-page now. Each block in the
> wireframe below became its own route, in this order, with its content otherwise
> unchanged:
>
> | Route | Section component | `h1` on that page |
> | --- | --- | --- |
> | `/` | `sections/hero.tsx` | `We Build Websites, Automations & AI Agents` |
> | `/projects` | `sections/projects.tsx` | `Featured Projects` |
> | `/pipeline` | `sections/pipeline.tsx` | `Our lead engine, in the open.` |
> | `/pricing` | `sections/pricing.tsx` | `Every service, priced up front.` |
> | `/about` | `sections/about.tsx` | `About` (the eyebrow pill carries the level) |
> | `/contact` | `sections/contact.tsx` | `Have a project in mind? Let's build something together.` |
>
> The header, footer and background video live in `layout.tsx` and persist across all six.
> The wireframe below is kept because it is still the clearest single picture of what each
> section *contains* — read it as six page layouts stacked, not one scrolling page. The
> ASCII boxes also can't show the video, glass cards or mouse-tracking glow; for that,
> see §3.6–§3.7.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [sticky header]  AUTOMATION SQUAD  Projects Pricing About Contact (Let's talk)│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   AI AUTOMATION · FULL-STACK DEVELOPMENT          <- accent, mono     │
│                                                                      │
│   We Build AI Automations &                       <- H1, 2 lines      │
│   Modern Web Applications                                            │
│                                                                      │
│   Helping businesses automate workflows, build    <- muted, max 46ch  │
│   AI tools, and create fast, scalable web apps.                      │
│                                                                      │
│   ( View Projects → )  ( Contact Me )             <- primary, secondary│
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤ id="projects"
│   Featured Projects                        SELECTED WORK — 03        │
│                                                                      │
│   ┌──────────────────────────────────────────────────┐               │
│   │ [CHAR MEEM / 01]                                 │  <- full width │
│   │  ▓▓▓▓▓▓▓▓ wide screenshot (16:7) ▓▓▓▓▓▓▓▓        │               │
│   ├──────────────────────────────────────────────────┤               │
│   │ WEBSITE · Char Meem Clothing · desc · tags · →   │               │
│   └──────────────────────────────────────────────────┘               │
│   ┌───────────────────────┐  ┌───────────────────────┐               │
│   │ [ANCHOR / 02]         │  │ [LUMBER WIZ / 03]     │               │
│   │  ▓▓ screenshot ▓▓     │  │  ▓▓ screenshot ▓▓     │               │
│   ├───────────────────────┤  ├───────────────────────┤               │
│   │ WEB DEVELOPMENT       │  │ AI + WEB APPLICATION  │               │
│   │ Anchor Builders       │  │ Lumber Wiz            │               │
│   │ description…          │  │ description…          │               │
│   │ Next.js · TS · …      │  │ React · AI · …        │               │
│   │ View Project →        │  │ View Project →        │               │
│   └───────────────────────┘  └───────────────────────┘               │
├──────────────────────────────────────────────────────────────────────┤ id="pipeline"
│   LIVE DASHBOARD          │  ┌────────────────────────────────────┐  │
│                           │  │ leads-website-alpha.vercel.app ● LIVE│ │
│   Our lead engine,        │  ├────────────────────────────────────┤  │
│   in the open.            │  │ 01  Researching · enriched, verified│ │
│                           │  │ 02  Ready       · drafted, queued   │ │
│   We run our own outreach │  │ 03  Approved    · cleared to send   │ │
│   on a pipeline we built… │  │ 04  Sent        · follow-ups queued │ │
│                           │  │ 05  Replied     · handed to a person│ │
│   ( View the dashboard ↗ )│  └────────────────────────────────────┘  │
│        (5 cols)           │            (7 cols)                      │
├──────────────────────────────────────────────────────────────────────┤ id="pricing"
│   PRICING                           ( ⬇ Download rate card )         │
│   Every service, priced up front.                                    │
│   We build the systems small businesses actually need…               │
│   Updated August 2026                                                │
│                                                                      │
│   CORE SERVICES — Pick what you need                                 │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐                         │
│   │ Website   │ │ Assistant │ │ Voice     │  (3-up grid, 6 cards)   │
│   │ $250/$20  │ │ $275/$50  │ │ $475/$85+ │                         │
│   └───────────┘ └───────────┘ └───────────┘   …3 more                │
│                                                                      │
│   BUNDLES — Combine services and save                                │
│   ┌────────────────────────┐ ┌────────────────────────┐             │
│   │ Foundation   $250/$20  │ │ Growth   $450/$60       │  (2-up)    │
│   ├────────────────────────┤ ├────────────────────────┤             │
│   │ Sales Automation       │ │ Full System             │             │
│   │ $1,050/$120  Save $225 │ │ $1,950/$280+ Save $450  │             │
│   └────────────────────────┘ └────────────────────────┘             │
│                                                                      │
│   ADD-ONS               │  HOW WE WORK                               │
│   Extra language +$75   │  Getting started                           │
│   CRM connection +$100  │  Every project starts with a short call…   │
│   Anything else — call  │                                            │
├──────────────────────────────────────────────────────────────────────┤ id="about"
│   ABOUT   │  We are a software house focused on building websites,   │
│  (3 cols) │  AI automations, AI agents, and modern web applications… │
│           │  (9 cols, large statement type)                          │
├──────────────────────────────────────────────────────────────────────┤ id="contact"
│   ╭────────────────────────────────────────────────────────────────╮ │
│   │  Have a project in mind? Let's                                 │ │
│   │  build something together.                                     │ │
│   │                                                                │ │
│   │  ( ✉ Email )  ( ⧉ Copy email )                                 │ │
│   │  send@team-automationsolutions.me                              │ │
│   ╰────────────────────────────────────────────────────────────────╯ │
├──────────────────────────────────────────────────────────────────────┤
│   © 2026 Automation Squad         send@team-…      Built with Next.js│
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. EXACT COPY (DO NOT PARAPHRASE)

Type these strings **character for character**. No "improvements", no extra adjectives.

### Header
- Wordmark: `AUTOMATION SQUAD`
- Nav links: `Projects` → `#projects` · `About` → `#about` · `Contact` → `#contact`
- Button: `Let's talk` → `#contact`

### Hero

> Copy below reflects the live `hero.tsx` / `site.ts` as of 2026-08-26 (eyebrow and H1
> had already drifted from this table before that date — the "AI automation, chatbots"
> framing was replaced with "software house, AI agents" at some point outside a tracked
> BUILD_SPEC update; the 2026-08-26 pass additionally dropped "chatbots" for "AI agents"
> sitewide and removed em dashes from user-facing copy — see §7.17).

- Eyebrow: `Software House · AI Automations · Web Development`
- H1: `We Build Websites, Automations & AI Agents` — the accent gradient shimmer (§3.2)
  wraps only `AI Agents`, the last phrase, not the whole line.
- Paragraph: `We are a software house helping businesses automate workflows, launch websites, and build AI tools that are fast, scalable, and conversion-focused.`
- Primary button: `View Projects` (+ `ArrowRight` icon) → `#projects`
- Secondary button: `Contact Me` → `#contact`

### Projects section
- H2: `Featured Projects`
- Right-side meta: `Selected Work · 03`

Cards render in the order below. The lead card is full-width; the other two sit side by side
beneath it. `index` and `badge` are **positional labels** — if the order ever changes, renumber
them so they still read 01 → 02 → 03 down the page.

**Project 1 — lead, full-width card**
| Field | Value |
| --- | --- |
| index | `01` |
| badge | `CHAR MEEM / 01` |
| category | `WEBSITE` |
| title | `Char Meem Clothing` |
| description | `A modern business website built for a clothing manufacturing company with a clean UI, responsive design, and optimized performance.` |
| tags | `Next.js`, `Tailwind CSS`, `Supabase` |
| href | `https://www.khudclothes.com/` |
| image | `/projects/charmeem.png` |

**Project 2**
| Field | Value |
| --- | --- |
| index | `02` |
| badge | `ANCHOR / 02` |
| category | `WEB DEVELOPMENT` |
| title | `Anchor Builders` |
| description | `A modern business website built for an anchor manufacturing company with a clean UI, responsive design, and optimized performance.` |
| tags | `Next.js`, `TypeScript`, `Supabase` |
| href | `https://anchor-builders.vercel.app/` |
| image | `/projects/anchor.png` |

**Project 3**
| Field | Value |
| --- | --- |
| index | `03` |
| badge | `LUMBER WIZ / 03` |
| category | `AI + WEB APPLICATION` |
| title | `Lumber Wiz` |
| description | `An AI-powered platform that simplifies lumber calculations and workflows, helping users make faster and more accurate decisions.` |
| tags | `React`, `AI Workflows`, `TypeScript` |
| href | `https://lumberwiz-2-0.vercel.app/` |
| image | `/projects/lumberwiz.png` |

> Note: the client's original text read *"for an clothes manufacturing company"*. The single
> grammar fix to `"for a clothing manufacturing company"` is intentional and approved. Everything
> else is verbatim.

- Card link label: `View Project` (+ `ArrowUpRight` icon)
- All project links: `target="_blank" rel="noopener noreferrer"`

### Lead pipeline (added 2026-08-05)

- Eyebrow: `LIVE DASHBOARD`
- H2: `Our lead engine, in the open.`
- Paragraph: `We run our own outreach on a pipeline we built. Every lead moves through the statuses below, and the dashboard reads straight from it, with no screenshots and no edited numbers.`
- Primary button: `View the dashboard` (+ `ArrowUpRight`) → `https://leads-website-alpha.vercel.app/`, new tab
- Card header: the bare host `leads-website-alpha.vercel.app`, and a `LIVE` pill with an accent dot
- Card footer: `Counts update on the dashboard. Lead identities and contact details are never published.`

Statuses — the vocabulary is copied from the live dashboard so a visitor who clicks
through sees the same words. If the dashboard renames a status, rename it here too.

| # | Status | Detail |
| --- | --- | --- |
| `01` | `Researching` | `Company enriched, contact found, address verified.` |
| `02` | `Ready` | `Email drafted by the agent, queued for a human read.` |
| `03` | `Approved` | `Signed off and cleared to send.` |
| `04` | `Sent` | `Initial email out, follow-ups scheduled behind it.` |
| `05` | `Replied` | `Pulled out of the sequence and handed to a person.` |

> **Why there are no counts here.** The dashboard's numbers (leads tracked, emails sent,
> reply rate) move hourly, and this page is statically prerendered — any figure baked in
> would be wrong within a day and would contradict the live page it links to. The section
> shows the *shape* of the pipeline and sends people to the dashboard for the numbers.
> The leads app exposes no public JSON endpoint (`/api/*` all 307-redirect to auth), so
> there is nothing to fetch. If one is ever added, wire it up with
> `fetch(url, { next: { revalidate: 3600 } })` and a fallback to the static list —
> do not scrape the dashboard's HTML.
>
> No lead names, companies or addresses appear on this site. The dashboard makes the same
> promise; breaking it here would break it there.

### Pricing (added 2026-08-22)

Source of truth: `public/Automation_Squad_Rate_Card.pdf` ("Updated August 2026"). Every
**number** below is transcribed from that PDF verbatim and must never drift from it. As of
2026-08-26, the **wording** is a deliberate, narrow exception: the PDF still says
"chatbot" in three places and this table (and `src/lib/pricing.ts`) now says "AI agent"
instead, per a sitewide rewording — see §7.17. The PDF has not been regenerated to match;
regenerate it from this table (or tell the site to go back to "chatbot") to close the gap.

- Eyebrow: `PRICING`
- H2: `Every service, priced up front.`
- Intro paragraph (adapted from the PDF — "chatbots" → "AI agents", see the note above): `We build the systems small businesses actually need to stop losing customers to slow replies: websites, AI agents, voice receptionists, and the automation connecting them. Every service has two costs, a one-time setup fee for the build, and a small monthly fee for hosting, API usage, and upkeep. Combine services into a bundle and the monthly fee drops.`
- Meta line: `Updated August 2026`
- Download button: `Download rate card` (+ `Download` icon) → downloads `public/Automation_Squad_Rate_Card.pdf` as `Automation-Squad-Rate-Card.pdf` (uses the HTML `download` attribute, **not** `target="_blank"` — it saves a file, it does not navigate)

**Core services** — eyebrow `CORE SERVICES`, H3 `Pick what you need`. Six cards, in this order:

| Service | Description | Setup | Monthly |
| --- | --- | --- | --- |
| `Business Website` | `A responsive website built to convert visitors into contacts: a booking or quote form, WhatsApp button, Google Maps, and basic SEO included.` | `$250` | `$20` |
| `AI Customer Assistant` | `An AI agent trained on your services, pricing, and FAQs. It answers questions, collects a name and number, and sends qualified leads straight to you.` | `$275` | `$50` |
| `AI Voice Receptionist` | `Answers your business line day and night, understands what the caller wants, and books the appointment directly into your calendar.` | `$475` | `$85` `+usage` |
| `Lead Generation System` | `Finds businesses matching your ideal customer, pulls their contact details, and loads them into a dashboard ranked by fit.` | `$650` | `$80` |
| `Automated Lead Follow-Up` | `Every new lead gets an instant reply, then a scheduled follow-up sequence over the next two weeks until they respond.` | `$375` | `$45` |
| `Review & Reputation System` | `Happy customers are sent to leave a public review. Unhappy ones are routed to a private form first, so you can fix it before it becomes one.` | `$375` | `$40` |

**Bundles** — eyebrow `BUNDLES`, H3 `Combine services and save`, subhead `Each bundle below costs less than buying the same services separately.` Four cards, each showing its included services as pill tags:

| Bundle | Description | Includes | Setup | Monthly | Savings note |
| --- | --- | --- | --- | --- | --- |
| `Foundation` | `For businesses that just need a professional site and a way for people to reach them.` | Business Website | `$250` | `$20` | *(none — single service)* |
| `Growth` | `Turns the website into something that works while you're not looking: answering questions and capturing leads on its own.` | Business Website, AI Customer Assistant | `$450` | `$60` | `Save $75 on setup and $10 a month versus buying separately.` |
| `Sales Automation` | `Brings in new customers and makes sure none of them go cold waiting for a reply.` | Business Website, Lead Generation System, Automated Lead Follow-Up | `$1,050` | `$120` | `Save $225 on setup and $25 a month versus buying separately.` |
| `Full System` | `Every service running together: website, AI agent, voice receptionist, lead generation, follow-up, and reputation management.` | all six core services | `$1,950` | `$280` `+usage` | `Save $450 on setup and $40 a month versus buying separately.` |

**Add-ons** — eyebrow `ADD-ONS`, H3 `Extend any service`. A three-row list:

| Add-on | Price |
| --- | --- |
| `Extra language for the AI agent or voice assistant` | `+$75 setup, +$10/mo` |
| `Connecting to a CRM or spreadsheet you already use` | `+$100 setup` |
| `Anything outside the services above` | `Quoted after a short call` |

**How we work** — eyebrow `HOW WE WORK`, H3 `Getting started`, paragraph (verbatim from the PDF): `Every project starts with a short call about what you actually need. Scope and the setup fee are confirmed before any work begins, so there are no surprises on the invoice. Single-service builds are typically live within one to two weeks; bundles take two to four depending on scope.`

> **Why no orange.** The PDF uses the brand orange as an accent (section labels, bundle
> top-bars, savings text). This site does not — §6.2 already rejected orange as a site
> accent (fails contrast, pushes off the Linear/Vercel register), and that ruling holds
> here. Savings lines render in plain `text-foreground`, not a new colour.

### About
- Label: `ABOUT`
- Paragraph: `We are a software house focused on building websites, AI automations, AI agents, and modern web applications. We create software that saves businesses time through automation while delivering polished user experiences.`

### Contact
- H2: `Have a project in mind? Let's build something together.`
- Primary button: `Email` (+ `Mail` icon) → opens **Gmail compose in a new tab**
- Secondary button: `Copy email` (+ `Copy` icon, becomes `Copied` + `Check` for 2s)
- Fallback link below the buttons: `send@team-automationsolutions.me` → `mailto:` link

### Footer
- Left: `© 2026 Automation Squad`
- Middle: `send@team-automationsolutions.me` (mailto link)
- Right: `Built with Next.js`

### Email behaviour (important — the client asked for both)
```
Address:  send@team-automationsolutions.me

Primary "Email" button  -> Gmail web compose, new tab:
  https://mail.google.com/mail/?view=cm&fs=1&to=send%40team-automationsolutions.me
    &su=Project%20enquiry%20for%20Automation%20Squad
    &body=Hi%20Automation%20Squad%2C%0A%0AI%27d%20like%20to%20talk%20about%3A%0A

Fallback text link      -> mailto:send@team-automationsolutions.me?subject=Project%20enquiry
Secondary button        -> navigator.clipboard.writeText(email)
```
Build the Gmail URL with `encodeURIComponent` in `src/lib/site.ts` — do not hand-encode it in JSX.

---

## 6. ASSETS, BRAND & SEO

### 6.1 Project screenshots

Three screenshots go in `public/projects/`. Full instructions are in
[`public/projects/README.md`](public/projects/README.md).

| File | Site |
| --- | --- |
| `public/projects/anchor.png` | https://anchor-builders.vercel.app/ |
| `public/projects/lumberwiz.png` | https://lumberwiz-2-0.vercel.app/ |
| `public/projects/charmeem.png` | https://www.khudclothes.com/ |

- ≥1920px wide, ~16:9, PNG or WebP, <600 KB each.
- Rendered with `object-cover object-top` so the hero of each site stays visible.

⚠️ **Status: placeholders.** All three filenames exist and resolve, but they are generated
gradient placeholders, not screenshots. Overwrite them in place — the filenames are already
correct, so nothing in the code needs to change.

### 6.2 Brand — derived from the master logo  ✅ DONE

Master artwork: `d:\Automation Squad\Automation Squad.png` (1254×1254, navy gear + orange
arrows + wordmark + domain, on a white studio background). Keep it out of the repo — it is the
source, not a build artifact.

Every asset below was generated from it by keying the white background to real alpha
(with unpremultiply, so anti-aliased edges stay clean instead of leaving white fringes) and
cropping the gear mark away from the wordmark.

| File | Size | Purpose |
| --- | --- | --- |
| `public/logo-mark.png` | 512² transparent | Header chip, OG card |
| `public/logo-lockup.png` | 900×771 transparent | `Organization.logo` in JSON-LD |
| `public/icon-192.png` / `icon-512.png` | 192² / 512² on white | PWA manifest icons |
| `src/app/icon.png` | 512² on white | Primary favicon (Next file convention) |
| `src/app/apple-icon.png` | 180² on white | iOS home-screen icon |
| `src/app/favicon.ico` | 16/32/48/64 multi-res | Legacy + crawler favicon |

**Measured brand colours** (sampled from the artwork, not eyeballed):

| Role | Hex | Share of coloured pixels |
| --- | --- | --- |
| Brand navy | `#052957` (also `#083469`, `#04234C`) | ~110k px — dominant |
| Brand orange | `#FD6705` (also `#FD5C02`, `#FE7708`) | ~84k px |

> **Why the site accent stays blue.** `#052957` sits at hue **214°**; the site accent `#3B82F6`
> sits at **217°**. They are the same hue three degrees apart — the UI blue *is* the brand navy,
> lifted in lightness so it clears contrast on `#0A0A0A`. Orange was considered and rejected:
> white on `#FD6705` is **2.95:1** (fails WCAG AA), and at that saturation it pushes the site
> from the Linear/Vercel register toward an industrial-services look. Orange stays where it
> belongs — inside the logo.

> **Why the header mark sits in a white chip.** Brand navy on `#0A0A0A` measures **1.72:1** —
> effectively invisible. Rather than recolour the logo (off-brand) or ship a mark that
> disappears (broken-looking), the mark sits in a 32/36px white rounded chip. Same reason the
> favicons have white plates: navy vanishes in dark browser chrome.

### 6.3 Metadata & SEO files  ✅ DONE

All of these are Next.js App Router **file conventions** — they need no registration anywhere.

| File | Emits |
| --- | --- |
| `src/app/layout.tsx` | title template, description, keywords, authors, canonical, robots directives, OG, Twitter card, `theme-color`, `format-detection` |
| `src/app/opengraph-image.tsx` | `/opengraph-image` — 1200×630 PNG generated with `next/og` at build time |
| `src/app/twitter-image.tsx` | `/twitter-image` — re-exports the OG image |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | `<link rel="icon">` / `apple-touch-icon` |
| `src/app/manifest.ts` | `/manifest.webmanifest` |
| `src/app/robots.ts` | `/robots.txt`, including the sitemap pointer |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/components/structured-data.tsx` | JSON-LD `@graph`: Organization, WebSite, ProfessionalService, CollectionPage (the 3 projects) |

**Single source of truth: `site.url` in `src/lib/site.ts`.** Canonical URL, OG URL, sitemap,
robots host and every JSON-LD `@id` derive from it. Change the domain there and nowhere else.

⚠️ **Do not add an `icons` key to the `metadata` export.** It overrides the file convention and
your favicons silently stop working. Same for `openGraph.images` — `opengraph-image.tsx` wins.

The OG card design: dark `#0A0A0A` ground, faint blue radial glow, white logo chip + wordmark
top-left, blue eyebrow, 76px headline, and a hairline footer with the domain and email. It is
prerendered at build time — no runtime cost, no edge function.

### 6.4 Rate-card PDF (added 2026-08-22)

`public/Automation_Squad_Rate_Card.pdf` — the owner's own three-page pricing PDF, served as a
static file and offered as a download from the Pricing section (§7.15). It is also the source
of truth for every figure in `src/lib/pricing.ts` (see §5's Pricing copy block).

- Served at `/Automation_Squad_Rate_Card.pdf`, `Content-Type: application/pdf`, no build step.
- Linked with the HTML `download` attribute (filename `Automation-Squad-Rate-Card.pdf`), not
  `target="_blank"` — this is a same-origin file save, not an outbound link, so it does not get
  the `rel="noopener noreferrer"` / "opens in a new tab" treatment used for external links.
- If the rate card is ever revised: replace this file (same filename, no code change needed)
  **and** update `src/lib/pricing.ts` and the Pricing copy table in §5 to match. They must
  never disagree — the page claims the numbers come from this PDF.

---

## 7. BUILD STEPS — FILE BY FILE

**All 15 files below are built and on disk.** The code blocks are kept as the
specification of record — if you edit a file, update its block here to match.

Do these in order. After each step the site should still run.

### 7.0 — Clean out the template junk  ✅ DONE

```powershell
Remove-Item "public\file.svg","public\globe.svg","public\next.svg","public\vercel.svg","public\window.svg"
```

### 7.1 — `src/app/globals.css` (replace the whole file)  ✅ DONE

```css
@import "tailwindcss";

/* ─────────────────────────── Raw palette (dark only) ─────────────────────── */
:root {
  color-scheme: dark;

  --background: #0a0a0a;
  --surface: #131314;
  --surface-hover: #1a1a1c;
  --line: #232326;
  --line-strong: #2e2e33;

  --foreground: #fafafa;
  --muted: #a1a1aa;
  --subtle: #71717a;

  --accent: #3b82f6;
  --accent-solid: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-fg: #ffffff;
}

/* ── Expose them to Tailwind as bg-, text- and border- utilities ─────────── */
/* NOTE: never write `bg-*` + `/` + `text-*` inside a CSS comment — the `*/`
   sequence closes the comment early and Lightning CSS emits a build warning. */
@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);

  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-subtle: var(--subtle);

  --color-accent: var(--accent);
  --color-accent-solid: var(--accent-solid);
  --color-accent-hover: var(--accent-hover);
  --color-accent-fg: var(--accent-fg);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ───────────────────────────────── Base ──────────────────────────────────── */
html {
  scroll-behavior: smooth;
  /* keeps anchor targets clear of the sticky header */
  scroll-padding-top: 6rem;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background-color: color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--foreground);
}

/* One consistent focus ring everywhere */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Subtle scrollbar — Chromium */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb {
  background: var(--line-strong);
  border-radius: 999px;
  border: 3px solid var(--background);
}
::-webkit-scrollbar-thumb:hover { background: #3f3f46; }

/* ──────────────────────── Reduced motion (R8) ────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 7.2 — `src/app/layout.tsx` (replace the whole file)  ✅ DONE

```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { keywords, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  // Icons and social images come from the file conventions in src/app/:
  // icon.png, apple-icon.png, opengraph-image.tsx, twitter-image.tsx.
  // Do not declare `icons` here — it would override those.
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 7.3 — `src/lib/site.ts` (new)  ✅ DONE

```ts
export const site = {
  name: "Automation Squad",
  /** Apex domain is canonical; www redirects to it (see BUILD_SPEC.md §12). */
  url: "https://team-automationsolutions.me",
  domain: "team-automationsolutions.me",
  email: "send@team-automationsolutions.me",
  eyebrow: "AI Automation · Full-Stack Development",
  title: "Automation Squad — AI Automations & Modern Web Applications",
  description:
    "Helping businesses automate workflows, build AI tools, and create fast, scalable web applications.",
  about:
    "Automation Squad builds AI automations, intelligent chatbots, and modern web applications that save businesses time while delivering polished user experiences.",
} as const;

/** Mutable copy — Next's Metadata type does not accept a readonly array. */
export const keywords: string[] = [
  "AI automation",
  "workflow automation",
  "AI chatbots",
  "AI agents",
  "full-stack development",
  "web application development",
  "Next.js development",
  "React development",
  "custom software",
  "business process automation",
  "Automation Squad",
];

const SUBJECT = "Project enquiry — Automation Squad";
const BODY = "Hi Automation Squad,\n\nI'd like to talk about:\n";

/** Opens the Gmail web composer, pre-filled. Use with target="_blank". */
export const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(site.email)}` +
  `&su=${encodeURIComponent(SUBJECT)}` +
  `&body=${encodeURIComponent(BODY)}`;

/** Native mail-client fallback. */
export const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(
  SUBJECT,
)}`;

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
```

### 7.4 — `src/lib/projects.ts` (new)  ✅ DONE

```ts
export type Project = {
  id: string;
  index: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  imageAlt: string;
  /** true = card spans the full grid width */
  wide?: boolean;
};

/**
 * Display order is grid order. The lead card is `wide`, so it spans both
 * columns on md+ and the two that follow sit side by side beneath it.
 * `index` / `badge` are positional labels — renumber them if you reorder.
 */
export const projects: Project[] = [
  {
    id: "charmeem",
    index: "01",
    badge: "CHAR MEEM / 01",
    category: "Website",
    title: "Char Meem Clothing",
    description:
      "A modern business website built for a clothing manufacturing company with a clean UI, responsive design, and optimized performance.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    href: "https://www.khudclothes.com/",
    image: "/projects/charmeem.png",
    imageAlt: "Char Meem storefront hero reading Wear Your Imprint",
    wide: true,
  },
  {
    id: "anchor",
    index: "02",
    badge: "ANCHOR / 02",
    category: "Web Development",
    title: "Anchor Builders",
    description:
      "A modern business website built for an anchor manufacturing company with a clean UI, responsive design, and optimized performance.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    href: "https://anchor-builders.vercel.app/",
    image: "/projects/anchor.png",
    imageAlt: "Anchor Builders homepage showing a full-bleed project photograph",
  },
  {
    id: "lumberwiz",
    index: "03",
    badge: "LUMBER WIZ / 03",
    category: "AI + Web Application",
    title: "Lumber Wiz",
    description:
      "An AI-powered platform that simplifies lumber calculations and workflows, helping users make faster and more accurate decisions.",
    tags: ["React", "AI Workflows", "TypeScript"],
    href: "https://lumberwiz-2-0.vercel.app/",
    image: "/projects/lumberwiz.png",
    imageAlt: "LumberWiz homepage with a terracotta hero section",
  },
];
```

### 7.5 — `src/lib/motion.ts` (new)  ✅ DONE

Plain data, no `"use client"` needed.

```ts
import type { Variants } from "motion/react";

/** ease-out-expo — the only easing curve this site uses. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = { reveal: 0.6, micro: 0.25, image: 0.7 } as const;

export const HOVER_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 26,
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE },
  },
};
```

### 7.6 — `src/components/ui/reveal.tsx` (new)  ✅ DONE

The single scroll-reveal primitive. **Every section entrance uses this.**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** px travel; ignored when the user prefers reduced motion */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.reveal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

### 7.7 — `src/components/ui/button.tsx` (new)  ✅ DONE

Deliberately **not** a motion component — CSS handles the micro-interaction, which keeps it
a server component and keeps the bundle small.

```tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 " +
  "text-sm font-medium whitespace-nowrap transition-all duration-200 " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent-solid text-accent-fg hover:bg-accent-hover",
  secondary:
    "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-surface-hover",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClass(variant, className)} {...props}>
      {children}
    </a>
  );
}
```

> Height is `h-11` = 44px, which satisfies the 44×44 minimum touch target. Do not shrink it.

### 7.8 — `src/components/ui/project-card.tsx` (new)  ✅ DONE

```tsx
"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";
import { HOVER_SPRING, staggerItem } from "@/lib/motion";

export function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={staggerItem}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={HOVER_SPRING}
      className={[
        "group relative overflow-hidden rounded-3xl border border-line bg-surface",
        "p-2 transition-colors duration-300 hover:border-line-strong",
        "hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]",
        project.wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      {/* ── Preview image ────────────────────────────────────────────── */}
      <div
        className={[
          "relative w-full overflow-hidden rounded-2xl bg-surface-hover",
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
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
          {project.badge}
        </span>
      </div>

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-4 pb-5 pt-6 md:px-5 md:pb-6">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
          {project.category}
        </span>

        <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
          {project.title}
        </h3>

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
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">— {project.title}, opens in a new tab</span>
        </a>
      </div>
    </motion.article>
  );
}
```

**Image status.** ⚠️ All three files currently in `public/projects/` are **generated
placeholders** — a dark gradient with a framed X, ~45 KB each — so the layout renders and
`next/image` returns 200 instead of a broken image. **Overwrite them with the real
screenshots at the same filenames**; no code change is required.

Do **not** add a client-side `onError` fallback. It costs a re-render and, with real files in
place, buys nothing.

### 7.9 — `src/components/site-header.tsx` (new)  ✅ DONE

Sticky, transparent at the top, frosted + hairline border once you scroll.

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, site } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-[72px] md:px-8 lg:px-10"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-70"
        >
          {/* Brand navy measures 1.7:1 on #0A0A0A, so the mark sits in a white
              chip rather than bare on the dark header. */}
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-white p-[3px] md:size-9">
            <Image
              src="/logo-mark.png"
              alt=""
              width={72}
              height={72}
              className="size-full object-contain"
              preload
            />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-foreground uppercase md:text-xs">
            {site.name}
          </span>
        </a>

        {/* Desktop links — hidden on mobile by design (see BUILD_SPEC.md §9) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={buttonClass(
            "secondary",
            "h-9 px-4 text-[13px] md:h-10 md:px-5 md:text-sm",
          )}
        >
          Let&apos;s talk
        </a>
      </nav>
    </motion.header>
  );
}
```

### 7.10 — Sections  ✅ DONE (all four)

Create these four files in `src/components/sections/`.

#### `hero.tsx`

```tsx
"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { buttonClass } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1200px] px-6 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44 lg:px-10 lg:pb-40 lg:pt-52"
    >
      {/* single, very subtle depth cue — delete if it reads as decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.p
          variants={staggerItem}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent md:text-xs"
        >
          AI Automation · Full-Stack Development
        </motion.p>

        <motion.h1
          variants={staggerItem}
          className="mt-6 max-w-[18ch] text-balance text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          We Build AI Automations &amp; Modern Web Applications
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted md:mt-8 md:text-lg"
        >
          Helping businesses automate workflows, build AI tools, and create
          fast, scalable web applications.
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
```

#### `projects.tsx`

```tsx
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
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">
            Featured Projects
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            Selected Work — 03
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
```

#### `about.tsx`

```tsx
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 border-t border-line px-6 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            About
          </span>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-9">
          <p className="max-w-[52ch] text-xl leading-[1.45] tracking-[-0.015em] text-foreground md:text-2xl lg:text-[1.75rem]">
            We are a company focused on building AI automations, intelligent
            chatbots, and modern web applications. We create software that saves
            businesses time through automation while delivering polished user
            experiences.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

#### `contact.tsx`

```tsx
import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { gmailComposeUrl, mailtoUrl, site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 pb-24 md:px-8 md:pb-32 lg:px-10 lg:pb-40"
    >
      <Reveal>
        <div className="rounded-[32px] border border-line bg-surface px-8 py-14 md:px-14 md:py-20 lg:px-20 lg:py-24">
          <h2 className="max-w-[18ch] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl lg:text-[3.5rem]">
            Have a project in mind? Let&apos;s build something together.
          </h2>

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
```

### 7.11 — `src/components/ui/copy-email-button.tsx` (new)  ✅ DONE

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (insecure context / permissions) — the mailto link below still works
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={buttonClass("secondary")}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy email"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
```

### 7.12 — `src/components/site-footer.tsx` (new)  ✅ DONE

```tsx
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 py-8 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-10">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a
          href={`mailto:${site.email}`}
          className="font-mono transition-colors duration-200 hover:text-foreground"
        >
          {site.email}
        </a>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
```

### 7.13 — `src/app/page.tsx` (replace the whole file)  ✅ DONE

Stays a **server component** — it only composes.

```tsx
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Pipeline } from "@/components/sections/pipeline";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Pipeline />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
```

### 7.14 — `src/components/sections/pipeline.tsx` (added 2026-08-05)  ✅ DONE

A **server** component — the only motion is the shared `Reveal` primitive and one CSS
`animate-pulse` dot, so nothing here needs `"use client"`. Copy is in §5.

The URL lives in `src/lib/site.ts` alongside every other outbound link:

```ts
/**
 * Our own cold-outreach dashboard. Public, read-only, and the numbers on it are
 * live — which is why the section on this site shows the status vocabulary and
 * links out rather than repeating counts that would go stale within a day.
 */
export const leadsDashboard = {
  url: "https://leads-website-alpha.vercel.app/",
  host: "leads-website-alpha.vercel.app",
} as const;
```

```tsx
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
  { index: "01", name: "Researching", detail: "Company enriched, contact found, address verified." },
  { index: "02", name: "Ready",       detail: "Email drafted by the agent, queued for a human read." },
  { index: "03", name: "Approved",    detail: "Signed off and cleared to send." },
  { index: "04", name: "Sent",        detail: "Initial email out, follow-ups scheduled behind it." },
  { index: "05", name: "Replied",     detail: "Pulled out of the sequence and handed to a person." },
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
```

Notes for whoever edits this next:

- **Not in the header nav.** §9's mobile-nav reasoning still holds — four anchors do not
  justify a hamburger, and the section sits directly under Projects where people scroll
  into it. If you do add it, add it to `navLinks` in `src/lib/site.ts`, not to the header.
- **Rhythm is one step tighter** than the other sections (`py-24 md:py-32`, no `lg:py-40`).
  It is a link-out, not a headline act.
- **Accent budget (§3.1):** this section spends it on the eyebrow, the primary button and
  the `LIVE` dot. Nothing else in here may be blue.
- The pulse dot animates `opacity` only (R9) and the global reduced-motion block in §7.1
  freezes it (R8).

### 7.15 — Pricing (added 2026-08-22)  ✅ DONE

Two new files, both **server** components / plain data — no client JS beyond the shared
`Reveal` primitive. Copy is in §5, the PDF asset is §6.4.

`src/lib/pricing.ts` — six core services, four bundles, three add-ons, the intro/how-we-work
paragraphs and the rate-card path, transcribed verbatim from
`public/Automation_Squad_Rate_Card.pdf`. Full listing:

```ts
export type CoreService = {
  id: string;
  name: string;
  description: string;
  setup: number;
  monthly: number;
  /** e.g. "+usage" appended after the monthly figure */
  monthlyNote?: string;
};

export const coreServices: CoreService[] = [
  { id: "website", name: "Business Website", setup: 250, monthly: 20, description: "…" },
  { id: "assistant", name: "AI Customer Assistant", setup: 275, monthly: 50, description: "…" },
  { id: "voice", name: "AI Voice Receptionist", setup: 475, monthly: 85, monthlyNote: "+usage", description: "…" },
  { id: "leadgen", name: "Lead Generation System", setup: 650, monthly: 80, description: "…" },
  { id: "followup", name: "Automated Lead Follow-Up", setup: 375, monthly: 45, description: "…" },
  { id: "reputation", name: "Review & Reputation System", setup: 375, monthly: 40, description: "…" },
];

export type Bundle = {
  id: string;
  name: string;
  description: string;
  /** must match a CoreService.name above */
  includes: string[];
  setup: number;
  monthly: number;
  monthlyNote?: string;
  /** omitted for Foundation — it's a single service, so there is nothing to save */
  savings?: string;
};

export const bundles: Bundle[] = [
  { id: "foundation", name: "Foundation", includes: ["Business Website"], setup: 250, monthly: 20, description: "…" },
  { id: "growth", name: "Growth", includes: ["Business Website", "AI Customer Assistant"], setup: 450, monthly: 60, savings: "Save $75 on setup and $10 a month versus buying separately.", description: "…" },
  { id: "sales-automation", name: "Sales Automation", includes: ["Business Website", "Lead Generation System", "Automated Lead Follow-Up"], setup: 1050, monthly: 120, savings: "Save $225 on setup and $25 a month versus buying separately.", description: "…" },
  { id: "full-system", name: "Full System", includes: ["Business Website", "AI Customer Assistant", "AI Voice Receptionist", "Lead Generation System", "Automated Lead Follow-Up", "Review & Reputation System"], setup: 1950, monthly: 280, monthlyNote: "+usage", savings: "Save $450 on setup and $40 a month versus buying separately.", description: "…" },
];

export type AddOn = { id: string; name: string; price: string };

export const addOns: AddOn[] = [
  { id: "language", name: "Extra language for the chatbot or voice assistant", price: "+$75 setup, +$10/mo" },
  { id: "crm", name: "Connecting to a CRM or spreadsheet you already use", price: "+$100 setup" },
  { id: "custom", name: "Anything outside the services above", price: "Quoted after a short call" },
];

export const pricingUpdated = "August 2026";
export const pricingIntro = "…"; // verbatim, see §5
export const pricingHowWeWork = "…"; // verbatim, see §5

export const ratecard = {
  href: "/Automation_Squad_Rate_Card.pdf",
  downloadName: "Automation-Squad-Rate-Card.pdf",
} as const;

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
```

(Full description strings are omitted above for length — copy them verbatim from §5 or from
`src/lib/pricing.ts` on disk.)

`src/components/sections/pricing.tsx` — renders, in order: header (eyebrow, H2, intro, the
`Download rate card` button, the `Updated August 2026` meta line) → Core Services grid (3-up on
`lg`, 2-up on `sm`, 1-up below) → Bundles grid (2-up on `lg`) → a 5/7 split of Add-ons (a
bordered list, same visual language as the Pipeline status list) and How We Work. A shared
`PriceStats` sub-component renders the Setup / Monthly two-column stat block used on both
service and bundle cards, so the two numbers are laid out identically everywhere they appear.

Notes for whoever edits this next:

- **In the header nav**, unlike Pipeline. `navLinks` in `src/lib/site.ts` is now
  `Projects · Pricing · About · Contact` — pricing is a primary reason someone clicks through,
  so it earns the nav slot that Pipeline deliberately didn't get.
- **Accent budget (§3.1):** spent on the eyebrow only. Bundle savings lines are
  `text-foreground`, not accent — see the "why no orange" note in §5's Pricing block for why
  they aren't colour-coded at all.
- **The PDF download is not an external link.** It uses the `download` attribute (same-origin
  file save), so it does not get `target="_blank"` / `rel="noopener noreferrer"` / the sr-only
  "opens in a new tab" hint that every `href` to another domain gets elsewhere on this page —
  those would be wrong here since nothing navigates.
- **Numbers come from `toLocaleString("en-US")`**, not hand-formatted strings, so `$1,050` /
  `$1,950` get their comma automatically and there's one function (`formatUSD`) to fix if the
  currency ever changes.

### 7.16 — "Deep space with ambient light" redesign (added 2026-08-26)  ✅ DONE

The whole page restyled to the ambient-lighting system documented in §3.1–§3.6. Nothing
about the page's copy, structure, section order, or data changed — every string in §5 and
every figure in §5's Pricing block is untouched. This step is styling and three new
interaction patterns (spotlight cards, hero parallax, the mobile menu) layered onto the
existing component tree.

**New files** (see §1.2 for the full tree):

- `ui/ambient-background.tsx` — the 4-layer background system, §3.6. Rendered once, in
  `layout.tsx`, as the first child of `<body>`, before `{children}`.
- `lib/use-spotlight.ts` + `ui/spotlight.tsx` — the mouse-tracking card glow, §3.6.
- `ui/eyebrow.tsx` — the shared accent-pill section label, used by Pipeline, Pricing and
  About. Hero renders the same markup inline instead (its eyebrow is a `motion.span`
  participating in the hero's stagger `variants`, which a wrapped component can't easily
  forward) — if you ever touch the pill's visual design, change both places.

**Files restyled, no structural change:** `globals.css` (full token rewrite, §3.1–§3.3;
new `blob-float` / `text-shimmer` `@keyframes`), `layout.tsx` (renders
`<AmbientBackground>`, `themeColor` updated to `#050506`), `button.tsx` (glow shadow +
`before:`-pseudo-element shine sweep, `rounded-lg` instead of `rounded-full`),
`site-header.tsx`, `hero.tsx`, `project-card.tsx`, `pipeline.tsx`, `pricing.tsx`,
`about.tsx`, `contact.tsx`, `site-footer.tsx`.

**Client/server boundary shifted.** `pipeline.tsx`, `pricing.tsx` and `contact.tsx` are
now client components — each needed `useSpotlight()` for its card's mouse-tracking glow.
`about.tsx` is the one section that stayed server (its only "interactivity" is the shared
`<Reveal>`, which is already a client leaf). The `"use client"` list in §10 reflects this.

**Header: added the hamburger mobile menu.** This directly **supersedes** the original
build's "Mobile navigation decision (deliberate)" in §9, which explicitly said not to add
one. Two things changed since that call was made: the reference design system this
redesign integrates specifies the pattern explicitly (animated dropdown, Menu/X toggle,
full-width CTA at the bottom), and the nav grew from 3 items to 4 (Pricing was added in
§7.15) — past the point where "just scroll to reach it" holds up as well. See §9 for the
current spec; the old reasoning is gone, not just outdated, since it's now the opposite
of what's built.

**Hero: added scroll-linked parallax**, tracked only across the hero's own height
(`useScroll({ target: sectionRef, offset: ["start start", "end start"] })`), not the full
page — the fade/scale/drift finishes before Projects comes into view. Applied via a
`style` prop on a wrapper `motion.div` that's **separate** from the existing stagger-entrance
`motion.div` — combining scroll-driven and mount-driven `opacity`/`y` motion values on the
*same* element would fight each other. Disabled outright (not just at zero-amplitude)
under `useReducedMotion()`.

**Pricing: Core Services became an asymmetric bento grid** (the one place bento applies —
see the decision recorded in §3's redesign note and the `span` field on `CoreService` in
`lib/pricing.ts`). Deliberately **width-only** — `sm:col-span-2 lg:col-span-6` /
`lg:col-span-3` / `lg:col-span-2` — never row-span. The reference system's own bento
spec varies row height too (`auto-rows-[180px]`, a `col-span-4 row-span-2` hero card),
which works for short fixed-content feature cards but risks clipping here: every service
card holds a real, variable-length description plus a price stat block, and a fixed row
height can't safely fit all six. Grid auto-placement already sizes each row to its
tallest card with plain `grid-auto-rows: auto` (the default) — that's what makes the
width-only version safe.

Notes for whoever edits this next:

- **Every glass card is a spotlight card** (project cards, pricing service/bundle cards,
  the pipeline panel, the contact panel) **except** the pricing add-ons list, which
  deliberately isn't — it's a reference list, not a decision surface. If you add a new
  card-shaped surface anywhere, default to giving it the spotlight; leaving it off should
  be the deliberate choice, not an oversight.
- **`shadow-[...]` arbitrary values are gone from every card and button.** They all pull
  from the `shadow-card` / `shadow-card-hover` / `shadow-cta` / `shadow-cta-hover` /
  `shadow-inset` tokens in §3.3. Adding a new elevated surface should reuse one of those,
  not invent a new arbitrary shadow string.
- **`bg-linear-to-*`, not `bg-gradient-to-*`**, in every new gradient this redesign added
  — Tailwind v4's canonical name (§3.2). The two are equivalent; don't mix spellings in
  new code.

### 7.17 — Copy pass: drop em dashes, "chatbot" → "AI agent" (added 2026-08-26)  ✅ DONE

A content-only pass, no layout or component-structure changes. Two rules, applied to every
string a visitor actually reads or hears (headings, paragraphs, buttons, meta title/
description, JSON-LD, `sr-only` accessibility text, the Gmail subject line) —
**not** to code comments, which aren't user-facing and were left alone:

1. **No em dashes (`—`) in user-facing copy.** Each one was rewritten with ordinary
   punctuation or restructured phrasing, not swapped for an en dash or a literal `--`.
   Where the site already had a separator convention (the eyebrow's `·` middot, e.g.
   `Software House · AI Automations · Web Development`), new separators reused it instead
   of inventing another one — see the Hero title, `Selected Work · 03`, and the page
   `<title>` template (`%s · Automation Squad`) in §5.
2. **"Chatbot" → "AI agent" everywhere**, including the Pricing section's PDF-sourced
   copy (§7.15's "transcribe verbatim" rule now has a narrow, explicit exception for this
   one term — see the note at the top of the Pricing block in §5 and the doc comment at
   the top of `lib/pricing.ts`). The PDF itself was not regenerated; it still says
   "chatbot" in three places. **Follow-up owed:** either regenerate
   `Automation_Squad_Rate_Card.pdf` with the new wording, or explicitly decide the PDF
   stays as-is and the site is allowed to diverge from it on wording (never on numbers).

**Where the headline needed more than a find-replace.** The Hero H1 was
`We Build Websites, AI Automations & Chatbots` — a literal swap would have produced
`AI Automations & AI Agents`, repeating "AI" back-to-back in a five-word headline. It was
restructured instead: `We Build Websites, Automations & AI Agents`, dropping the now-
redundant "AI" off "Automations" since "AI Agents" already carries the AI framing. The
accent gradient shimmer (§3.2) moved with it — it now wraps `AI Agents` (the term the
site is meant to foreground) instead of the old `AI Automations`. `site.title` got the
same tightening for the same reason.

**§5 sync note.** Several exact-copy entries in §5 (Hero's eyebrow/H1, the Projects meta
line) had already drifted from an earlier, untracked edit before this pass touched them —
the *previous* copy in §5 didn't match live `hero.tsx` even before today's changes. §5 now
reflects what's actually live. The large embedded code listings elsewhere in §7 (§7.3,
§7.8, §7.10, etc.) were **not** re-synced to match every subsequent redesign and copy
pass — treat this document's §5 as the current copy reference, and the older component
code blocks in §7 as historical/approximate rather than byte-exact. A full re-sync of
those listings is a separate, larger task nobody has asked for yet.

### 7.18 — Video-background theme (added 2026-08-27)  ✅ DONE

Colours and background only. **No copy, no pricing figures, no section structure changed**
in this step — the request was explicitly "only the theme". Full system in §3.7.

**New:** `ui/background-video.tsx`. **Deleted:** `ui/ambient-background.tsx` (the blob
canvas it replaces). **Rewritten:** `globals.css` (palette, font, scrollbar; the
`blob-float` keyframes went with the component, `text-shimmer` stayed).

- **Palette → white-on-video** (§3.1): text is white at descending opacities instead of
  grey hex; glass and borders are heavier (6%/10%/18% vs 5%/6%/10%) because the old
  values are invisible over footage.
- **Font → Helvetica Now Var**, loaded by remote `@import`. Two deviations from the spec's
  snippet, both deliberate:
  1. It's applied via the `--font-sans` **token**, not `* { font-family: … }`. A universal
     selector would also overwrite `font-mono`, killing the mono eyebrows, tags and badges
     that the existing design depends on — and the instruction was to keep those.
  2. Geist is kept as the first fallback (`"Helvetica Now Var", var(--font-geist-sans),
     "Helvetica Neue", …`) so a failed third-party fetch degrades to the self-hosted
     previous theme font rather than to Arial.
  The `@import` **must stay the first rule in `globals.css`** — `@import "tailwindcss"` is
  inlined and expanded at build time, so a remote `@import` placed after it is invalid CSS
  and Lightning CSS warns (this was caught and fixed during the build, R10).
- **`backdrop-blur-xl` added to every glass surface.** Required, not cosmetic — see §3.7.
- **Opaque panels made translucent** so the video reads through: the pipeline status list
  and its LIVE pill (`bg-background` → `/45` and `/60`), and the footer
  (`bg-background-deep` → `/70` + blur).
- **Hero** rebuilt as a full-viewport centred section per the spec
  (`min-h-[calc(100svh-4rem)]`, `md:` 4.5rem — the header height, since `<main>` carries a
  matching `pt`). Its headline now animates **per word** (first word at `0.15s`, `+0.08s`
  each, `0.7s`, expo-out), with the accent shimmer on `AI Agents`. `svh` not `vh`: `vh` on
  mobile is the pre-scroll viewport and causes a jump when the URL bar collapses.

> **On `FadeUp`.** The theme spec supplied a `FadeUp` component. It was **not** added —
> `ui/reveal.tsx` already did exactly that job with the same easing, duration and
> `viewport: { once, amount: 0.2 }`. `Reveal` was extended with `as` / `duration` / `once`
> to cover `FadeUp`'s API instead, so the codebase keeps one reveal primitive rather than
> two identical ones. `as` also lets a reveal render as the semantic element it wraps
> instead of always injecting a wrapper `div`.

### 7.19 — Multi-page conversion + route transitions (added 2026-08-27)  ✅ DONE

Six routes, each prerendered static. **Supersedes R1.** No section content changed; the
sections were moved, not rewritten.

```
src/app/
  layout.tsx        video + header + footer + site-wide JSON-LD  (persist across routes)
  template.tsx      the page transition — remounts per route
  page.tsx          /          → <Hero>
  projects/page.tsx /projects  → <Projects> + <ProjectsCollectionData>
  pipeline/page.tsx /pipeline  → <Pipeline>
  pricing/page.tsx  /pricing   → <Pricing>
  about/page.tsx    /about     → <About>
  contact/page.tsx  /contact   → <Contact>
```

**The transition** (`template.tsx`): `template.tsx` rather than `layout.tsx` is what makes
this work at all — Next gives a template a key per route segment, so it remounts on every
navigation and replays its entrance. A layout mounts once and would never animate again.
Two overlapping parts: a curtain collapsing upward off-screen (`scaleY 1 → 0`,
`origin-top`, 0.55s) and the incoming page fading up behind it (0.5s, 0.12s delay). The
curtain sits at `z-40`, **below** the header's `z-50`, so the nav stays fixed while only
the content area wipes — navigating feels like swapping a panel in an app, not reloading a
document. It's opaque rather than frosted because a full-viewport animated
`backdrop-filter` is a reliable way to jank low-end hardware. Under reduced motion the
curtain is dropped entirely and the page just fades (R8). Only `opacity`/`transform` (R9).

**Navigation must use `next/link`.** A plain `<a>` triggers a full document load, which
bypasses the transition entirely and re-downloads the video. Every internal link is a
`<Link>`: header, hero CTAs, footer, mobile menu.

**Active nav state** uses `useSelectedLayoutSegment()` (returns `null` on `/`, else the
segment) rather than string-matching `usePathname()`. `navLinks` in `lib/site.ts` gained a
`segment` field for it, and links carry `aria-current="page"` — so the active route is
exposed to assistive tech, not just coloured differently.

**Header breakpoint moved `md` → `lg`.** The nav grew to five items; five links plus the
wordmark plus the CTA do not fit a 768px bar. Inline links now appear at `lg`, the
hamburger covers everything below it. The `Let's talk` button still appears at `md`.

**Heading levels were re-derived per page.** On one page there was one `h1` and everything
else was `h2`/`h3`. Six pages need six `h1`s, so each page's lead heading was promoted and
everything under it shifted up a level (`pricing.tsx` went h2→h1, h3→h2, h4→h3;
`project-card.tsx` h3→h2). `/about` had no display heading at all — its `<Eyebrow>` label
now renders as the `h1` via a new `as` prop, rather than inventing copy for one.

**JSON-LD was split.** The projects `CollectionPage` used to render on `/` along with
everything else; site-wide it would now claim *every* page is the projects collection. It
moved to `ProjectsCollectionData` in `structured-data.tsx`, rendered only by
`/projects`, with `@id` `…/projects#collection`. Organization / WebSite /
ProfessionalService stay in the root layout and appear everywhere, correctly.

**Per-page metadata**: each route exports `title`, `description` and its own
`alternates.canonical`. The root layout's `%s · Automation Squad` template supplies the
suffix.

> **Sitemap:** resolved in §7.20, immediately below.

### 7.20 — Generated sitemap (added 2026-08-27)  ✅ DONE

`src/app/sitemap.ts` emits `/sitemap.xml` with all six routes. `robots.ts` already pointed
at it and needed **no change** — it allows everything, declares the sitemap and sets
`host`, which is still correct for a six-page site.

> **Correcting the record.** Three earlier passes of this document claimed "`sitemap.ts`
> does not exist and `/sitemap.xml` 404s". The first half was true; **the second half was
> wrong**. A hand-written `public/sitemap.xml` from the original 2026-07-31 build was
> serving 200 the whole time — `public/` is served ahead of app routes, so it also
> silently shadowed the new `sitemap.ts` on its first build. It listed **only the home
> page**, with a hardcoded `lastmod` of `2026-07-31`, so after the multi-page conversion
> it was actively telling crawlers that five of the six pages didn't exist. It has been
> deleted. **Do not put a static `sitemap.xml` back in `public/`** — it wins over the
> generated route and the two will drift apart without any build error to warn you.

Design notes:

- **Routes derive from `navLinks`** (`lib/site.ts`) rather than being hand-listed, so
  adding a page to the nav also adds it to the sitemap. A page deliberately kept *out* of
  the nav must be appended in `sitemap.ts` explicitly — that is the one failure mode here.
- **`loc` must match each page's `rel="canonical"` byte for byte.** `site.url` carries no
  trailing slash, so the home entry is `https://team-automationsolutions.me` with none
  either; a `/` mismatch would have the sitemap and the canonical tag nominating two
  different URLs for the same page. Verified against all six in §11.
- **Priorities** are set per route in a `PRIORITY` map: home `1`, pricing `0.9`,
  projects/contact `0.8`, about/pipeline `0.6`.
- `lastModified` is evaluated at build time (the route is static), so each deploy stamps
  its own date rather than freezing one in source — which is exactly how the old static
  file went stale.

Also fixed in this step: `manifest.ts` still carried `background_color` / `theme_color` of
`#0A0A0A` from the pre-video palette. Both now track `--background` (`#050506`).

### 7.21 — Scrim depth, sticky footer, Home nav (added 2026-08-29)  ✅ DONE

Four small changes off the back of looking at the built site.

1. **Scrim deepened** — `0.88/0.75/0.78/0.90` → `0.95/0.87/0.89/0.96`. The page was
   reading washed-out grey. All §3.1 contrast figures re-derived (they improved across the
   board; see the accent caveat box there, which is new and honest about the one tight
   value).
2. **Eyebrow chip darkened** — `bg-surface` → `bg-background/60`. The pill's background was
   *lightening* the ground under the accent text, which is the wrong direction for the
   page's tightest contrast pair. Applied in both `ui/eyebrow.tsx` and Hero's inline copy
   of the same markup (they are still two places — see the note in `eyebrow.tsx`).
3. **Sticky footer** — `layout.tsx` body is now `flex min-h-dvh flex-col` with
   `flex-1` on `<main>`. On short pages (`/about` is the obvious one) the footer is pushed
   to the bottom edge instead of floating mid-viewport with video showing below it. The
   footer itself also went **fully opaque** (`bg-background-deep`, dropping the `/70` +
   `backdrop-blur-xl`) so it reads as a solid edge to the page rather than another glass
   panel.
4. **`Home` added to the nav**, first item. Its `segment` is `null`, which is exactly what
   `useSelectedLayoutSegment()` returns on `/`, so the existing `segment === link.segment`
   check gives it a correct active state with no special-casing. Desktop nav gap tightened
   to `gap-6 xl:gap-8` to fit six items at `lg`.

   `sitemap.ts` now dedupes via a `Set` — `"/"` is still prepended unconditionally so the
   home page cannot drop out of the sitemap if it is ever removed from the nav, and the
   `Set` drops the duplicate now that it appears in both.

---

## 8. MOTION SPEC

Restraint is the point. If a visitor *notices* the animation, it is too much.

| Element | Animation | Trigger | Timing |
| --- | --- | --- | --- |
| Header | `opacity 0→1`, `y -12→0` | mount | 0.5s, ease-out-expo |
| Header background | transparent → `bg-background/75 backdrop-blur-xl` + border | `scrollY > 24` | 0.3s CSS |
| Hero children | stagger: eyebrow → h1 → paragraph → buttons | mount | 0.6s each, 0.08s apart |
| Section headings | `opacity 0→1`, `y 24→0` | `whileInView`, `once:true`, `amount:0.2` | 0.6s |
| Project cards | same reveal, staggered 0.08s | `whileInView` on the grid | 0.6s |
| Card hover | `y: -6` spring + border lightens + soft shadow | hover | spring 300/26 |
| Card image hover | `scale: 1.04` (CSS `group-hover`) | hover | 0.7s |
| "View Project" arrow | `translate-x-0.5 -translate-y-0.5` | card hover | 0.2s |
| Buttons | `active:scale-[0.98]`, bg colour shift | hover / press | 0.2s |
| Anchor scroll | native `scroll-behavior: smooth` + `scroll-padding-top: 6rem` | click | — |

**Reduced motion:** `Reveal` sets `y: 0` (fade only), `ProjectCard` drops `whileHover`, and the
global CSS block in §7.1 flattens every transition. Verify it — see §11.

**Never build:** page-load preloader, cursor follower, marquee, parallax hero, typewriter text,
counting numbers, tilt cards, scroll-jacking.

---

## 9. RESPONSIVE SPEC

Breakpoints (Tailwind defaults): `sm 640` · `md 768` · `lg 1024` · `xl 1280`.

| Region | < 768px | 768–1023px | ≥ 1024px |
| --- | --- | --- | --- |
| Container padding | `px-6` | `px-8` | `px-10` |
| Header height | 64px | 72px | 72px |
| Header nav links | hidden — hamburger menu | **hidden — hamburger menu** (changed 2026-08-27; six items since 2026-08-29) | visible inline at `lg` |
| Header right | hamburger toggle only | `Let's talk` button + hamburger toggle | `Let's talk` button |
| Hero H1 | 44px | 60px | 72px → 84px at xl |
| Hero buttons | wrap to 2 rows if needed | inline | inline |
| Project grid | 1 column | 2 columns | 2 columns |
| Card 1 (Char Meem, `wide`) | full width | spans both columns | spans both columns |
| Card image ratio | 16:10 (16:7 for card 3) | same | same |
| Lead pipeline | stacked, copy above the status card | 5 / 7 column split | 5 / 7 column split |
| Pricing — service/bundle grids | 1 column | 2 columns | 3 columns (services) / 2 (bundles) |
| Pricing — add-ons / how we work | stacked, add-ons above | 5 / 7 column split | 5 / 7 column split |
| About | stacked, label above text | 3 / 9 column split | 3 / 9 column split |
| Section rhythm | `py-24` | `py-32` | `py-40` |
| Contact panel padding | `px-8 py-14` | `px-14 py-20` | `px-20 py-24` |
| Footer | stacked rows | one row | one row |

**Mobile navigation (revised 2026-08-26 §7.16, breakpoint moved 2026-08-27 §7.19).** The
original build deliberately shipped *without* a hamburger menu (three anchors didn't
justify one). That decision is superseded: the reference design system specifies the
pattern explicitly, and the nav has since grown to six items. Below `lg` the header shows
the wordmark plus a `Menu`/`X` toggle (`site-header.tsx`); tapping it drops an animated
panel (`opacity`/`y`, 0.2s) over a blurred `bg-background/70 backdrop-blur-xl` header,
with all six nav links stacked vertically and a full-width `Let's talk` primary button at
the bottom. The panel closes on link click (handled in the link's `onClick` — **not** in a
`useEffect` on the route segment; the `react-hooks/set-state-in-effect` lint rule
correctly rejects that as a cascading render).

The inline links moved from `md` to `lg` because six links plus the wordmark plus the CTA
do not fit a 768px bar. `Let's talk` still appears from `md` up.

Also required: no horizontal scroll at 320px · nothing hidden behind the fixed header
(`<main>` carries `pt-16 md:pt-18`, matching the header's height, and every section keeps
`scroll-mt-24`) · all tap targets ≥ 44×44px.

---

## 10. ACCESSIBILITY + PERFORMANCE CHECKLIST

### Accessibility
- [x] Exactly one `<h1>` **per route**, no skipped levels below it (§7.19 re-derived every level when the site went multi-page). — *verified in the served HTML of all six routes: each returns exactly 1 `<h1>`*
- [x] `<nav aria-label="Primary">` on the header nav.
- [x] Every `<Image>` has a descriptive `alt` (already in `projects.ts`).
- [x] Decorative elements get `aria-hidden="true"` (`BackgroundVideo` and its scrim, `Spotlight`, the transition curtain, all icons). The background `<video>` additionally takes `tabIndex={-1}` so it is never focusable.
- [x] Active nav route is exposed as `aria-current="page"`, not signalled by colour alone.
- [x] Every external link: `target="_blank" rel="noopener noreferrer"` **and** an sr-only "opens in a new tab" hint. — *the Pricing PDF download is same-origin and uses `download` instead; it intentionally does not get this treatment, see §6.4.*
- [x] Focus ring visible on every interactive element (global `:focus-visible` rule in §7.1). Never `outline: none`. — *outline-based, not a box-shadow ring, deliberately: several surfaces (primary buttons, project card images) use `overflow-hidden`, which would clip a ring but not an outline.*
- [x] Tab order matches visual order. — *DOM order matches visual order; no `tabindex` overrides anywhere*
- [x] Copy-email result announced via `aria-live="polite"`.
- [x] `text-subtle` (#71717A, 4.0:1) is used **only** at ≥14px on non-essential meta text. Never for body copy.
- [x] Mobile menu toggle has `aria-expanded` + `aria-controls` + a state-dependent `aria-label` ("Open menu" / "Close menu"), and the panel is dismissed on link click.
- [x] `prefers-reduced-motion` honoured everywhere. — *`Reveal`, `ProjectCard`, the Hero's word stagger, the `template.tsx` page transition (curtain dropped entirely, not just shortened), and `BackgroundVideo` (pauses to a still frame). The global CSS block additionally freezes the `text-shimmer` keyframes for free.*

### Performance
- [x] Correct `sizes` on every `fill` image (already in §7.8) — wrong `sizes` = oversized downloads.
- [x] Image containers have a fixed `aspect-[…]` so nothing shifts while loading (CLS < 0.1).
- [x] Geist via `next/font/google` with `display: "swap"`. — ⚠️ *The theme face, Helvetica Now Var, is a **remote `@import` from a third party** (`db.onlinewebfonts.com`) and is the one exception to "no external font links". It is render-blocking CSS on a host we don't control. Mitigated with a `<link rel="preconnect">` in `layout.tsx` and a Geist fallback in the stack, but this is a real, accepted trade — see §7.18.*
- [x] `"use client"` only where interactivity actually lives: `site-header`, `hero`, `projects`, `project-card`, `pipeline`, `pricing`, `contact`, `reveal`, `copy-email-button`, `use-spotlight`, `background-video`, `template`. `layout`, all six `page.tsx` files, `about`, `site-footer`, `button`, `spotlight`, `eyebrow`, `structured-data` stay server components.
- [x] Only `opacity` / `transform` animated — *two narrow, documented exceptions: the Hero's accent-phrase `text-shimmer` animates `background-position` on two words of text (§3.2's R9 note), and the spotlight writes CSS custom properties per pointer-move rather than animating a CSS property at all (event-driven, no animation loop).*
- [x] Background video is `position: fixed` (no layout/paint cost on scroll), `preload="metadata"` (not `auto` — the full file is never eagerly downloaded), and lives in `layout.tsx` outside `template.tsx` so client-side navigation never remounts or re-fetches it.
- [x] Page transitions animate `opacity`/`transform` only, and the curtain is opaque rather than a full-viewport animated `backdrop-filter` (§7.19).
- [ ] ⚠️ **Background video weight not audited.** It is a third-party CDN asset of unknown size fetched on every cold load. Check its transfer size and consider a `poster` frame — *needs a browser / network panel.*
- [x] No external scripts, no analytics, no icon-font, no CSS-in-JS runtime.
- [x] Images served through `next/image` — *optimiser returns HTTP 200 for all three*
- [ ] ⚠️ Project screenshots optimised, < 600 KB each. — **blocked: the three files are placeholders.** Re-check after swapping in the real screenshots.
- [ ] Lighthouse (mobile, production build): Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO ≥ 95. — *needs a browser*

---

## 11. HOW TO VERIFY YOU ARE DONE

Run these, in this order, from `d:\Automation Squad\portfolio`.

```powershell
npm run lint     # must print zero problems
npm run build    # must complete with zero errors AND zero warnings
npm run dev      # then open http://localhost:3000
```

### Automated pass — ✅ ALREADY RUN

- [x] `npm run lint` — zero problems.
- [x] `npm run build` — zero errors, zero warnings. `/` prerenders as static.
- [x] Production server serves `/` with HTTP 200.
- [x] All six routes serve HTTP 200 and prerender `○ (Static)`: `/`, `/projects`, `/pipeline`, `/pricing`, `/about`, `/contact`.
- [x] Each route returns **exactly one `<h1>`** and its own `<title>` (`Projects · Automation Squad`, `Lead Pipeline · …`, etc.) and `rel="canonical"`.
- [x] Lead pipeline section prerenders statically: heading, all five statuses and the dashboard URL are in the served HTML of `/pipeline`.
- [x] Pricing section prerenders statically: heading, all six core services, all four bundles, all three add-ons and the `Download rate card` link are in the served HTML of `/pricing`.
- [x] `/Automation_Squad_Rate_Card.pdf` serves `200 application/pdf`.
- [x] All three project titles, categories, descriptions and tag sets render.
- [x] All three outbound URLs present (`anchor-builders.vercel.app`, `lumberwiz-2-0.vercel.app`, `khudclothes.com`).
- [x] Gmail compose URL and `mailto:` fallback both present.
- [x] All three `/_next/image` requests return HTTP 200.
- [x] No Tech Stack / testimonial / blog / logo-wall markup anywhere in the output. — *Pricing and Lead pipeline are the two approved exceptions to R5, see §0.*
- [x] Redesign (§7.16) markers present in the served HTML: `text-shimmer`, `shadow-card`, `rounded-2xl`, `bg-linear-to-b`, `group/spot`, `lg:col-span-6` (the bento hero card). The mobile menu (`id="mobile-menu"`) correctly does **not** appear in the initial HTML — it only mounts once `menuOpen` is toggled client-side.
- [x] Video theme (§7.18) verified in the served output: the `<video>` renders with `autoPlay muted loop playsInline preload="metadata"` and the CloudFront `src`; the built CSS chunk's **first rule** is the Helvetica Now Var `@import`, and `--font-sans` resolves to `"Helvetica Now Var", var(--font-geist-sans), …`.
- [x] All pricing figures and the PDF still verified byte-for-byte after both the restyle and the multi-page move: `$1,050`, `$1,950`, `$280`, all three `Save $… on setup` lines, and `/Automation_Squad_Rate_Card.pdf` still serves `200 application/pdf`.

**Metadata & brand (§6.2 / §6.3)**
- [x] All 13 routes/assets serve 200 with the right content-type: `/`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image`, `/twitter-image`, `/icon.png`, `/apple-icon.png`, `/favicon.ico`, `/logo-mark.png`, `/logo-lockup.png`, `/icon-192.png`, `/icon-512.png`.
- [x] `<link rel="canonical">` points at `https://team-automationsolutions.me`.
- [x] OG tags complete: `og:title`, `og:url`, `og:site_name`, `og:locale`, `og:type`, `og:image` (+ type/width/height/alt).
- [x] Twitter card is `summary_large_image` with its own image tags.
- [x] Favicon links resolve to the **branded** icons, not the create-next-app default.
- [x] `robots.txt` allows all and points at the sitemap. `sitemap.xml` lists **all six routes** with the build date, and each `<loc>` matches that page's `rel="canonical"` exactly (verified route by route, §7.20).
- [x] JSON-LD parses as valid JSON and contains Organization + WebSite + ProfessionalService + CollectionPage with all three projects.
- [x] OG card rendered and visually reviewed at 1200×630.
- [x] Header renders the logo chip through `next/image` with a 2× srcset.

### Manual pass — ⬜ OWNER TO RUN

These need a real browser. Nothing below has been verified.

**Renders**
- [ ] Page is near-black; text is crisp white/grey; blue appears only where §3.1 allows.
- [ ] All three screenshots load, cropped from the top, not stretched. *(Placeholders until you swap them — see the ⚠️ box at the top.)*
- [ ] Char Meem leads as a full-width card; Anchor and Lumber Wiz sit side by side beneath it on desktop.
- [ ] Card badges read `CHAR MEEM / 01`, `ANCHOR / 02`, `LUMBER WIZ / 03` top-to-bottom.

**Interaction**
- [ ] Header is transparent at the top and turns frosted + hairline-bordered after ~24px of scroll.
- [ ] Below `lg`: header shows the wordmark + hamburger (plus `Let's talk` from `md` up). Tapping it opens a dropdown with all six links stacked and a full-width `Let's talk` at the bottom; the icon swaps to `X`; tapping a link or the `X` closes it.
- [ ] **The background video plays, is muted, loops seamlessly, and covers the viewport without distortion at every width.** It keeps playing *uninterrupted* while navigating between pages — it must not restart or flash.
- [ ] Text is comfortably readable over the *brightest* part of the video loop on every page, especially the pricing tables. If any of it is marginal, the scrim in `ui/background-video.tsx` is too light (§3.7).
- [ ] Navigating between pages plays the curtain transition: the content area wipes upward while the new page fades in, and the **header stays put** throughout.
- [ ] `Home` / `Projects` / `Pipeline` / `Pricing` / `About` / `Contact` / `Let's talk` each navigate to the right route, and the active link is visibly highlighted once there (including `Home` on `/`).
- [ ] **On `/about`** — the shortest page — the footer sits flush at the bottom of the viewport, not floating mid-screen, and no video shows below it. Same check at a tall window (1440px+).
- [ ] `View Projects` → `/projects`. `Contact Me` → `/contact`. Logo → `/`.
- [ ] Browser back/forward moves between pages correctly and replays the transition.
- [ ] Moving the mouse over a project card, pricing card, the pipeline panel, or the contact panel shows a soft blue glow following the cursor.
- [ ] Hovering a project card: lifts ~6px, border lightens, image zooms slightly, arrow nudges.
- [ ] Hovering a primary button: background brightens, glow increases, a diagonal light sweep passes across it once.
- [ ] Hero headline animates in **word by word**, left to right, on load.
- [ ] The "AI Agents" phrase in the Hero H1 has a slow, continuously animating blue gradient shimmer.
- [ ] Headings render in Helvetica Now Var, not the Geist fallback (compare against a `font-family` readout in DevTools — a silent fallback is the likely failure mode if the third-party host is down).
- [ ] `View Project` opens the correct site in a **new tab** (check all three URLs).
- [ ] `View the dashboard` opens `https://leads-website-alpha.vercel.app/` in a **new tab**, and the statuses on that page still read Researching / Ready / Approved / Sent / Replied.
- [ ] `Download rate card` saves `Automation-Squad-Rate-Card.pdf` to disk (does **not** open a new tab), and the PDF opens and matches the on-page figures.
- [ ] `Email` opens Gmail compose with To, Subject and Body pre-filled.
- [ ] `Copy email` copies the address and shows `Copied` for 2 seconds.
- [ ] The `send@team-automationsolutions.me` text link opens the default mail client.

**Responsive** — resize to each width and look:
- [ ] **320px** — no horizontal scrollbar anywhere.
- [ ] **375px** — H1 wraps and never overflows; buttons reachable; cards stacked. The hero fills the screen without the content being clipped, and does **not** jump when the mobile URL bar collapses (that's what `svh` is for).
- [ ] **768px** — 2-column grid appears; `Let's talk` appears; nav is **still** the hamburger.
- [ ] **1024px** — inline nav links appear, hamburger disappears.
- [ ] **1024px / 1440px** — content stays centred at max 1200px; margins feel generous.

**Accessibility**
- [ ] Tab through the entire page: a visible blue focus ring on every stop, in visual order.
- [ ] DevTools → Rendering → **Emulate `prefers-reduced-motion: reduce`** → reload. Content still appears (fades only), nothing slides, nothing is stuck invisible. **The background video is paused on a still frame**, the Hero's text shimmer is frozen (not just slowed), the hero words appear without travelling, and navigating between pages cross-fades with **no curtain wipe**.
- [ ] With the video paused by reduced motion, or blocked entirely (DevTools → Network → block the CloudFront request), every page is still fully legible.
- [ ] DevTools → Lighthouse → Accessibility = 100.

**Content**
- [ ] Every string matches §5 exactly. Read them side by side.

**After the domain is live** — the full list is in §12.4.
- [ ] OG card previews correctly on https://www.opengraph.xyz
- [ ] Rich Results Test passes with no errors.
- [ ] `www.` and `http://` both redirect to the canonical apex URL.

---

## 12. DEPLOY

Canonical domain: **`https://team-automationsolutions.me`** (apex). `www` redirects to it.
The domain is set in exactly one place — `site.url` in `src/lib/site.ts`. Metadata, canonical,
OG, sitemap, robots and JSON-LD all read from it. **If the domain ever changes, change that
one line and nothing else.**

### 12.1 Push to GitHub

```powershell
cd "d:\Automation Squad\portfolio"
git init
git add .
git commit -m "Automation Squad portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`.gitignore` from `create-next-app` already excludes `node_modules`, `.next` and `.env*`.

### 12.2 Import into Vercel

1. https://vercel.com/new → **Import** the repo.
2. Framework preset auto-detects **Next.js**. Leave build command, output directory and
   install command on their defaults.
3. **No environment variables are needed.** Nothing in this project reads `process.env`.
4. Deploy. You get `<project>.vercel.app`.

### 12.3 Attach the domain

In Vercel → **Project → Settings → Domains**, add **both**:

| Domain | Vercel setting |
| --- | --- |
| `team-automationsolutions.me` | Primary |
| `www.team-automationsolutions.me` | **Redirect to** `team-automationsolutions.me` (308) |

> You do not have to "have www" at the registrar — `www` is just a subdomain you create with a
> DNS record. Adding both in Vercel and redirecting one to the other is what prevents Google
> from indexing two copies of the site.

Vercel then shows you the exact records. In **Namecheap → Domain List → Manage → Advanced DNS**,
delete the default "parking" records first, then add:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | Automatic |
| `CNAME` | `www` | `cname.vercel-dns.com.` | Automatic |

Also set **Nameservers → Namecheap BasicDNS** (not Custom DNS), or the records are ignored.

> ⚠️ Copy the values Vercel shows you rather than the ones above if they differ — Vercel changes
> its anycast IP occasionally, and its dashboard is authoritative.

Propagation is usually minutes, up to 48h. Vercel issues the TLS certificate automatically once
DNS resolves; you do not buy one from Namecheap.

### 12.4 After the domain is live

- [ ] Visit `https://team-automationsolutions.me` — padlock present, no mixed-content warning.
- [ ] `http://` and `www.` both 308-redirect to the canonical apex URL.
- [ ] Paste the URL into https://www.opengraph.xyz — the OG card renders (dark, logo chip, headline).
- [ ] https://search.google.com/test/rich-results — Organization + WebSite are detected with no errors.
- [ ] `https://team-automationsolutions.me/robots.txt` and `/sitemap.xml` both load.
- [ ] Submit the site at https://search.google.com/search-console, verify by DNS TXT record, then
      submit `https://team-automationsolutions.me/sitemap.xml`.
- [ ] Run Lighthouse against the **live** URL, not localhost.

### 12.5 Search Console verification (when you get to it)

Google gives you a TXT record. Add it in Namecheap Advanced DNS as `TXT` / host `@`.
Alternatively add the meta-tag method to `layout.tsx`:

```ts
export const metadata: Metadata = {
  // …
  verification: {
    google: "PASTE_THE_TOKEN_HERE",
  },
};
```

---

## 13. TROUBLESHOOTING

| Symptom | Cause | Fix |
| --- | --- | --- |
| `You're importing a component that needs useState…` | Missing `"use client"` | Add it as line 1 of that file |
| `Module not found: framer-motion` | Wrong package name | `import { motion } from "motion/react"` |
| Colours are Tailwind defaults, not yours | Token missing from `@theme inline` | Every custom colour needs a `--color-*` entry in §7.1 |
| `bg-surface` does nothing | Typo in the token name, or you edited `:root` but not `@theme inline` | Both blocks must define it |
| Image error: file not found | Screenshot missing from `public/projects/` | See §6 |
| Layout jumps while images load | Missing `aspect-[…]` on the image wrapper | Keep the aspect classes in §7.8 |
| Anchor lands with the heading under the header | Missing `scroll-mt-24` / `scroll-padding-top` | Both are specified — put them back |
| `priority` deprecation warning | Next 16 renamed it | Remove it; these images should lazy-load anyway |
| Reveal content stays invisible | `viewport.amount` too high on a tall element | Lower `amount` to `0.1` |
| Build warns about `<img>` | You used a raw `<img>` | Use `next/image` |

---

## 14. OUT OF SCOPE — DO NOT BUILD THESE

Tech Stack section · testimonials · blog · pricing · services list · timeline · resume ·
contact form (email buttons only) · CMS · database · auth · analytics · light mode · theme
toggle · multi-page routing · i18n · animated preloader · cursor effects · project detail pages.

If you think one of these would help, **say so and stop** — do not build it.

---

*Design tokens derived with the `ui-ux-pro-max` skill; motion patterns from the `framer-motion`
skill. Contrast ratios in §3.1 are computed against `#0A0A0A`.*
