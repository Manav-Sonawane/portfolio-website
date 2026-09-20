"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Once-per-session intro. Visibility is gated by html.preloading (set by an inline
 * script in <head> before first paint), so returning visitors never see a flash.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("preloading")) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        html.classList.remove("preloading");
        html.dataset.ready = "1";
        try {
          sessionStorage.setItem("booted", "1");
        } catch {}
        window.dispatchEvent(new Event("preloader:done"));
      };

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      if (reduce) {
        tl.to(root.current, { autoAlpha: 0, duration: 0.3 });
        return;
      }

      tl.from(".pl-word", { yPercent: 115, duration: 1.1, stagger: 0.1, ease: "expo.out" }, 0.1)
        .from(".pl-fade", { opacity: 0, y: 12, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3)
        .to(
          counter,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0
        )
        .to(bar.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
        .to(".pl-inner", { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" }, 2.0)
        .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, 2.1);

      const skip = () => tl.timeScale(5);
      root.current?.addEventListener("click", skip);
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[1000] cursor-pointer select-none flex-col justify-between bg-ink p-6 sm:p-10"
      aria-hidden
    >
      <div className="pl-inner pl-fade flex items-center justify-between label">
        <span>Portfolio — 2026</span>
        <span>Mumbai, IN</span>
      </div>

      <div className="pl-inner">
        <div className="overflow-hidden">
          <div className="pl-word display-xl">Manav</div>
        </div>
        <div className="overflow-hidden">
          <div className="pl-word display-xl">
            <em className="text-signal">Sonawane</em>
          </div>
        </div>
        <p className="pl-fade mt-6 label">Full-stack developer &amp; AI builder</p>
      </div>

      <div className="pl-inner">
        <div className="pl-fade mb-4 flex items-end justify-between">
          <span className="label">Loading experience</span>
          <span ref={num} className="font-display text-6xl leading-none sm:text-8xl" style={{ fontVariantNumeric: "tabular-nums" }}>
            000
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </div>
  );
}
