"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Growing the viewport past the mobile breakpoint while the dropdown is
  // open (e.g. rotating a tablet) would otherwise leave it stuck open
  // underneath the now-visible desktop nav.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
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
        </a>

        {/* Desktop links — hidden below md, reached via the hamburger menu instead */}
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

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={buttonClass(
              "secondary",
              "hidden h-9 px-4 text-[13px] md:inline-flex md:h-10 md:px-5 md:text-sm",
            )}
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface md:hidden"
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
            className="border-t border-line md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-muted transition-colors duration-200 hover:bg-surface hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={buttonClass("primary", "w-full")}
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
