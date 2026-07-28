"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, safeDuration } from "@/lib/motion-tokens";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 15, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: safeDuration(0.6, prefersReduced),
        delay,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [delay, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
