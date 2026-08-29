import Link from "next/link";
import { navLinks, site } from "@/lib/site";

// Opaque, not translucent: the footer is the one surface that should read as a
// solid edge to the page rather than letting the video through. The
// sticky-footer flex layout that pins it to the viewport bottom on short pages
// lives in layout.tsx.
export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-background-deep">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-8 lg:px-10">
        {/* Every route reachable from every page — the top nav collapses into
            a menu below lg, so this is also the persistent crawlable path
            between pages. */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-subtle transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
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
