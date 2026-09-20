"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Fixed aurora mesh + perspective grid + pointer spotlight.
 * The blobs drift on their own, and shift with page scroll for a sense of depth.
 */
export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".aurora-a", { x: "12vw", y: "8vh", scale: 1.15, duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".aurora-b", { x: "-10vw", y: "-10vh", scale: 1.2, duration: 17, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".aurora-c", { x: "-6vw", y: "12vh", scale: 0.85, duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true });

      // Scroll parallax — layers travel at different speeds
      gsap.to(".aurora-wrap-a", { yPercent: -35, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.2 } });
      gsap.to(".aurora-wrap-b", { yPercent: 30, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.8 } });
      gsap.to(".aurora-grid", { backgroundPositionY: "240px", ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.6 } });

      // Pointer spotlight
      if (window.matchMedia("(hover: hover)").matches) {
        const sx = gsap.quickTo(".spot", "x", { duration: 0.9, ease: "power3" });
        const sy = gsap.quickTo(".spot", "y", { duration: 0.9, ease: "power3" });
        const move = (e: MouseEvent) => {
          sx(e.clientX);
          sy(e.clientY);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-ink">
      <div className="aurora-wrap-a absolute inset-0">
        <div
          className="aurora-a absolute -left-[20vmax] -top-[25vmax] h-[75vmax] w-[75vmax] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(124,108,255,0.34), rgba(124,108,255,0) 62%)" }}
        />
        <div
          className="aurora-c absolute right-[8vw] top-[30vh] h-[40vmax] w-[40vmax] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(198,255,77,0.10), rgba(198,255,77,0) 65%)" }}
        />
      </div>
      <div className="aurora-wrap-b absolute inset-0">
        <div
          className="aurora-b absolute -bottom-[30vmax] -right-[20vmax] h-[80vmax] w-[80vmax] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(46,230,197,0.20), rgba(46,230,197,0) 62%)" }}
        />
      </div>

      <div
        className="aurora-grid absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 25%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 25%, #000 20%, transparent 100%)",
        }}
      />

      <div
        className="spot absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{ background: "radial-gradient(circle at center, rgba(198,255,77,0.07), transparent 65%)" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}
