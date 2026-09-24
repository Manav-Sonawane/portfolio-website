"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CaretDown, FileText, GithubLogo } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Corners from "@/components/fx/Corners";
import BigCTA from "@/components/BigCTA";
import { projects } from "@/lib/projects";

const fileName = (slug: string) => `${slug.toLowerCase()}.md`;
const num = (i: number) => `PRJ.${String(i + 1).padStart(3, "0")}`;

export default function Projects() {
  const [index, setIndex] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const p = projects[index];

  // j / k / arrows walk the explorer, like a real tree
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.matches?.("input, textarea, [contenteditable]") || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, projects.length - 1));
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Re-type the buffer whenever the open file changes
  useEffect(() => {
    if (!body.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = body.current.querySelectorAll(".ed-line, .ed-tilde");
    const tween = gsap.fromTo(lines, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.55, stagger: 0.035, ease: "expo.out" });
    return () => {
      tween.kill();
    };
  }, [index]);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-32 sm:px-10 md:pt-40">
        <ScrollReveal intro y={14}>
          <p className="label mb-6 !text-signal">~/projects/</p>
        </ScrollReveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitReveal as="h1" intro className="display-xl max-w-[12ch]">
            Selected <em>work.</em>
          </SplitReveal>
          <ScrollReveal intro delay={0.4}>
            <p className="prose-lead max-w-sm">
              {projects.length} projects — AI agents, real-time systems, hackathon sprints. Pick a file, or press <span className="kbd">j</span>{" "}
              <span className="kbd">k</span> to walk the tree.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-10">
        <ScrollReveal>
          <div className="glass glass-static relative !overflow-visible">
            <Corners />
            <div className="grid overflow-hidden lg:grid-cols-[320px_minmax(0,1fr)]">
              {/* Explorer */}
              <aside className="border-b border-white/10 bg-white/[0.02] lg:border-b-0 lg:border-r">
                <div className="titlebar">explorer</div>
                <p className="flex items-center gap-2 px-4 pb-1 pt-3 font-mono text-[0.72rem] text-mute">
                  <CaretDown size={11} weight="bold" /> projects/
                </p>
                <ul className="flex gap-1 overflow-x-auto px-2 pb-3 lg:block lg:overflow-visible lg:pb-4" role="listbox" aria-label="Projects">
                  {projects.map((proj, i) => {
                    const active = i === index;
                    return (
                      <li key={proj.slug} className="shrink-0 lg:min-w-0 lg:shrink">
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => setIndex(i)}
                          data-cursor="open"
                          className={`group flex w-full items-center gap-2.5 rounded-[2px] border-l-2 px-3 py-2 text-left font-mono text-[0.78rem] transition-colors ${
                            active ? "border-signal bg-signal/12 text-paper" : "border-transparent text-mute hover:bg-white/5 hover:text-paper"
                          }`}
                        >
                          <FileText size={14} className={active ? "text-signal" : "text-dim group-hover:text-mute"} />
                          <span className="min-w-0 truncate">{fileName(proj.slug)}</span>
                          <span className="ml-auto hidden text-[0.6rem] tracking-widest text-dim lg:inline">{num(i)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="hidden border-t border-white/10 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim lg:block">
                  <span className="kbd">j</span> <span className="kbd">k</span> navigate
                </p>
              </aside>

              {/* Editor */}
              <div className="min-w-0">
                <div className="flex items-stretch border-b border-white/10 bg-white/[0.03] font-mono text-[0.7rem]">
                  <span className="flex items-center gap-2 border-r border-white/10 border-t-2 bg-ink/60 px-4 py-2.5 text-paper" style={{ borderTopColor: p.accent }}>
                    <span style={{ color: p.accent }}>◆</span> {fileName(p.slug)}
                  </span>
                  <span className="ml-auto hidden items-center px-4 text-dim sm:flex">{num(index)}</span>
                </div>

                <div ref={body} key={p.slug} className="editor min-h-[520px] px-2 py-5 sm:px-4">
                  <div className="ed-line">
                    <h2 className="font-mono text-[1.15rem] font-bold leading-[1.7]" style={{ color: p.accent }}>
                      <span className="text-dim"># </span>
                      {p.title}
                    </h2>
                  </div>
                  <div className="ed-line">
                    <p className="text-[1.05rem] leading-[1.7] text-mute">
                      <span className="text-dim">&gt; </span>
                      {p.tagline}
                    </p>
                  </div>
                  <div className="ed-line" />

                  <div className="ed-line">
                    <p className="font-mono text-[0.95rem] font-medium leading-[1.7] text-amber">
                      <span className="text-dim">## </span>meta
                    </p>
                  </div>
                  <div className="ed-line">
                    <p className="font-mono text-[0.85rem] leading-[1.7]">
                      <span className="text-signal">role</span>
                      <span className="text-dim">:     </span>
                      <span className="text-paper">{p.role}</span>
                    </p>
                  </div>
                  <div className="ed-line">
                    <p className="font-mono text-[0.85rem] leading-[1.7]">
                      <span className="text-signal">category</span>
                      <span className="text-dim">: </span>
                      <span className="text-paper">{p.category}</span>
                    </p>
                  </div>
                  <div className="ed-line" />

                  <div className="ed-line">
                    <p className="font-mono text-[0.95rem] font-medium leading-[1.7] text-amber">
                      <span className="text-dim">## </span>highlights
                    </p>
                  </div>
                  {p.highlights.map((h, i) => (
                    <div key={i} className="ed-line">
                      <p className="pr-3 text-[1.05rem] leading-[1.7] text-paper sm:pr-8">
                        <span className="text-signal">- </span>
                        {h}
                      </p>
                    </div>
                  ))}
                  <div className="ed-line" />

                  <div className="ed-line">
                    <p className="font-mono text-[0.95rem] font-medium leading-[1.7] text-amber">
                      <span className="text-dim">## </span>stack
                    </p>
                  </div>
                  <div className="ed-line">
                    <ul className="flex flex-wrap gap-2 py-1">
                      {p.tech.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ed-line" />

                  <div className="ed-line">
                    <p className="font-mono text-[0.95rem] font-medium leading-[1.7] text-amber">
                      <span className="text-dim">## </span>links
                    </p>
                  </div>
                  <div className="ed-line">
                    <div className="flex flex-wrap gap-3 py-1">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <GithubLogo size={14} weight="bold" /> Source
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                          Live demo <ArrowUpRight size={13} weight="bold" className="arrow" />
                        </a>
                      )}
                    </div>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="ed-tilde leading-[1.785rem]" aria-hidden />
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">
                  <span>markdown</span>
                  <span>
                    {index + 1}/{projects.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <BigCTA />
    </main>
  );
}
