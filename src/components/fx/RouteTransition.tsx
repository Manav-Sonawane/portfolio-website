"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isFirstMount = useRef(true);

  // Keep track of first mount so we don't glitch on initial page load (let BootSequence handle it)
  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useGSAP(() => {
    if (isFirstMount.current) return;

    if (prefersReduced) {
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      return;
    }

    const tl = gsap.timeline();
    // 1. Horizontal RGB-split glitch (3 quick offset frames)
    tl.set(container.current, { filter: "none" })
      .to(container.current, {
        keyframes: [
          {
            x: -6,
            filter: "drop-shadow(3px 0 0 rgba(255, 0, 80, 0.6)) drop-shadow(-3px 0 0 rgba(0, 255, 249, 0.6))",
            duration: 0.05,
          },
          { x: 4, duration: 0.05 },
          { x: 0, filter: "none", duration: 0.05 },
        ],
      })
      // 2. Wipe to transparent/dark
      .to(container.current, { opacity: 0, duration: 0.08 })
      // 3. Slide and fade back in
      .fromTo(
        container.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
  }, [pathname, prefersReduced]);

  return (
    <div ref={container} className="w-full flex-1 flex flex-col">
      {children}
    </div>
  );
}
