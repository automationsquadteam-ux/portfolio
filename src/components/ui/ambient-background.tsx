/**
 * The four-layer ambient lighting system behind the entire page: a base
 * radial gradient, a noise texture, slow-floating blurred "light pool"
 * blobs, and a faint technical grid. Fixed behind all content (-z-10) so
 * every translucent surface (bg-surface, bg-surface-hover) shows a soft
 * wash of it through the glass.
 *
 * Server component — the blob motion is a pure CSS @keyframes animation
 * (see globals.css), so nothing here needs "use client", and the global
 * prefers-reduced-motion block already freezes it for free.
 *
 * Deliberately monochrome: every blob is a shade of the brand accent blue,
 * not the indigo/purple mix the reference design system uses — this site's
 * accent budget stays tied to the logo (see BUILD_SPEC.md §3.1).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Layer 1 — base radial gradient, vertical depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%)",
        }}
      />

      {/* Layer 2 — noise texture, prevents banding in the gradients below */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 3 — floating ambient light pools, all one hue family */}
      <div
        className="absolute top-[-12%] left-1/2 h-[900px] w-[1100px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[150px] animate-[blob-float_9s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[28%] left-[-12%] h-[650px] w-[520px] rounded-full opacity-[0.14] blur-[120px] animate-[blob-float_11s_ease-in-out_infinite] [animation-delay:-3s]"
        style={{
          background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[10%] right-[-10%] h-[580px] w-[460px] rounded-full opacity-[0.12] blur-[110px] animate-[blob-float_10s_ease-in-out_infinite] [animation-delay:-5s]"
        style={{
          background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
        }}
      />

      {/* Layer 4 — faint technical grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
