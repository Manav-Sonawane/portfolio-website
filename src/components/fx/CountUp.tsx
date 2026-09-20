"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  target: number;
  duration?: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/** Tabular-number counter that writes straight to the DOM (no per-frame React renders). */
export default function CountUp({ target, duration = 1.8, decimals = 0, className, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const o = { v: 0 };
      el.textContent = fmt(0);
      gsap.to(o, {
        v: target,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
        onUpdate: () => {
          el.textContent = fmt(o.v);
        },
      });
    },
    { dependencies: [target, reduced] }
  );

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(target)}
    </span>
  );
}
