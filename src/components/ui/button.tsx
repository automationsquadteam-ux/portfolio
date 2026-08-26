import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "relative inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 " +
  "text-sm font-medium whitespace-nowrap transition-all duration-200 " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Glow shadow (see globals.css --shadow-cta) + a diagonal light sweep on
  // hover, built entirely from a `before:` pseudo-element so it costs no
  // extra DOM node and only ever animates `transform` (R9).
  primary:
    "overflow-hidden bg-accent-solid text-accent-fg shadow-cta hover:bg-accent-hover hover:shadow-cta-hover " +
    "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent " +
    "before:via-white/25 before:to-transparent before:transition-transform before:duration-500 " +
    "before:ease-[cubic-bezier(0.16,1,0.3,1)] before:content-[''] hover:before:translate-x-full",
  secondary:
    "border border-line bg-surface text-foreground shadow-inset hover:border-line-strong hover:bg-surface-hover",
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
