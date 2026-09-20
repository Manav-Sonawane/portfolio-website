"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { introDelay } from "@/lib/motion-tokens";

export interface TermLine {
  kind: "cmd" | "out";
  text: string;
  tone?: "signal" | "paper" | "mute";
}

const TONE = { signal: "text-signal", paper: "text-paper", mute: "text-mute" };

/** Glass terminal that types itself out — the site's nod to where it started. */
export default function TerminalWindow({
  lines,
  title = "manav@portfolio — zsh",
  className = "",
  intro = false,
}: {
  lines: TermLine[];
  title?: string;
  className?: string;
  intro?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-type]", root.current);
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root.current);
      const caret = root.current.querySelector<HTMLElement>("[data-caret]");
      els.forEach((el) => (el.textContent = ""));
      gsap.set(rows, { opacity: 0 });
      gsap.set(caret, { opacity: 0 });

      const tl = gsap.timeline({
        delay: intro ? introDelay(0.4) : 0,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      lines.forEach((line, i) => {
        const o = { n: 0 };
        const dur = line.kind === "cmd" ? Math.max(line.text.length * 0.035, 0.3) : 0.45;
        tl.set(rows[i], { opacity: 1 }, i === 0 ? 0 : ">+0.22").to(o, {
          n: line.text.length,
          duration: dur,
          ease: "none",
          onUpdate: () => {
            els[i].textContent = line.text.slice(0, Math.round(o.n));
          },
        });
      });
      tl.set(caret, { opacity: 1 });
    },
    { dependencies: [reduced] }
  );

  return (
    <div ref={root} className={`glass glass-static font-mono ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[0.7rem] tracking-wide text-mute">{title}</span>
      </div>
      <div className="space-y-1.5 p-5 text-[0.8rem] leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <div key={i} data-row className="flex gap-2">
            {line.kind === "cmd" ? <span className="select-none text-signal">❯</span> : <span className="select-none text-transparent">❯</span>}
            <span data-type className={line.kind === "cmd" ? "text-paper" : TONE[line.tone ?? "mute"]}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="select-none text-signal">❯</span>
          <span data-caret className="cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
}
