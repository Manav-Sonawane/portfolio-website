"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Corners from "@/components/fx/Corners";

const BOOT = [
  ["mounting /dev/manav", "OK"],
  ["loading gsap · lenis · next.js", "OK"],
  ["compiling projects [7]", "OK"],
  ["linking ai agents", "OK"],
  ["opening portfolio", "READY"],
];

/**
 * Once-per-session boot screen. Visibility is gated by html.preloading (set by an inline
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
        .from(".pl-fade", { opacity: 0, y: 10, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.2)
        .from(".pl-line", { opacity: 0, x: -12, duration: 0.35, stagger: 0.3, ease: "power2.out" }, 0.35)
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
      style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(150,180,230,0.03) 0 1px, transparent 1px 5px), radial-gradient(90% 70% at 50% 0%, #12234a, #070b13 70%)" }}
      aria-hidden
    >
      <div className="pl-inner pl-fade flex items-center justify-between label">
        <span>Portfolio — 2026</span>
        <span>Mumbai, IN</span>
      </div>

      <div className="pl-inner grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="overflow-hidden">
            <div className="pl-word display-xl">Manav</div>
          </div>
          <div className="overflow-hidden">
            <div className="pl-word display-xl">
              <em>Sonawane</em>
            </div>
          </div>
          <p className="pl-fade mt-6 label">Full-stack developer &amp; AI builder</p>
        </div>

        <div className="relative border border-white/10 bg-white/[0.02] p-5 font-mono text-[0.72rem] leading-7">
          <Corners />
          {BOOT.map(([text, status]) => (
            <p key={text} className="pl-line flex justify-between gap-6 text-mute">
              <span>
                <span className="text-signal">&gt;</span> {text}
              </span>
              <span className={status === "READY" ? "text-ok" : "text-signal"}>[ {status} ]</span>
            </p>
          ))}
        </div>
      </div>

      <div className="pl-inner">
        <div className="pl-fade mb-4 flex items-end justify-between">
          <span className="label">Loading experience</span>
          <span ref={num} className="font-display text-6xl leading-none text-paper sm:text-8xl" style={{ fontVariantNumeric: "tabular-nums" }}>
            000
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-signal shadow-[0_0_10px_var(--signal)]" />
        </div>
      </div>
    </div>
  );
}
