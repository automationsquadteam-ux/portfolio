import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 " +
  "text-sm font-medium whitespace-nowrap transition-all duration-200 " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent-solid text-accent-fg hover:bg-accent-hover",
  secondary:
    "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-surface-hover",
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
