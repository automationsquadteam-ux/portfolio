<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Start here

**Read [`BUILD_SPEC.md`](./BUILD_SPEC.md) in full before writing any code.** It is the complete,
step-by-step specification for this project: design tokens, exact copy, file-by-file code,
motion spec, responsive rules, and the acceptance checklist.

Quick facts:

- One page only (`/`), dark mode only, exactly 3 projects. No Tech Stack section.
- Tailwind v4 — theme lives in `src/app/globals.css`, there is **no** `tailwind.config.js`.
- Animation library is `motion` (Framer Motion), imported from `motion/react`.
- Icons are `lucide-react`. No emoji.
- Done means `npm run lint` and `npm run build` are both clean and every box in
  BUILD_SPEC.md §11 is ticked.
