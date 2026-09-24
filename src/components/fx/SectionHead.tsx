"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { introDelay } from "@/lib/motion-tokens";

/** `02  PROJECTS ─────────` — numbered section header whose rule draws itself in. */
export default function SectionHead({
  n,
  title,
  meta,
  intro = false,
  className = "",
}: {
  n: string;
  title: string;
  meta?: string;
  intro?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const tl = gsap.timeline({
        delay: intro ? introDelay() : 0,
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });
      tl.from(".sh-n, .sh-t", { opacity: 0, x: -14, duration: 0.7, ease: "expo.out", stagger: 0.08 })
        .from(".sh-rule", { scaleX: 0, duration: 1.3, ease: "expo.out" }, 0.1)
        .from(".sh-meta", { opacity: 0, duration: 0.6 }, 0.5);
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <div ref={root} className={`flex items-center gap-4 ${className}`}>
      <span className="sh-n font-mono text-[0.7rem] tracking-[0.2em] text-signal">{n}</span>
      <h2 className="sh-t font-display text-xl uppercase tracking-[0.14em] text-paper sm:text-2xl">{title}</h2>
      <span className="sh-rule h-px flex-1 origin-left bg-gradient-to-r from-[var(--line-strong)] to-transparent" />
      {meta && <span className="sh-meta label hidden sm:inline">{meta}</span>}
    </div>
  );
}
