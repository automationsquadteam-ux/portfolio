"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4";

/**
 * The fixed background video every page sits on top of. Rendered once in
 * layout.tsx, outside {children}, so client-side navigation never remounts it
 * — the footage keeps playing uninterrupted across route changes instead of
 * restarting on every page.
 *
 * Sits at -z-10 and paints above <body>'s background-color but below all page
 * content, so sections need no z-index of their own to stack correctly.
 *
 * The footage is a dark wireframe sphere with a gold glow on a NEAR-WHITE
 * ground, and it is deliberately left bright — it is the centrepiece, not
 * wallpaper. The scrim below is a light vignette only: it darkens the top and
 * bottom edges so the header and footer have something to sit against, and
 * barely touches the middle.
 *
 * That means legibility is NOT the scrim's job here (it was in the previous
 * revision). It belongs entirely to the dark `glass-panel` surfaces every text
 * block sits on. Do not put body copy directly over this. See BUILD_SPEC §3.7.
 */
export function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // `autoPlay` is set statically in JSX rather than as {!reduce}: useReducedMotion
  // returns null on the server and during first render, so a conditional
  // attribute would mismatch on hydration. Pausing here instead costs
  // reduced-motion users a few frames of playback before it stops, which is the
  // better trade than a hydration warning.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (reduce) {
      video.pause();
    } else {
      // Autoplay can still be refused (power saving, iOS Low Power Mode). The
      // poster-less first frame stays on screen if so, which is an acceptable
      // still background rather than a broken one.
      void video.play().catch(() => {});
    }
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <video
        ref={ref}
        className="size-full object-cover"
        style={{ filter: "saturate(1.25) contrast(1.06)" }}
        src={VIDEO_SRC}
        poster="/video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />

      {/* Edge vignette, not a legibility scrim. Strong at the very top and
          bottom so the fixed header and the footer have something to meet,
          near-clear across the middle so the sphere and its gold glow read at
          essentially full brightness. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,6,0.72) 0%, rgba(5,5,6,0.14) 22%, rgba(5,5,6,0.10) 55%, rgba(5,5,6,0.30) 82%, rgba(5,5,6,0.75) 100%)",
        }}
      />

      {/* A wash of the accent gold, screened over the footage to warm the whole
          canvas toward the glow rather than leaving it neutral grey. */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, rgba(245,165,36,0.5) 0%, transparent 62%)",
        }}
      />
    </div>
  );
}
