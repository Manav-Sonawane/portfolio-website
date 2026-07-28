"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface PixelDecryptProps {
  text: string;
  className?: string;
}

export default function PixelDecrypt({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      el.textContent = text;
      return;
    }

    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration: 1.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        const revealCount = Math.floor(state.progress * text.length);
        el.textContent = text
          .split("")
          .map((c, i) =>
            i < revealCount
              ? c
              : c === " "
              ? " "
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("");
      },
    });
  }, [text, prefersReduced]);

  return <h2 ref={ref} className={className}>{text}</h2>;
}
