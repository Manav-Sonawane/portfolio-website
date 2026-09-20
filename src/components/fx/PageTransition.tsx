"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "./SmoothScroll";

const TITLES: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/skills": "Skills",
  "/projects": "Projects",
  "/experience": "Experience",
  "/contact": "Contact",
};

/**
 * Curtain transition. Intercepts internal link clicks, sweeps a panel up over the
 * page, navigates underneath it, then lifts it once the new route has committed.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const sub = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  };

  const lift = () => {
    if (failsafe.current) clearTimeout(failsafe.current);
    scrollTop();
    requestAnimationFrame(() => ScrollTrigger.refresh());
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(curtain.current, { y: 0, yPercent: 100, pointerEvents: "none" });
          busy.current = false;
        },
      })
      .to([label.current, sub.current], { yPercent: -100, opacity: 0, duration: 0.5, ease: "expo.in", stagger: 0.04 }, 0.05)
      .to(curtain.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, 0.2);
  };

  // New route committed → reveal it
  useEffect(() => {
    if (busy.current) lift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    // y: 0 is essential — gsap parses the inline translateY(100%) into pixels, which would stack on yPercent
    gsap.set(curtain.current, { y: 0, yPercent: 100 });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) {
        if (url.hash) return;
        e.preventDefault();
        getLenis()?.scrollTo(0);
        return;
      }
      e.preventDefault();
      if (busy.current) return;
      if (reduce) {
        router.push(href);
        return;
      }
      busy.current = true;

      const name = TITLES[url.pathname] ?? url.pathname.replace("/", "");
      if (label.current) label.current.textContent = name;
      if (sub.current) sub.current.textContent = `~${url.pathname}`;
      getLenis()?.stop();

      gsap
        .timeline({
          onComplete: () => {
            router.push(href);
            getLenis()?.start();
            // if the route never commits, don't trap the user under the curtain
            failsafe.current = setTimeout(() => busy.current && lift(), 5000);
          },
        })
        .set(curtain.current, { pointerEvents: "auto" })
        .set([label.current, sub.current], { yPercent: 100, opacity: 0 })
        .to(curtain.current, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
        .to([label.current, sub.current], { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.06 }, "-=0.35");
    };

    // capture phase: must run before next/link's own (React root) click handler navigates instantly
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div
      ref={curtain}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[900] flex flex-col items-center justify-center overflow-hidden bg-ink-2"
      style={{ transform: "translate3d(0, 100%, 0)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(124,108,255,0.28), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(198,255,77,0.1), transparent 70%)",
        }}
      />
      <div className="relative overflow-hidden">
        <span ref={label} className="display-xl block italic text-paper" />
      </div>
      <div className="relative mt-4 overflow-hidden">
        <span ref={sub} className="label block" />
      </div>
    </div>
  );
}
