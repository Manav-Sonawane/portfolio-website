"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CursorGlow() {
  const prefersReduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch/non-hover devices or if reduced motion is requested
    const touchDevice = window.matchMedia("(hover: none)").matches;
    if (touchDevice || prefersReduced) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      // Trails slightly behind the mouse cursor for a smooth fluid glow
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const attachListeners = () => {
      const targets = document.querySelectorAll("a, button, [role='button'], .cursor-pointer");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    attachListeners();

    // Re-observe mutation shifts to capture new elements
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll("a, button, [role='button'], .cursor-pointer");
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [prefersReduced]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
    >
      {/* Lagging Phosphor Glow Ring & Aura */}
      <div
        className={`rounded-full transition-all duration-300 ease-out bg-[--phosphor-400]/10 border border-[--phosphor-400]/20 blur-sm ${
          isHovered ? "w-16 h-16 scale-110 opacity-45 shadow-[0_0_15px_rgba(74,222,128,0.3)]" : "w-10 h-10 opacity-20"
        }`}
      />
    </div>
  );
}
