"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { navItems } from "@/lib/profile";
import { getLenis } from "@/components/fx/SmoothScroll";
import { openPalette } from "@/components/Hud";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Slide the underline under a link
  const moveTo = useCallback((el: HTMLElement | null, immediate = false) => {
    if (!el || !indicator.current) return;
    gsap.to(indicator.current, {
      x: el.offsetLeft + 16,
      width: el.offsetWidth - 32,
      opacity: 1,
      duration: immediate ? 0 : 0.55,
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

  useGSAP(() => {
    gsap.from(shell.current, { yPercent: -100, opacity: 0, duration: 1.1, ease: "expo.out", delay: 2.4 });
  });

  // Fullscreen mobile menu
  useGSAP(
    () => {
      if (open) {
        getLenis()?.stop();
        gsap.set(menu.current, { autoAlpha: 1 });
        gsap.fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(".menu-link", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.25 });
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
      <header
        ref={shell}
        className="fixed inset-x-0 top-0 z-[500] flex h-[57px] items-center justify-between gap-4 border-b border-white/10 bg-ink/70 px-4 backdrop-blur-xl sm:px-8"
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Manav Sonawane — home">
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-signal/60">
            <span className="absolute inset-[3px] rounded-full border border-white/25 transition-transform duration-700 group-hover:rotate-180" />
            <span className="font-display text-sm font-bold text-signal">M</span>
          </span>
          <span className="font-display text-[0.95rem] font-bold uppercase tracking-[0.16em]">
            Manav<span className="text-mute">.Sonawane</span>
            <span className="text-signal">{"//"}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul ref={list} onMouseLeave={() => placeOnActive()} className="relative flex items-center">
            <span ref={indicator} className="pointer-events-none absolute -bottom-[19px] left-0 h-px bg-signal opacity-0 shadow-[0_0_8px_var(--signal)]" />
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active}
                    onMouseEnter={(e) => moveTo(e.currentTarget)}
                    className={`block px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      active ? "text-paper" : "text-mute hover:text-paper"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-mute transition-colors hover:text-paper xl:flex"
            aria-label="Open command palette"
          >
            <span className="live-dot !h-[6px] !w-[6px]" /> Now.Online
            <span className="kbd ml-1">Ctrl</span>
            <span className="kbd">K</span>
          </button>
          <a href="/Resume_Manav.docx" download className="btn btn-primary btn-sm hidden sm:inline-flex">
            Resume <ArrowDown size={12} weight="bold" className="arrow" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-11 place-items-center border border-white/15 lg:hidden"
          >
            <span className="relative block h-2.5 w-5">
              <span className={`absolute left-0 h-px w-full bg-paper transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-paper transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        ref={menu}
        className="invisible fixed inset-0 z-[480] flex flex-col justify-between bg-ink/[0.97] px-6 pb-14 pt-28 backdrop-blur-2xl lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <Link href={item.href} onClick={() => setOpen(false)} className="menu-link flex items-baseline gap-4 py-1.5">
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                <span className={`display-lg ${isActive(item.href) ? "!text-signal" : ""}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu-fade flex items-center justify-between gap-3">
          <span className="label truncate">sonawanemanav96@gmail.com</span>
          <a href="/Resume_Manav.docx" download className="btn btn-primary btn-sm">
            Resume <ArrowDown size={12} weight="bold" className="arrow" />
          </a>
        </div>
      </div>
    </>
  );
}
