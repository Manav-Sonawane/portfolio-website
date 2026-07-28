/**
 * MAAV_OS — Motion Tokens
 * Consistent easing and duration values for every GSAP animation.
 * Import from here, never hand-tune per-component.
 */

export const EASE = {
  /** Boot sequence, hero entrance — decisive, mechanical */
  boot: "power4.out",
  /** Scroll reveals — smooth, no bounce */
  reveal: "power2.out",
  /** Glitch-wipe transitions — deliberately stepped */
  glitch: "steps(4)",
  /** Button/cursor magnetism */
  magnetic: "power3.out",
  /** Card flip settle — physical feel */
  cardFlip: "back.out(1.2)",
  /** Magnetic button release spring */
  spring: "elastic.out(1, 0.4)",
} as const;

export const DURATION = {
  instant: 0.15,
  fast: 0.35,
  base: 0.6,
  slow: 1.1,
  boot: 1.8,
} as const;

/** Reduced-motion safe duration — set all GSAP durations to this when user prefers reduced motion */
export const REDUCED_DURATION = 0.01;

/** Utility: returns duration based on user's motion preference */
export function safeDuration(
  duration: number,
  prefersReduced: boolean
): number {
  return prefersReduced ? REDUCED_DURATION : duration;
}
