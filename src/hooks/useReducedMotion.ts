"use client";
import { useEffect, useState } from "react";

/**
 * MAAV_OS — useReducedMotion
 * Reads prefers-reduced-motion and prefers-contrast media queries.
 * All GSAP animation components branch on this.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function useHighContrast(): boolean {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-contrast: more)");
    setHighContrast(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHighContrast(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return highContrast;
}
