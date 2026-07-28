"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // Track the previous pathname to only animate on actual route CHANGES
  const prevPathname = useRef<string | null>(null);

  useGSAP(() => {
    // Skip animation on the very first render (same path, no change)
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    if (prefersReduced) {
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      return;
    }

    const tl = gsap.timeline();
    // 1. RGB-split glitch
    tl.set(container.current, { filter: "none", x: 0 })
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
      // 2. Wipe to void
      .to(container.current, { opacity: 0, duration: 0.08 })
      // 3. Slide back in
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
