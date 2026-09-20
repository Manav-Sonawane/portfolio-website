"use client";
import { useSyncExternalStore } from "react";

/** Subscribe to a media query as an external store (SSR snapshot is always false). */
function makeMediaHook(query: string) {
  const subscribe = (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;
  return () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** prefers-reduced-motion: reduce — every GSAP component branches on this. */
export const useReducedMotion = makeMediaHook("(prefers-reduced-motion: reduce)");

/** prefers-contrast: more */
export const useHighContrast = makeMediaHook("(prefers-contrast: more)");
