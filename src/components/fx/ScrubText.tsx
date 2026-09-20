"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Words light up one by one as the paragraph travels through the viewport. */
export default function ScrubText({
  children,
  as = "p",
  className = "",
}: {
  children: string;
  as?: "p" | "div" | "h2";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.12,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
            }
          );
        },
      });
    },
    { dependencies: [reduced] }
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
