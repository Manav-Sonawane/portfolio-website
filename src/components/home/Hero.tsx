"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Magnetic from "@/components/fx/Magnetic";
import Corners from "@/components/fx/Corners";
import AsciiRain from "@/components/fx/AsciiRain";
import TerminalWindow, { TermLine } from "@/components/fx/TerminalWindow";
import LocalTime from "@/components/fx/LocalTime";
import { introDelay } from "@/lib/motion-tokens";

const TERM: TermLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "manav sonawane — full-stack dev & ai builder", tone: "paper" },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "python · java · go · ts · react · fastapi · langgraph", tone: "mute" },
  { kind: "cmd", text: "git log --oneline -2" },
  { kind: "out", text: "a1f3c9e shipped citioyen (gcp cloud run)", tone: "signal" },
  { kind: "out", text: "c04d1aa mockup'26 — top 8 finish", tone: "signal" },
];

const READOUTS = [
  { k: "CGPA", v: "9.12", s: "B.E. IT · TSEC" },
  { k: "TEAM.LED", v: "07", s: "developers" },
  { k: "HACKATHON", v: "TOP 8", s: "MockUp'26" },
  { k: "STACK", v: "PY·JAVA·TS", s: "+ go · c++" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [rain, setRain] = useState(true);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const d = introDelay();
      gsap.from(".hero-frame", { opacity: 0, y: 30, duration: 1.2, ease: "expo.out", delay: d - 0.3 });
      gsap.from(".hero-read", { opacity: 0, y: 14, duration: 0.8, stagger: 0.08, ease: "expo.out", delay: d + 0.9 });

      // Frame drifts up and dims as you leave the hero
      gsap.to(".hero-frame", {
        yPercent: -6,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center px-4 pb-12 pt-[88px] sm:px-8 xl:px-16">
      <div className="hero-frame glass glass-static relative mx-auto w-full max-w-[1280px] !overflow-visible">
        <Corners />
        <div className="titlebar">
          <span className="live-dot !h-[6px] !w-[6px]" />
          <span className="text-paper">NOW.ONLINE</span>
          <span className="hidden text-dim sm:inline">/</span>
          <span className="hidden normal-case tracking-normal sm:inline">manav@portfolio:~$</span>
          <button
            type="button"
            onClick={() => setRain((r) => !r)}
            className="ml-auto flex items-center gap-2 transition-colors hover:text-paper"
            aria-pressed={rain}
            aria-label="Toggle ASCII rain"
          >
            ASCII.RAIN <span className={rain ? "text-signal" : "text-dim"}>[{rain ? "ON" : "OFF"}]</span>
          </button>
        </div>

        <div className="relative overflow-hidden">
          <AsciiRain enabled={rain} className="[mask-image:linear-gradient(90deg,#000_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.18)_62%,#000_100%)] opacity-40" />

          <div className="relative px-6 pb-10 pt-10 sm:px-12 sm:pt-14">
            <ScrollReveal intro y={14}>
              <p className="label mb-6 !text-signal">« FULL.STACK.AI.BUILDER</p>
            </ScrollReveal>

            <SplitReveal as="h1" intro className="display-xl">
              Full-stack developer
              <br />
              &amp; <em>AI builder.</em>
            </SplitReveal>

            <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <ScrollReveal intro delay={0.35}>
                  <p className="prose-lead max-w-xl">
                    Python, Java, JS/TS. Concurrency-safe backends, LLM agents and interfaces with a pulse — seeking hackathon teams, internships and
                    open-source collaboration.
                  </p>
                </ScrollReveal>

                <ScrollReveal intro delay={0.5} className="mt-7 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <Link href="/projects" className="btn btn-primary">
                      View work <ArrowUpRight size={14} weight="bold" className="arrow" />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link href="/contact" className="btn btn-ghost">
                      Get in touch
                    </Link>
                  </Magnetic>
                </ScrollReveal>

                <ScrollReveal intro delay={0.7} className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">
                  <span>
                    <span className="text-dim">Base</span>&nbsp; Mumbai, IN
                  </span>
                  <span>
                    <span className="text-dim">Local</span>&nbsp; <LocalTime className="text-paper" />
                  </span>
                  <span className="flex items-center gap-2 text-signal">
                    Scroll.Extended.Content <ArrowDown size={11} weight="bold" className="animate-bounce" />
                  </span>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-6">
                <TerminalWindow lines={TERM} intro title="zsh — 80×24" className="mx-auto w-full max-w-[560px] lg:ml-auto lg:mr-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {READOUTS.map((r, i) => (
            <div key={r.k} className={`hero-read px-6 py-4 sm:px-8 ${i > 0 ? "lg:border-l lg:border-white/10" : ""} ${i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}>
              <p className="label !text-[0.6rem]">{r.k}</p>
              <p className="font-display text-2xl leading-tight text-paper">{r.v}</p>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-dim">{r.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
