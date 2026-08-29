"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  // null on "/", otherwise the route segment ("projects", "pricing", …).
  const segment = useSelectedLayoutSegment();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Growing the viewport past the mobile breakpoint while the dropdown is
  // open (e.g. rotating a tablet) would otherwise leave it stuck open
  // underneath the now-visible desktop nav.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => setMenuOpen(false);
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={[
        "fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-colors duration-300",
        // Never fully transparent any more: the video behind it is bright, so a
        // see-through header would put white nav text on a near-white ground.
        // Both states are dark glass; scrolling just deepens it.
        scrolled || menuOpen
          ? "border-b border-line bg-background-deep/88"
          : "border-b border-white/5 bg-background-deep/55",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-18 md:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-70"
        >
          {/* Brand navy measures 1.7:1 on this background, so the mark sits
              in a white chip rather than bare on the dark header. */}
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
        </Link>

        {/* Inline links appear at lg, not md: five items plus the wordmark and
            the CTA don't fit comfortably in a 768px bar. Below that they live
            in the menu panel. */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = segment === link.segment;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "text-sm transition-colors duration-200 hover:text-foreground",
                    active ? "text-foreground" : "text-muted",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={buttonClass(
              "secondary",
              "hidden h-10 px-5 text-sm md:inline-flex",
            )}
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="border-t border-line lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const active = segment === link.segment;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "block rounded-lg px-3 py-3 text-base transition-colors duration-200 hover:bg-surface hover:text-foreground",
                        active ? "bg-surface text-foreground" : "text-muted",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="px-6 pb-6">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className={buttonClass("primary", "w-full")}
              >
                Let&apos;s talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
