"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PATHS = [
  "M45.3,-58.5C58.5,-49.6,68.5,-33.6,71.8,-16.2C75.1,1.1,71.7,19.8,62.1,34.6C52.6,49.4,36.8,60.3,19.1,65.6C1.4,70.9,-18.3,70.7,-34.9,62.8C-51.6,54.9,-65.2,39.3,-70.6,21.1C-76.1,2.9,-73.4,-17.8,-63.3,-33.6C-53.2,-49.5,-35.7,-60.5,-17.4,-65.7C0.9,-70.8,20.9,-70.1,45.3,-58.5Z",
  "M39.5,-51.6C51.2,-44.1,60.5,-31.9,64.6,-17.8C68.7,-3.7,67.6,12.3,60.8,25.6C54.1,38.9,41.7,49.5,27.5,56.4C13.4,63.3,-2.5,66.5,-18.2,63.7C-33.9,60.9,-49.4,52.1,-58.9,38.9C-68.4,25.7,-71.9,8.1,-68.9,-8.1C-65.9,-24.3,-56.4,-39.1,-43.5,-46.6C-30.6,-54.1,-15.3,-54.3,-0.2,-54.1C14.9,-53.9,29.8,-53.4,39.5,-51.6",
];

export default function MorphBlob({ tone = "phosphor" }: { tone?: "phosphor" | "amber" }) {
  const path = useRef<SVGPathElement>(null);
  const prefersReduced = useReducedMotion();
  const color = tone === "phosphor" ? "var(--phosphor-900)" : "var(--amber-900)";

  useGSAP(() => {
    if (prefersReduced) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(path.current, { duration: 8, attr: { d: PATHS[1] }, ease: "sine.inOut" });
    
    gsap.to(path.current, {
      duration: 16,
      rotate: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "none",
    });
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden -z-10">
      <svg
        viewBox="-100 -100 200 200"
        className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] opacity-40 blur-3xl"
      >
        <path ref={path} d={PATHS[0]} fill={color} />
      </svg>
    </div>
  );
}
