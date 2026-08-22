# BUILD SPEC — Automation Squad Portfolio

**Read this whole file before you write a single line of code.**

You are building a **one-page, dark-mode, premium-minimal portfolio site** for
**Automation Squad**, an AI-automation & full-stack development studio.

Reference feel: Linear · Vercel · Framer · Stripe.
Monochrome (near-black + white + greys) with **one blue accent**. Lots of whitespace.
Rounded cards. Soft borders instead of heavy shadows. Smooth, restrained motion.

---

## ✅ BUILD STATUS — 2026-07-31

**The site described in this document has been built.** Every file in §7 exists and
`npm run lint` + `npm run build` are both clean. Steps are marked `✅ DONE` inline below.

| Area | Status |
| --- | --- |
| §7.0 – §7.13 — all 15 site files | ✅ Built |
| §7.14 Lead pipeline section (added 2026-08-05) | ✅ Built — lint + build re-run clean, `/` still static |
| §7.15 Pricing section + rate-card PDF download (added 2026-08-22) | ✅ Built — lint + build re-run clean, `/` still static, PDF serves `200 application/pdf` |
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
| R1 | **One page only.** Everything lives at `/`. Sections are anchors (`#projects`, `#about`, `#contact`). No routing, no sub-pages. |
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
│   └── Automation_Squad_Rate_Card.pdf  §6.4 the rate-card PDF, downloadable from §7.16
├── src/
│   ├── app/
│   │   ├── favicon.ico             §6.2 multi-res 16/32/48/64, branded
│   │   ├── icon.png                §6.2 512² primary favicon
│   │   ├── apple-icon.png          §6.2 180² iOS home-screen icon
│   │   ├── opengraph-image.tsx     §6.3 1200×630 OG card via next/og
│   │   ├── twitter-image.tsx       §6.3 re-exports the OG card
│   │   ├── manifest.ts             §6.3 /manifest.webmanifest
│   │   ├── robots.ts               §6.3 /robots.txt
│   │   ├── sitemap.ts              §6.3 /sitemap.xml
│   │   ├── globals.css             §7.1  tokens, base, focus ring, reduced motion
│   │   ├── layout.tsx              §7.2  fonts, full metadata, viewport
│   │   └── page.tsx                §7.13 composes the components below
│   ├── components/
│   │   ├── site-header.tsx         §7.9  client — sticky, frosts on scroll, logo chip
│   │   ├── site-footer.tsx         §7.12 server
│   │   ├── structured-data.tsx     §6.3  server — JSON-LD @graph
│   │   ├── sections/
│   │   │   ├── hero.tsx            §7.10 client — staggered entrance
│   │   │   ├── projects.tsx        §7.10 client — stagger container
│   │   │   ├── pipeline.tsx        §7.14 server — lead dashboard link-out
│   │   │   ├── pricing.tsx         §7.15 server — services, bundles, add-ons
│   │   │   ├── about.tsx           §7.10 server
│   │   │   └── contact.tsx         §7.10 server
│   │   └── ui/
│   │       ├── reveal.tsx          §7.6  client — the scroll-reveal primitive
│   │       ├── button.tsx          §7.7  server — buttonClass() + ButtonLink
│   │       ├── project-card.tsx    §7.8  client — hover lift + image zoom
│   │       └── copy-email-button.tsx §7.11 client — clipboard + Copied state
│   └── lib/
│       ├── site.ts                 §7.3  name, email, Gmail/mailto URLs, nav links
│       ├── projects.ts             §7.4  the three projects
│       ├── motion.ts               §7.5  EASE, DURATION, variants
│       └── pricing.ts              §7.15 services, bundles, add-ons — mirrors the PDF
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

### 3.1 Colour tokens

Dark is the only theme. Every value below is already contrast-checked against the
background it is used on.

| Token | Hex | Tailwind class | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--background` | `#0A0A0A` | `bg-background` | Page background | — |
| `--surface` | `#131314` | `bg-surface` | Cards, contact panel | — |
| `--surface-hover` | `#1A1A1C` | `bg-surface-hover` | Card + button hover | — |
| `--line` | `#232326` | `border-line` | Hairline borders, dividers | — |
| `--line-strong` | `#2E2E33` | `border-line-strong` | Border on hover | — |
| `--foreground` | `#FAFAFA` | `text-foreground` | Headings, primary text | 18.4:1 ✅ |
| `--muted` | `#A1A1AA` | `text-muted` | Body copy, descriptions | 7.6:1 ✅ |
| `--subtle` | `#71717A` | `text-subtle` | Meta labels, footer, tags | 4.0:1 — **≥14px only** |
| `--accent` | `#3B82F6` | `text-accent` | Accent **text** on dark (eyebrows, category labels) | 5.4:1 ✅ |
| `--accent-solid` | `#2563EB` | `bg-accent-solid` | Solid button **fill** (with white text) | 5.2:1 ✅ |
| `--accent-hover` | `#1D4ED8` | `bg-accent-hover` | Solid button hover fill | ✅ |
| `--accent-fg` | `#FFFFFF` | `text-accent-fg` | Text on top of accent fill | ✅ |

> **Why two blues?** `#3B82F6` is bright enough to read as *text* on `#0A0A0A` (5.4:1).
> `#2563EB` is dark enough for *white text on top of it* (5.2:1). Using one blue for both
> fails WCAG AA in one direction or the other. Use the right one for the job.

**Accent budget:** the accent may appear at most in these places —
hero eyebrow, primary buttons, project category labels, link hover, focus rings.
Nowhere else. If it starts feeling colourful, you have used too much.

### 3.2 Typography

Fonts are already wired via `next/font/google` in the scaffold — **keep Geist + Geist Mono**.
They are Vercel's typefaces and are exactly the Linear/Vercel register we want. No new fonts.

| Role | Family | Class |
| --- | --- | --- |
| Headings + body | Geist | `font-sans` (default) |
| Eyebrows, labels, tags, index numbers | Geist Mono | `font-mono` |

**Type scale** — use these exact recipes:

| Element | Classes |
| --- | --- |
| H1 (hero) | `text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold leading-[1.03] tracking-[-0.035em] text-balance` |
| H2 (section titles) | `text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.03em]` |
| H3 (project titles) | `text-xl md:text-2xl font-semibold tracking-[-0.02em]` |
| Big statement (About) | `text-xl md:text-2xl lg:text-[1.75rem] leading-[1.45] tracking-[-0.015em]` |
| Body / descriptions | `text-[15px] md:text-base leading-relaxed text-muted` |
| Eyebrow / label (mono) | `font-mono text-[11px] md:text-xs font-medium uppercase tracking-[0.18em]` |
| Tags (mono) | `font-mono text-[11px] tracking-[0.04em] text-subtle` |
| Button label | `text-sm font-medium` |

Rules: body line-height ≥ 1.5 · body copy capped at `max-w-[46ch]` · headings never below
`leading-[1.0]` · **never** go below 14px for body text.

### 3.3 Spacing, radius, borders, shadows

```
Spacing scale (only these):   4  8  12  16  24  32  48  64  96  128  (px)
                              1  2  3   4   6   8   12  16  24  32   (Tailwind units)

Container:      mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-10
Section rhythm: py-24 md:py-32 lg:py-40
Grid gap:       gap-5 md:gap-6

Radius:  buttons & pills  -> rounded-full
         project cards    -> rounded-3xl        (24px)
         card images      -> rounded-2xl        (16px)
         contact panel    -> rounded-[32px]

Borders: 1px, border-line (#232326). Hover -> border-line-strong (#2E2E33).

Shadows: almost none. Depth comes from surface lifts + borders, not shadows.
         The ONE allowed shadow is on a hovered project card:
         shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]
```

### 3.4 Motion tokens

| Token | Value | Where |
| --- | --- | --- |
| Standard easing | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) | All scroll reveals |
| Reveal duration | `0.6s` | Section / card entrances |
| Micro-interaction | `0.2s`–`0.3s` | Buttons, links, borders |
| Image zoom | `0.7s` | Card image `scale` on hover |
| Stagger | `0.08s` per child | Hero lines, project grid |
| Hover spring | `{ type: "spring", stiffness: 300, damping: 26 }` | Card lift |

### 3.5 Do / Don't

| ✅ Do | ❌ Don't |
| --- | --- |
| Whitespace as the main design element | Decorative blobs, glows, 3D, particles |
| Hairline borders for structure | Heavy drop shadows |
| Two font weights max per block (500/600) | Six different weights |
| One primary CTA per section | Three equally loud buttons |
| Cards lift `-6px` on hover | Cards that rotate, skew, or tilt |
| Text stays perfectly readable while animating | Blur-in text, letter-by-letter typing |

---

## 4. PAGE MAP + WIREFRAMES

Order, top to bottom. Nothing else.

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
│   ABOUT   │  We are a company focused on building AI automations,    │
│  (3 cols) │  intelligent chatbots, and modern web applications…      │
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
- Eyebrow: `AI AUTOMATION · FULL-STACK DEVELOPMENT`
- H1: `We Build AI Automations & Modern Web Applications`
- Paragraph: `Helping businesses automate workflows, build AI tools, and create fast, scalable web applications.`
- Primary button: `View Projects` (+ `ArrowRight` icon) → `#projects`
- Secondary button: `Contact Me` → `#contact`

### Projects section
- H2: `Featured Projects`
- Right-side meta: `SELECTED WORK — 03`

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
- Paragraph: `We run our own outreach on a pipeline we built. Every lead moves through the statuses below, and the dashboard reads straight from it — no screenshots, no edited numbers.`
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
number and description below is transcribed from that PDF verbatim — do not paraphrase the
descriptions or round the figures. If the rate card changes, update the PDF, `src/lib/pricing.ts`
and this table together; they must never disagree.

- Eyebrow: `PRICING`
- H2: `Every service, priced up front.`
- Intro paragraph (verbatim from the PDF): `We build the systems small businesses actually need to stop losing customers to slow replies: websites, chatbots, voice receptionists, and the automation connecting them. Every service has two costs, a one-time setup fee for the build, and a small monthly fee for hosting, API usage, and upkeep. Combine services into a bundle and the monthly fee drops.`
- Meta line: `Updated August 2026`
- Download button: `Download rate card` (+ `Download` icon) → downloads `public/Automation_Squad_Rate_Card.pdf` as `Automation-Squad-Rate-Card.pdf` (uses the HTML `download` attribute, **not** `target="_blank"` — it saves a file, it does not navigate)

**Core services** — eyebrow `CORE SERVICES`, H3 `Pick what you need`. Six cards, in this order:

| Service | Description | Setup | Monthly |
| --- | --- | --- | --- |
| `Business Website` | `A responsive website built to convert visitors into contacts: a booking or quote form, WhatsApp button, Google Maps, and basic SEO included.` | `$250` | `$20` |
| `AI Customer Assistant` | `A chatbot trained on your services, pricing, and FAQs. It answers questions, collects a name and number, and sends qualified leads straight to you.` | `$275` | `$50` |
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
| `Full System` | `Every service running together: website, chatbot, voice receptionist, lead generation, follow-up, and reputation management.` | all six core services | `$1,950` | `$280` `+usage` | `Save $450 on setup and $40 a month versus buying separately.` |

**Add-ons** — eyebrow `ADD-ONS`, H3 `Extend any service`. A three-row list:

| Add-on | Price |
| --- | --- |
| `Extra language for the chatbot or voice assistant` | `+$75 setup, +$10/mo` |
| `Connecting to a CRM or spreadsheet you already use` | `+$100 setup` |
| `Anything outside the services above` | `Quoted after a short call` |

**How we work** — eyebrow `HOW WE WORK`, H3 `Getting started`, paragraph (verbatim from the PDF): `Every project starts with a short call about what you actually need. Scope and the setup fee are confirmed before any work begins, so there are no surprises on the invoice. Single-service builds are typically live within one to two weeks; bundles take two to four depending on scope.`

> **Why no orange.** The PDF uses the brand orange as an accent (section labels, bundle
> top-bars, savings text). This site does not — §6.2 already rejected orange as a site
> accent (fails contrast, pushes off the Linear/Vercel register), and that ruling holds
> here. Savings lines render in plain `text-foreground`, not a new colour.

### About
- Label: `ABOUT`
- Paragraph: `We are a company focused on building AI automations, intelligent chatbots, and modern web applications. We create software that saves businesses time through automation while delivering polished user experiences.`

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
    &su=Project%20enquiry%20—%20Automation%20Squad
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
| Header nav links | **hidden** | visible | visible |
| Header right | `Let's talk` pill (h-9) | pill (h-10) | pill (h-10) |
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

**Mobile navigation decision (deliberate):** with only four anchors on a single page, a
hamburger drawer is more chrome than value. On mobile the header shows the wordmark plus the
`Let's talk` pill; everything else is reached by scrolling. Do **not** add a hamburger menu.

Also required: no horizontal scroll at 320px · nothing hidden behind the fixed header
(`scroll-mt-24` on every section) · all tap targets ≥ 44×44px.

---

## 10. ACCESSIBILITY + PERFORMANCE CHECKLIST

### Accessibility
- [x] Exactly one `<h1>` on the page (the hero). Sections use `<h2>`, project titles `<h3>`. No skipped levels. — *verified in the rendered HTML: 1×h1, 2×h2, 3×h3*
- [x] `<nav aria-label="Primary">` on the header nav.
- [x] Every `<Image>` has a descriptive `alt` (already in `projects.ts`).
- [x] Decorative elements get `aria-hidden="true"` (the hero glow, all icons).
- [x] Every external link: `target="_blank" rel="noopener noreferrer"` **and** an sr-only "opens in a new tab" hint. — *the Pricing PDF download is same-origin and uses `download` instead; it intentionally does not get this treatment, see §6.4.*
- [x] Focus ring visible on every interactive element (global `:focus-visible` rule in §7.1). Never `outline: none`.
- [x] Tab order matches visual order. — *DOM order matches visual order; no `tabindex` overrides anywhere*
- [x] Copy-email result announced via `aria-live="polite"`.
- [x] `text-subtle` (#71717A, 4.0:1) is used **only** at ≥14px on non-essential meta text. Never for body copy.
- [x] `prefers-reduced-motion` honoured everywhere. — *implemented in `Reveal`, `ProjectCard` and the global CSS block; still needs the browser check in §11*

### Performance
- [x] Correct `sizes` on every `fill` image (already in §7.8) — wrong `sizes` = oversized downloads.
- [x] Image containers have a fixed `aspect-[…]` so nothing shifts while loading (CLS < 0.1).
- [x] Fonts via `next/font/google` with `display: "swap"` — no `<link>` to Google Fonts, no FOIT.
- [x] `"use client"` only on `site-header`, `hero`, `projects`, `project-card`, `reveal`, `copy-email-button`. `layout`, `page`, `pipeline`, `pricing`, `about`, `contact`, `site-footer`, `button` stay server components.
- [x] Only `opacity` / `transform` animated.
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
- [x] All six section anchors present in the HTML: `#top`, `#projects`, `#pipeline`, `#pricing`, `#about`, `#contact`.
- [x] Lead pipeline section prerenders statically: heading, all five statuses and the dashboard URL are in the served HTML, and `/` is still `○ (Static)`.
- [x] Pricing section prerenders statically: heading, all six core services, all four bundles, all three add-ons and the `Download rate card` link are in the served HTML, and `/` is still `○ (Static)`.
- [x] `/Automation_Squad_Rate_Card.pdf` serves `200 application/pdf`.
- [x] All three project titles, categories, descriptions and tag sets render.
- [x] All three outbound URLs present (`anchor-builders.vercel.app`, `lumberwiz-2-0.vercel.app`, `khudclothes.com`).
- [x] Gmail compose URL and `mailto:` fallback both present.
- [x] All three `/_next/image` requests return HTTP 200.
- [x] No Tech Stack / testimonial / blog / logo-wall markup anywhere in the output. — *Pricing and Lead pipeline are the two approved exceptions to R5, see §0.*

**Metadata & brand (§6.2 / §6.3)**
- [x] All 13 routes/assets serve 200 with the right content-type: `/`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image`, `/twitter-image`, `/icon.png`, `/apple-icon.png`, `/favicon.ico`, `/logo-mark.png`, `/logo-lockup.png`, `/icon-192.png`, `/icon-512.png`.
- [x] `<link rel="canonical">` points at `https://team-automationsolutions.me`.
- [x] OG tags complete: `og:title`, `og:url`, `og:site_name`, `og:locale`, `og:type`, `og:image` (+ type/width/height/alt).
- [x] Twitter card is `summary_large_image` with its own image tags.
- [x] Favicon links resolve to the **branded** icons, not the create-next-app default.
- [x] `robots.txt` allows all and points at the sitemap; `sitemap.xml` lists the canonical URL.
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
- [ ] `Projects` / `Pricing` / `About` / `Contact` / `Let's talk` all scroll smoothly to the right section, and the heading is **not** hidden under the header.
- [ ] `View Projects` → projects section. `Contact Me` → contact section.
- [ ] Hovering a card: lifts ~6px, border lightens, image zooms slightly, arrow nudges.
- [ ] `View Project` opens the correct site in a **new tab** (check all three URLs).
- [ ] `View the dashboard` opens `https://leads-website-alpha.vercel.app/` in a **new tab**, and the statuses on that page still read Researching / Ready / Approved / Sent / Replied.
- [ ] `Download rate card` saves `Automation-Squad-Rate-Card.pdf` to disk (does **not** open a new tab), and the PDF opens and matches the on-page figures.
- [ ] `Email` opens Gmail compose with To, Subject and Body pre-filled.
- [ ] `Copy email` copies the address and shows `Copied` for 2 seconds.
- [ ] The `send@team-automationsolutions.me` text link opens the default mail client.

**Responsive** — resize to each width and look:
- [ ] **320px** — no horizontal scrollbar anywhere.
- [ ] **375px** — H1 wraps to 3–4 lines and never overflows; buttons reachable; cards stacked.
- [ ] **768px** — 2-column grid appears; nav links appear.
- [ ] **1024px / 1440px** — content stays centred at max 1200px; margins feel generous.

**Accessibility**
- [ ] Tab through the entire page: a visible blue focus ring on every stop, in visual order.
- [ ] DevTools → Rendering → **Emulate `prefers-reduced-motion: reduce`** → reload. Content still appears (fades only), nothing slides, nothing is stuck invisible.
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
