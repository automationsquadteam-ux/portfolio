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
