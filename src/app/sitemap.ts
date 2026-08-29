import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

/**
 * Crawl priority per route. The home page leads; the two pages that actually
 * convert (pricing, contact) rank above the supporting ones.
 * Anything missing here falls back to 0.5.
 */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/pricing": 0.9,
  "/projects": 0.8,
  "/contact": 0.8,
  "/about": 0.6,
  "/pipeline": 0.6,
};

/**
 * Emits /sitemap.xml, which robots.ts has always pointed at — it just never
 * existed until 2026-08-27 (see BUILD_SPEC.md §7.20).
 *
 * Routes are derived from `navLinks` rather than hand-listed, so adding a page
 * to the nav also adds it to the sitemap. A page that is deliberately *not* in
 * the nav has to be appended here explicitly.
 *
 * `lastModified` is evaluated once at build time (this route is static), so
 * every deploy stamps the current date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // "/" is listed first regardless of whether it happens to be in the nav (it
  // is, since 2026-08-29) — the Set then drops the duplicate. That way the home
  // page can never fall out of the sitemap by being removed from the nav.
  const routes: string[] = Array.from(
    new Set<string>(["/", ...navLinks.map((link) => link.href)]),
  );

  return routes.map((route) => ({
    // site.url carries no trailing slash, so "/" must not append one either —
    // the URL here has to match that page's rel="canonical" exactly, or the two
    // disagree about which URL is authoritative.
    url: route === "/" ? site.url : `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[route] ?? 0.5,
  }));
}
