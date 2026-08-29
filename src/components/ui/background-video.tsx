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
 * The scrim is not decoration. Every contrast figure in globals.css §:root is
 * computed against its lightest point (75% #050506); it's what makes white
 * text safe over footage whose brightness we don't control. See BUILD_SPEC §3.7.
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
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />

      {/* Legibility scrim — darkest at the top and bottom edges, where the
          fixed header and the footer sit. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,6,0.88) 0%, rgba(5,5,6,0.75) 38%, rgba(5,5,6,0.78) 70%, rgba(5,5,6,0.9) 100%)",
        }}
      />
    </div>
  );
}
