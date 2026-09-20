"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { introDelay } from "@/lib/motion-tokens";

interface SplitRevealProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  /** Above-the-fold: wait for the preloader / curtain before playing */
  intro?: boolean;
}

/** Masked line-by-line rise using GSAP SplitText. Re-splits on resize / font load. */
export default function SplitReveal({ children, as = "div", className = "", delay = 0, intro = false }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.style.visibility = "visible";
        return;
      }
      const start = delay + (intro ? introDelay() : 0);

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 118,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.09,
            delay: start,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        },
      });
    },
    { dependencies: [reduced] }
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`split-init ${className}`}>
      {children}
    </Tag>
  );
}
