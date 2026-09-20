"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Dual-layer cursor: a precise dot and a lagging ring that morphs by context.
 * Mark elements with data-cursor="view" | "drag" | "copy" for labelled states.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const setMode = (mode: "idle" | "link" | "label", text = "") => {
      if (label.current) label.current.textContent = text;
      if (mode === "idle") {
        gsap.to(ring.current, { width: 38, height: 38, backgroundColor: "rgba(198,255,77,0)", borderColor: "rgba(241,238,230,0.4)", duration: 0.45, ease: "expo.out" });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
      } else if (mode === "link") {
        gsap.to(ring.current, { width: 64, height: 64, backgroundColor: "rgba(198,255,77,0.12)", borderColor: "rgba(198,255,77,0.9)", duration: 0.45, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0.4, duration: 0.3 });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
      } else {
        gsap.to(ring.current, { width: 96, height: 96, backgroundColor: "rgba(198,255,77,0.95)", borderColor: "rgba(198,255,77,1)", duration: 0.5, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0, duration: 0.3 });
        gsap.to(label.current, { opacity: 1, duration: 0.3, delay: 0.1 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.("[data-cursor], a, button, [role='button'], summary, input, textarea");
      if (!el) return setMode("idle");
      const custom = el.getAttribute("data-cursor");
      if (custom) setMode("label", custom);
      else setMode("link");
    };
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.25 });
    const onEnter = () => visible && gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.25 });
    const onDown = () => gsap.to(ring.current, { scale: 0.88, duration: 0.2 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.5)" });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border backdrop-blur-[1px]"
        style={{ width: 38, height: 38, borderColor: "rgba(241,238,230,0.4)", opacity: 0 }}
      >
        <span ref={label} className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black opacity-0" />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-signal"
        style={{ opacity: 0 }}
      />
    </>
  );
}
