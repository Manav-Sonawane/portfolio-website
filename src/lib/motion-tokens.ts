/**
 * Motion tokens — one vocabulary of easing and timing for the whole site.
 */

export const EASE = {
  /** Headline / hero entrances — long, confident deceleration */
  expo: "expo.out",
  /** Scroll reveals */
  reveal: "power3.out",
  /** Curtains and wipes */
  wipe: "expo.inOut",
  /** Cursor / magnetic follow */
  magnetic: "power3.out",
  /** Magnetic release */
  spring: "elastic.out(1, 0.4)",
} as const;

export const DURATION = {
  instant: 0.15,
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

/** Reduced-motion safe duration */
export const REDUCED_DURATION = 0.01;

export function safeDuration(duration: number, prefersReduced: boolean): number {
  return prefersReduced ? REDUCED_DURATION : duration;
}

/**
 * Delay for above-the-fold entrance animations so they line up with whatever
 * is covering the page: the preloader on first load, the curtain on navigation.
 */
export function introDelay(extra = 0): number {
  if (typeof document === "undefined") return extra;
  const loading = document.documentElement.classList.contains("preloading");
  return (loading ? 2.15 : 0.5) + extra;
}
