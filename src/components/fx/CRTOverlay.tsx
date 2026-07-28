"use client";

import { useHighContrast, useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * MAAV_OS — CRTOverlay
 * Fixed, pointer-events-none scanline + vignette overlay.
 * Sits above everything (z-[998]) at 6% opacity — felt, not seen.
 * Disabled entirely under prefers-reduced-motion or prefers-contrast: more.
 */
export default function CRTOverlay() {
  const reduced = useReducedMotion();
  const highContrast = useHighContrast();

  if (reduced || highContrast) return null;

  return (
    <>
      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[998] mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Vignette — dark corners, CRT tube effect */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[997]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </>
  );
}
