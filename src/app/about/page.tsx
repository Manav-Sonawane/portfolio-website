"use client";

import Image from "next/image";
import { useRef } from "react";
import { Certificate, GraduationCap } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import ScrubText from "@/components/fx/ScrubText";
import GlassPanel from "@/components/fx/GlassPanel";
import Corners from "@/components/fx/Corners";
import TerminalWindow, { TermLine } from "@/components/fx/TerminalWindow";
import CountUp from "@/components/fx/CountUp";
import BigCTA from "@/components/BigCTA";
import { profile } from "@/lib/profile";

const PROFILE_TERM: TermLine[] = [
  { kind: "cmd", text: "cat system_profile.txt" },
  { kind: "out", text: "role       full-stack / ai builder", tone: "paper" },
  { kind: "out", text: "focus      apis · llm agents · scalable systems", tone: "paper" },
  { kind: "out", text: "exp        internships · hackathons · tech teams", tone: "paper" },
  { kind: "out", text: "leadership yes (led 7 devs)", tone: "paper" },
  { kind: "out", text: "location   mumbai, india", tone: "paper" },
  { kind: "cmd", text: "echo $STATUS" },
  { kind: "out", text: "designing systems. shipping code.", tone: "signal" },
];

// README structure: [heading, paragraph index]
const SECTIONS: [string, number][] = [
  ["education", 0],
  ["what i do", 1],
  ["stack", 2],
  ["beyond code", 3],
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".portrait-mask", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", delay: 0.7 });
      gsap.fromTo(".portrait-img", { scale: 1.5 }, { scale: 1.22, duration: 2, ease: "expo.out", delay: 0.7 });
      // A scanner line sweeps the photo, forever
      gsap.fromTo(".scanner", { top: "0%" }, { top: "100%", duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-32 sm:px-10 md:pt-40">
        <ScrollReveal intro y={14}>
          <p className="label mb-6 !text-signal">~/about.md</p>
        </ScrollReveal>
        <SplitReveal as="h1" intro className="display-xl max-w-[26ch]">
          Student by degree, <em>builder</em> by habit.
        </SplitReveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-12">
        {/* Dossier */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <ScrollReveal intro delay={0.2}>
              <div className="glass glass-static relative !overflow-visible">
                <Corners />
                <div className="titlebar">
                  <span className="text-signal">SUBJECT.ID</span>
                  <span className="ml-auto">MS-2026</span>
                </div>
                <div className="portrait-mask hud-scan relative aspect-[4/5] overflow-hidden bg-ink-3">
                  <Image
                    src="/manav.jpg"
                    alt="Manav Sonawane"
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="portrait-img object-cover"
                    style={{ objectPosition: "50% 14%", transformOrigin: "50% 12%" }}
                  />
                  <div className="absolute inset-0 mix-blend-color" style={{ background: "linear-gradient(180deg, rgba(86,216,255,0.55), rgba(20,40,90,0.7))" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="scanner absolute inset-x-0 h-px bg-signal shadow-[0_0_14px_2px_rgba(86,216,255,0.7)]" />
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-t border-white/10 p-4 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
                  <dt className="text-dim">Name</dt>
                  <dd className="text-paper">Manav Sonawane</dd>
                  <dt className="text-dim">Base</dt>
                  <dd className="text-paper">Mumbai, IN</dd>
                  <dt className="text-dim">Status</dt>
                  <dd className="flex items-center gap-2 text-ok">
                    <span className="live-dot !h-[6px] !w-[6px]" /> Open.to.work
                  </dd>
                </dl>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Editor buffer */}
        <div className="lg:col-span-8">
          <ScrollReveal intro delay={0.35}>
            <div className="glass glass-static">
              <div className="flex items-stretch border-b border-white/10 bg-white/[0.03] font-mono text-[0.7rem]">
                <span className="flex items-center gap-2 border-r border-white/10 border-t-2 border-t-signal bg-ink/60 px-4 py-2.5 text-paper">
                  <span className="text-signal">◆</span> about.md <span className="text-dim">[+]</span>
                </span>
                <span className="hidden items-center px-4 text-dim sm:flex">skills.json</span>
                <span className="hidden items-center px-4 text-dim sm:flex">experience.log</span>
              </div>

              <div className="editor px-2 py-5 sm:px-4">
                <div className="ed-line">
                  <p className="font-mono text-[1.05rem] font-bold leading-[1.7] text-signal">
                    <span className="text-dim"># </span>about
                  </p>
                </div>
                <div className="ed-line" />

                {SECTIONS.map(([heading, idx]) => (
                  <div key={heading}>
                    <div className="ed-line">
                      <p className="font-mono text-[0.95rem] font-medium leading-[1.7] text-amber">
                        <span className="text-dim">## </span>
                        {heading}
                      </p>
                    </div>
                    <div className="ed-line">
                      <ScrubText className="pr-2 text-[1.05rem] leading-[1.7] text-paper sm:pr-6">{profile.about[idx]}</ScrubText>
                    </div>
                    <div className="ed-line" />
                  </div>
                ))}

                <div className="ed-line">
                  <p className="font-mono text-[0.85rem] leading-[1.7] text-dim">{"<!-- EOF — thanks for reading -->"}</p>
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="ed-tilde leading-[1.785rem]" aria-hidden />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">
                <span>markdown</span>
                <span>utf-8 · lf</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bento */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10">
        <ScrollReveal stagger={0.1} y={50} className="grid gap-4 md:grid-cols-12">
          <GlassPanel className="flex flex-col justify-between p-8 md:col-span-5">
            <GraduationCap size={28} weight="light" className="text-signal" />
            <div className="mt-14">
              <p className="label">{profile.years}</p>
              <p className="display-md mt-3 normal-case">{profile.degree}</p>
              <p className="mt-2 text-mute">{profile.school}, Bandra</p>
              <p className="mt-8 font-display text-7xl leading-none text-signal">
                <CountUp target={profile.cgpa} decimals={2} />
                <span className="ml-3 font-mono text-xs uppercase tracking-[0.14em] text-mute">CGPA</span>
              </p>
            </div>
          </GlassPanel>

          <div className="md:col-span-7">
            <TerminalWindow lines={PROFILE_TERM} title="system_profile.txt" className="h-full" />
          </div>

          <GlassPanel className="p-8 md:col-span-12">
            <p className="label mb-6 flex items-center gap-2">
              <Certificate size={15} weight="bold" /> Credentials &amp; community
            </p>
            <ul className="grid gap-px overflow-hidden rounded-[2px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {profile.credentials.map((c) => (
                <li key={c.title} className="bg-ink-2/90 p-6 transition-colors duration-500 hover:bg-ink-3">
                  <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide">{c.title}</p>
                  <p className="label mt-2 !text-signal">{c.sub}</p>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </ScrollReveal>
      </section>

      <BigCTA />
    </main>
  );
}
