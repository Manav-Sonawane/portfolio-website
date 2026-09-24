"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  items: string[];
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}

/** Infinite ticker that speeds up with scroll velocity. */
export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  className = "",
  itemClassName = "",
  separator = <span className="mx-8 text-signal">{"//"}</span>,
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !track.current) return;
      const loop = gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 }
      );

      let boost: gsap.core.Timeline | null = null;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 7);
          boost?.kill();
          boost = gsap
            .timeline()
            .to(loop, { timeScale: speed, duration: 0.25, overwrite: true })
            .to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
        },
      });
    },
    { dependencies: [reduced, duration, reverse] }
  );

  const row = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span className={itemClassName}>{item}</span>
      {separator}
    </span>
  ));

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center">{row}</div>
      </div>
    </div>
  );
}
