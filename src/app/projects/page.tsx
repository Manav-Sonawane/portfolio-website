"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GithubLogo, Plus } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import BigCTA from "@/components/BigCTA";
import { projects, type Project } from "@/lib/projects";

function Row({ p, index, open, onToggle }: { p: Project; index: number; open: boolean; onToggle: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  // Frozen at mount: after this, GSAP owns the panel height (React must never re-apply it)
  const [initialHeight] = useState(open ? "auto" : 0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = panel.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(el, {
      height: open ? "auto" : 0,
      duration: reduce ? 0 : 0.9,
      ease: "expo.inOut",
      onComplete: () => ScrollTrigger.refresh(),
    });
    if (open && !reduce) {
      gsap.fromTo(el.querySelectorAll("[data-in]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, delay: 0.25 });
    }
  }, [open]);

  return (
    <div className="group/row relative border-b border-white/10" style={{ ["--accent" as string]: p.accent }}>
      {/* hover wash */}
      <div
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 opacity-0 transition-all duration-700 group-hover/row:scale-x-100 group-hover/row:opacity-100"
        style={{ background: `linear-gradient(90deg, ${p.accent}18, transparent 70%)`, transitionTimingFunction: "var(--ease-expo)" }}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-cursor={open ? "close" : "open"}
        className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 text-left sm:gap-x-8 md:grid-cols-[4rem_1.4fr_1fr_auto_auto] md:py-9"
      >
        <span className="font-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</span>
        <span className="display-md transition-transform duration-700 group-hover/row:translate-x-3" style={{ transitionTimingFunction: "var(--ease-expo)" }}>
          {p.title}
        </span>
        <span className="hidden text-mute md:block">{p.tagline}</span>
        <span className="chip hidden lg:inline-flex" style={{ color: p.accent, borderColor: `${p.accent}44` }}>
          {p.category}
        </span>
        <span
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover/row:border-[var(--accent)]"
          style={{ transform: open ? "rotate(45deg)" : "none", background: open ? p.accent : "transparent", color: open ? "#000" : "inherit" }}
        >
          <Plus size={18} weight="light" />
        </span>
      </button>

      <div ref={panel} className="relative overflow-hidden" style={{ height: initialHeight }}>
        <div className="grid gap-10 pb-12 pt-2 md:grid-cols-[4rem_1fr] md:gap-x-8">
          <span className="hidden md:block" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <p data-in className="text-mute md:hidden">
                {p.tagline}
              </p>
              {p.highlights.map((h, i) => (
                <p key={i} data-in className="flex gap-4 text-lg leading-relaxed text-paper/90">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {h}
                </p>
              ))}
            </div>
            <div className="space-y-6 lg:col-span-5">
              <div data-in>
                <p className="label mb-3">Role</p>
                <p className="font-display text-2xl">{p.role}</p>
              </div>
              <div data-in>
                <p className="label mb-3">Stack</p>
                <ul className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-in className="flex flex-wrap gap-3 pt-2">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <GithubLogo size={15} weight="bold" /> Source
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Live demo <ArrowUpRight size={14} weight="bold" className="arrow" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0].slug);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 sm:px-10 md:pt-44">
        <ScrollReveal intro y={14}>
          <p className="label mb-8">~/projects</p>
        </ScrollReveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitReveal as="h1" intro className="display-xl max-w-[10ch]">
            Selected <em>work.</em>
          </SplitReveal>
          <ScrollReveal intro delay={0.4}>
            <p className="prose-lead max-w-sm">
              {projects.length} projects — AI agents, real-time systems, hackathon sprints. Open any row for the story and the stack.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10">
        <ScrollReveal>
          <div className="border-t border-white/10">
            {projects.map((p, i) => (
              <Row key={p.slug} p={p} index={i} open={openSlug === p.slug} onToggle={() => setOpenSlug((s) => (s === p.slug ? null : p.slug))} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <BigCTA />
    </main>
  );
}
