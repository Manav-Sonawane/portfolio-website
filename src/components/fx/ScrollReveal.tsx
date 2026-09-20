"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { introDelay } from "@/lib/motion-tokens";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** vertical travel in px */
  y?: number;
  /** if > 0, reveal direct children one after another instead of the wrapper */
  stagger?: number;
  /** Above-the-fold: wait for the preloader / curtain before playing */
  intro?: boolean;
}

export default function ScrollReveal({ children, delay = 0, className = "", y = 44, stagger = 0, intro = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { opacity: 1 });
        return;
      }
      const targets = stagger > 0 ? Array.from(el.children) : el;
      if (stagger > 0) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger,
          delay: delay + (intro ? introDelay() : 0),
          scrollTrigger: { trigger: el, start: "top 91%", once: true },
        }
      );
    },
    { dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={`reveal-init ${className}`}>
      {children}
    </div>
  );
}
