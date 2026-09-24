"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GitBranch } from "@phosphor-icons/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import LocalTime from "@/components/fx/LocalTime";

const FILES: Record<string, string> = {
  "/": "README.md",
  "/about": "about.md",
  "/skills": "skills.json",
  "/projects": "projects/",
  "/experience": "experience.log",
  "/contact": "contact.sh",
};

export function openPalette() {
  window.dispatchEvent(new Event("palette:request"));
}

/**
 * Persistent HUD chrome: Neovim-style statusline (mode · file · branch · scroll · clock),
 * viewport corner brackets and vertical edge readouts. Numbers are written straight to
 * the DOM from a ScrollTrigger so scrolling never causes React renders.
 */
export default function Hud() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"NORMAL" | "INSERT">("NORMAL");
  const file = FILES[pathname] ?? pathname.replace("/", "");

  useEffect(() => {
    const open = () => setMode("INSERT");
    const close = () => setMode("NORMAL");
    window.addEventListener("palette:open", open);
    window.addEventListener("palette:close", close);
    return () => {
      window.removeEventListener("palette:open", open);
      window.removeEventListener("palette:close", close);
    };
  }, []);

  useGSAP(
    () => {
      const pct = root.current?.querySelectorAll<HTMLElement>("[data-pct]");
      const ln = root.current?.querySelector<HTMLElement>("[data-ln]");
      const bar = root.current?.querySelectorAll<HTMLElement>("[data-bar]");
      const write = (p: number, y: number) => {
        const v = Math.round(p * 100);
        pct?.forEach((el) => (el.textContent = String(v).padStart(3, "0")));
        if (ln) ln.textContent = `${Math.floor(y / 24) + 1}:1`;
        bar?.forEach((el) => (el.style.transform = `scaleX(${p})`));
      };
      write(0, 0);
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => write(self.progress, self.scroll()),
        onRefresh: (self) => write(self.progress, self.scroll()),
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [pathname] }
  );

  useGSAP(
    () => {
      gsap.from(".hud-in", { opacity: 0, y: 12, duration: 1, ease: "expo.out", delay: 2.6 });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* Scroll progress hairline (pinned under the nav) */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[57px] z-[499] h-px bg-transparent">
        <div data-bar className="h-px origin-left scale-x-0 bg-signal shadow-[0_0_8px_var(--signal)]" />
      </div>

      {/* Viewport corner brackets */}
      <div aria-hidden className="hud-in pointer-events-none fixed inset-0 z-[400] hidden md:block">
        <span className="absolute bottom-[42px] left-4 h-4 w-4 border-b border-l border-white/25" />
        <span className="absolute bottom-[42px] right-4 h-4 w-4 border-b border-r border-white/25" />
      </div>

      {/* Vertical edge readouts */}
      <div aria-hidden className="hud-in pointer-events-none fixed inset-y-0 left-0 z-[400] hidden w-10 items-center justify-center xl:flex">
        <span className="label !text-[0.6rem] !tracking-[0.35em] text-dim [writing-mode:vertical-rl] [transform:rotate(180deg)]">
          MANAV.SONAWANE <span className="text-signal">{"//"}</span> PORTFOLIO.2026
        </span>
      </div>
      <div aria-hidden className="hud-in pointer-events-none fixed inset-y-0 right-0 z-[400] hidden w-10 items-center justify-center xl:flex">
        <span className="label !text-[0.6rem] !tracking-[0.35em] text-dim [writing-mode:vertical-rl]">
          SCROLL <span data-pct className="text-signal">000</span>
        </span>
      </div>

      {/* Statusline */}
      <div className="hud-in fixed inset-x-0 bottom-0 z-[600] flex h-[var(--status-h)] items-stretch border-t border-white/10 bg-ink/90 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute backdrop-blur-md">
        <span className={`flex items-center px-3 font-bold text-[#04121a] ${mode === "NORMAL" ? "bg-signal" : "bg-amber"}`}>{mode}</span>
        <span className="hidden items-center gap-1.5 px-3 text-paper/80 sm:flex">
          <GitBranch size={12} weight="bold" /> main
        </span>
        <span className="flex items-center border-l border-white/10 px-3 normal-case tracking-normal text-paper">~/{file}</span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={openPalette}
          className="hidden items-center gap-2 border-l border-white/10 px-3 transition-colors hover:bg-white/5 hover:text-paper md:flex"
          aria-label="Open command palette"
        >
          <span className="kbd">Ctrl</span>
          <span className="kbd">K</span>
          <span className="hidden lg:inline">commands</span>
        </button>
        <span className="hidden items-center border-l border-white/10 px-3 md:flex">utf-8</span>
        <span className="hidden items-center border-l border-white/10 px-3 sm:flex">
          Ln&nbsp;<span data-ln>1:1</span>
        </span>
        <span className="flex items-center border-l border-white/10 px-3 text-paper">
          <span data-pct>000</span>%
        </span>
        <span className="hidden items-center border-l border-white/10 px-3 sm:flex">
          <LocalTime />
        </span>
      </div>
    </div>
  );
}
