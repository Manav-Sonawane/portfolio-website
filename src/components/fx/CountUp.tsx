"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, safeDuration } from "@/lib/motion-tokens";

interface CountUpProps {
  target: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({
  target,
  duration = 1.2,
  className,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced) {
      setVal(target);
      return;
    }

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: safeDuration(duration, prefersReduced),
      ease: EASE.reveal,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 95%",
        once: true,
      },
      onUpdate: () => {
        setVal(Math.floor(obj.value));
      },
    });
  }, [target, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
