"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { navItems } from "@/lib/profile";
import { getLenis } from "@/components/fx/SmoothScroll";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const shell = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Slide the "magic line" under a link
  const moveTo = useCallback((el: HTMLElement | null, immediate = false) => {
    if (!el || !indicator.current) return;
    gsap.to(indicator.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: immediate ? 0 : 0.6,
      ease: "expo.out",
      overwrite: true,
    });
  }, []);

  const placeOnActive = useCallback(
    (immediate = false) => {
      const active = list.current?.querySelector<HTMLElement>("[data-active='true']") ?? null;
      if (active) moveTo(active, immediate);
      else gsap.to(indicator.current, { opacity: 0, duration: 0.3 });
    },
    [moveTo]
  );

  useEffect(() => {
    placeOnActive();
  }, [pathname, placeOnActive]);

  useEffect(() => {
    const onResize = () => placeOnActive(true);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => placeOnActive(true));
    return () => window.removeEventListener("resize", onResize);
  }, [placeOnActive]);

  // Hide on scroll down, return on scroll up
  useGSAP(() => {
    gsap.from(shell.current, { yPercent: -160, opacity: 0, duration: 1.2, ease: "expo.out", delay: 2.4 });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const hide = self.direction === 1 && self.scroll() > 140 && !openRef.current;
        gsap.to(shell.current, { yPercent: hide ? -170 : 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      },
    });
  });

  // Fullscreen mobile menu
  useGSAP(
    () => {
      openRef.current = open;
      const links = ".menu-link";
      if (open) {
        getLenis()?.stop();
        gsap.set(menu.current, { autoAlpha: 1 });
        gsap.fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.25 });
        gsap.fromTo(".menu-fade", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55, stagger: 0.08 });
      } else if (menu.current && gsap.getProperty(menu.current, "visibility") !== "hidden") {
        getLenis()?.start();
        gsap.to(menu.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: () => void gsap.set(menu.current, { autoAlpha: 0 }) });
      }
    },
    { dependencies: [open], scope: menu }
  );

  return (
    <>
      <div ref={shell} className="pointer-events-none fixed inset-x-0 top-0 z-[500] flex justify-center px-4 pt-4">
        <nav
          className="pointer-events-auto flex w-full max-w-[1080px] items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/55 py-2 pl-2 pr-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:pl-3"
          aria-label="Primary"
        >
          <Link href="/" className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-3" aria-label="Manav Sonawane — home">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 font-display text-xl italic leading-none text-signal transition-transform duration-500 group-hover:rotate-[360deg]">
              M
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[0.82rem] font-medium tracking-tight">Manav Sonawane</span>
              <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mute">
                <span className="live-dot !h-[5px] !w-[5px]" /> Available
              </span>
            </span>
          </Link>

          <ul ref={list} onMouseLeave={() => placeOnActive()} className="relative hidden items-center lg:flex">
            <span ref={indicator} className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-white/[0.09] opacity-0" />
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active}
                    onMouseEnter={(e) => moveTo(e.currentTarget)}
                    className={`relative block rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                      active ? "text-paper" : "text-mute hover:text-paper"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="/Resume_Manav.docx" download className="btn btn-primary btn-sm hidden sm:inline-flex">
              Resume <ArrowDown size={13} weight="bold" className="arrow" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-12 place-items-center rounded-full border border-white/12 lg:hidden"
            >
              <span className="relative block h-2.5 w-5">
                <span className={`absolute left-0 h-px w-full bg-paper transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-full bg-paper transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile / tablet menu */}
      <div ref={menu} className="invisible fixed inset-0 z-[480] flex flex-col justify-between bg-ink/[0.97] px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <Link href={item.href} onClick={() => setOpen(false)} className="menu-link flex items-baseline gap-4 py-1.5">
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                <span className={`display-lg ${isActive(item.href) ? "italic text-signal" : ""}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu-fade flex items-center justify-between">
          <span className="label">sonawanemanav96@gmail.com</span>
          <a href="/Resume_Manav.docx" download className="btn btn-primary btn-sm">
            Resume <ArrowDown size={13} weight="bold" className="arrow" />
          </a>
        </div>
      </div>
    </>
  );
}
