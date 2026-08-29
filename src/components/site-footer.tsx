import Link from "next/link";
import { navLinks, site } from "@/lib/site";

// Transparent: the video runs behind the footer rather than being cut off by a
// solid bar. It is a vertical gradient rather than a flat alpha so the top edge
// is genuinely see-through and it densifies toward the bottom of the page —
// the footer fades into the canvas instead of sitting on it as a block.
//
// The gradient is not optional. It is stacked with the vignette's bottom stops
// in BackgroundVideo to keep the footer's 13px text legible over a bright
// frame; that combination is also why footer text is `text-muted`, not the
// `text-subtle` it would use on an opaque surface.
//
// The sticky-footer flex layout that pins it to the viewport bottom on short
// pages lives in layout.tsx.
export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-linear-to-b from-background-deep/45 via-background-deep/75 to-background-deep/92">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-8 lg:px-10">
        {/* Every route reachable from every page — the top nav collapses into
            a menu below lg, so this is also the persistent crawlable path
            between pages. */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="font-mono transition-colors duration-200 hover:text-foreground"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
