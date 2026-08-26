"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Tracks pointer position within an element and writes it to that element
 * as CSS custom properties (--spot-x / --spot-y) directly on the DOM node —
 * no React state, no re-render per mouse move. Pair the returned `ref` +
 * `onPointerMove` with a `<Spotlight />` overlay (ui/spotlight.tsx) rendered
 * as the element's first child, and give the element `className="group/spot
 * relative"` so the overlay's group-hover/spot: opacity transition fires.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}
