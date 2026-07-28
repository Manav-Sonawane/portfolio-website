"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps extends React.ComponentProps<"button"> {
  range?: number; // distance threshold in pixels
}

export default function MagneticButton({
  children,
  range = 35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Physically pull toward cursor within a radius
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: EASE.magnetic,
    });
  };

  const onMouseLeave = () => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    // Spring back to center
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASE.spring,
    });
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
