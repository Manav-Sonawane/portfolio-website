"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { EASE, DURATION, safeDuration } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  "booting maav_os v3.0.0",
  "loading kernel modules ......... [ OK ]",
  "mounting /dev/manav ............ [ OK ]",
  "initializing phosphor display .. [ OK ]",
];

export default function BootSequence({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if booted in this session to prevent re-playing on internal page clicks
    const hasBooted = sessionStorage.getItem("booted");
    if (!hasBooted) {
      setVisible(true);
    } else {
      onDone?.();
    }
  }, [onDone]);

  useGSAP(() => {
    if (!visible) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("booted", "1");
        setVisible(false);
        onDone?.();
      },
    });

    const lineDuration = safeDuration(0.15, prefersReduced);
    const flickerDuration = safeDuration(0.06, prefersReduced);
    const fadeDuration = safeDuration(0.3, prefersReduced);

    LINES.forEach((_, i) => {
      tl.from(
        `.boot-line-${i}`,
        { opacity: 0, duration: lineDuration },
        `+=${prefersReduced ? 0.05 : i === 0 ? 0.2 : 0.25}`
      );
    });

    if (!prefersReduced) {
      // CRT screen flicker
      tl.to(root.current, { opacity: 0, repeat: 3, yoyo: true, duration: flickerDuration }, "+=0.2");
    }

    tl.to(root.current, { autoAlpha: 0, duration: fadeDuration });
  }, { scope: root, dependencies: [visible, prefersReduced] });

  const handleSkip = () => {
    sessionStorage.setItem("booted", "1");
    setVisible(false);
    onDone?.();
  };

  if (!visible) return null;

  return (
    <div
      ref={root}
      onClick={handleSkip}
      className="fixed inset-0 z-[999] bg-[--void] flex items-center justify-center font-mono text-[--phosphor-400] cursor-pointer select-none"
      title="Click to skip boot sequence"
    >
      <div className="space-y-1 text-xs sm:text-sm p-4 max-w-md w-full">
        {LINES.map((line, i) => (
          <p key={i} className={`boot-line-${i} break-words`}>
            &gt;&gt; {line}
          </p>
        ))}
        <p className="text-[--ghost-400] text-2xs mt-8 text-center animate-pulse">
          [ CLICK ANYWHERE TO SKIP BOOT ]
        </p>
      </div>
    </div>
  );
}
