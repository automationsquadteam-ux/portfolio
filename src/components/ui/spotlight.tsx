/**
 * The mouse-tracking radial glow used on every glass card. Render as the
 * first child inside an element that carries `useSpotlight()`'s `ref` +
 * `onPointerMove`, plus `className="group/spot relative isolate"`. `isolate`
 * matters: this overlay sits at `-z-10` so it paints behind the card's own
 * (static, non-positioned) text content — without a stacking context on the
 * parent, a negative z-index can escape and stack against unrelated page
 * furniture instead of just this card.
 *
 * A plain function component, not "use client" — it has no state or
 * handlers of its own, so it's free to render from a server component as
 * long as its interactive parent supplies the pointer events.
 */
export function Spotlight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style={{
        background:
          "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--accent-glow), transparent 70%)",
      }}
    />
  );
}
