"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;
export const getLenis = () => instance;

/** Lenis inertial scrolling, driven by GSAP's ticker so ScrollTrigger stays frame-perfect. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Hold scroll while the preloader is up
    if (document.documentElement.classList.contains("preloading")) lenis.stop();
    const resume = () => lenis.start();
    window.addEventListener("preloader:done", resume);

    return () => {
      window.removeEventListener("preloader:done", resume);
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
