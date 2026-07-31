# Project preview images — DROP THEM HERE

The build spec (`/BUILD_SPEC.md`) expects **exactly these three files** in this folder.
The filenames are hard-coded in `src/lib/projects.ts`. Do not rename them.

| Required filename | Which screenshot | Source URL |
| --- | --- | --- |
| `anchor.png`    | Anchor Builders homepage hero ("A proud tradition of service") | https://anchor-builders.vercel.app/ |
| `lumberwiz.png` | LumberWiz homepage hero (brown/terracotta hero, "LumberWiz")   | https://lumberwiz-2-0.vercel.app/   |
| `charmeem.png`  | Char Meem homepage hero ("WEAR YOUR IMPRINT.")                 | https://www.khudclothes.com/        |

## Specs

- Format: `.png` (or `.webp` — if you use `.webp`, update the `image` field in `src/lib/projects.ts`)
- Width: **1920px minimum** (2x for retina). 3840px is fine too.
- Aspect ratio: roughly **16:9 / 16:10** desktop screenshots. The card crops with
  `object-cover object-top`, so a taller screenshot is safe — the top of the page stays visible.
- Keep each file under ~600 KB after optimisation. Run them through
  https://squoosh.app or `npx @squoosh/cli` if they are heavier.

## How to capture them

Full-page screenshot at 1920x1080 in a Chromium browser:

1. Open the URL.
2. `F12` → `Ctrl+Shift+P` → type `screenshot` → **"Capture screenshot"** (viewport only, which is what we want — hero section).
3. Rename the download to the filename in the table above and drop it here.

## If an image is missing

The build must not crash. `ProjectCard` renders a neutral gradient placeholder with the
project name when the file is absent — see BUILD_SPEC.md § 7.3. Ship the real images before
going live.

---

Delete this README before deploying if you want a clean `public/` folder. It is not imported anywhere.
