import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background-deep/70 backdrop-blur-xl">
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
