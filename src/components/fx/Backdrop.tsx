"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Fixed navy field: cool mesh glow, diagonal hatch, hairline grid, a pointer spotlight and an
 * occasional cyan meteor. Layers drift with scroll for depth.
 */
export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".aurora-a", { x: "10vw", y: "6vh", scale: 1.12, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".aurora-b", { x: "-8vw", y: "-8vh", scale: 1.18, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.to(".aurora-wrap-a", { yPercent: -30, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.2 } });
      gsap.to(".aurora-wrap-b", { yPercent: 26, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.8 } });
      gsap.to(".aurora-grid", { backgroundPositionY: "216px", ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.6 } });

      // Meteor: a thin cyan streak crossing the field every few seconds
      const meteor = root.current?.querySelector<HTMLElement>(".meteor");
      let call: gsap.core.Tween | null = null;
      const fire = () => {
        if (!meteor) return;
        const startX = window.innerWidth * (0.45 + Math.random() * 0.55);
        const startY = window.innerHeight * (0.02 + Math.random() * 0.35);
        gsap.fromTo(
          meteor,
          { x: startX, y: startY, opacity: 0, scaleX: 0.4 },
          {
            x: startX - 340,
            y: startY + 290,
            opacity: 1,
            scaleX: 1,
            duration: 1.1,
            ease: "power2.in",
            onComplete: () => {
              gsap.to(meteor, { opacity: 0, duration: 0.25 });
              call = gsap.delayedCall(4 + Math.random() * 7, fire);
            },
          }
        );
      };
      call = gsap.delayedCall(3.2, fire);

      // Pointer spotlight
      if (window.matchMedia("(hover: hover)").matches) {
        const sx = gsap.quickTo(".spot", "x", { duration: 0.9, ease: "power3" });
        const sy = gsap.quickTo(".spot", "y", { duration: 0.9, ease: "power3" });
        const move = (e: MouseEvent) => {
          sx(e.clientX);
          sy(e.clientY);
        };
        window.addEventListener("mousemove", move);
        return () => {
          window.removeEventListener("mousemove", move);
          call?.kill();
        };
      }
      return () => call?.kill();
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-ink">
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% -10%, #12234a 0%, #0a1226 45%, #070b13 80%)" }} />

      <div className="aurora-wrap-a absolute inset-0">
        <div
          className="aurora-a absolute -left-[18vmax] -top-[22vmax] h-[70vmax] w-[70vmax] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(70,120,255,0.20), rgba(70,120,255,0) 62%)" }}
        />
      </div>
      <div className="aurora-wrap-b absolute inset-0">
        <div
          className="aurora-b absolute -bottom-[28vmax] -right-[18vmax] h-[75vmax] w-[75vmax] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(86,216,255,0.13), rgba(86,216,255,0) 62%)" }}
        />
      </div>

      {/* diagonal hatch */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(150,180,230,0.028) 0 1px, transparent 1px 5px)" }}
      />

      {/* hairline grid */}
      <div
        className="aurora-grid absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(130,165,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(130,165,220,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 100%)",
        }}
      />

      <div
        className="meteor absolute left-0 top-0 h-[1.5px] w-[180px] origin-right opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(86,216,255,0.9))", rotate: "40deg", boxShadow: "0 0 8px rgba(86,216,255,0.7)" }}
      />

      <div
        className="spot absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{ background: "radial-gradient(circle at center, rgba(86,216,255,0.07), transparent 65%)" }}
      />

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
    </div>
  );
}
