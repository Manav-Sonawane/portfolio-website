"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { introDelay } from "@/lib/motion-tokens";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Magnetic from "@/components/fx/Magnetic";
import TerminalWindow, { TermLine } from "@/components/fx/TerminalWindow";
import LocalTime from "@/components/fx/LocalTime";

const TERM: TermLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "manav sonawane — full-stack dev & ai builder", tone: "paper" },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "python · java · go · ts · react · fastapi · langgraph", tone: "mute" },
  { kind: "cmd", text: "git log --oneline -2" },
  { kind: "out", text: "a1f3c9e shipped citioyen (gcp cloud run)", tone: "signal" },
  { kind: "out", text: "c04d1aa mockup'26 — top 8 finish", tone: "signal" },
];

const CHIPS = [
  { label: "CGPA", value: "9.12", pos: "-right-2 -top-8 sm:-right-8", delay: 0 },
  { label: "Hackathon", value: "Top 8 · MockUp'26", pos: "-bottom-7 -left-2 sm:-left-10", delay: 1.2 },
  { label: "Led", value: "7 developers", pos: "-bottom-4 right-4 sm:-right-6 lg:right-10", delay: 2.4 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Floating chips
      gsap.utils.toArray<HTMLElement>(".float-chip").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out", delay: introDelay(1.1 + i * 0.15) });
        gsap.to(el, { y: i % 2 ? 10 : -10, duration: 3 + i * 0.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: introDelay(2 + i * 0.15) });
      });

      // Scroll: content drifts up and fades as you leave the hero
      gsap.to(".hero-inner", {
        yPercent: -8,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Pointer tilt on the terminal
      if (window.matchMedia("(hover: hover)").matches && tilt.current) {
        const rx = gsap.quickTo(tilt.current, "rotationX", { duration: 0.9, ease: "power3" });
        const ry = gsap.quickTo(tilt.current, "rotationY", { duration: 0.9, ease: "power3" });
        const move = (e: MouseEvent) => {
          ry((e.clientX / window.innerWidth - 0.5) * 10);
          rx(-(e.clientY / window.innerHeight - 0.5) * 8);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-8 pt-28 sm:px-10">
      <div className="hero-inner mx-auto w-full max-w-[1400px]">
        <ScrollReveal intro y={16} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="chip !text-paper">
            <span className="live-dot" /> Open to hackathons · internships · open source
          </span>
          <span className="label hidden sm:inline">B.E. IT @ TSEC — Mumbai</span>
        </ScrollReveal>

        <SplitReveal as="h1" intro className="display-xl max-w-[17ch]">
          I build full-stack systems and <em>AI agents</em> that ship.
        </SplitReveal>

        <div className="mt-10 grid items-end gap-12 lg:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ScrollReveal intro delay={0.35}>
              <p className="prose-lead max-w-xl">
                Full-stack developer &amp; AI builder — Python, Java, JS/TS. Concurrency-safe backends, LLM agents and interfaces
                with a pulse. Third-year IT @ TSEC, Mumbai.
              </p>
            </ScrollReveal>

            <ScrollReveal intro delay={0.5} className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="/projects" className="btn btn-primary">
                  View selected work <ArrowUpRight size={15} weight="bold" className="arrow" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact" className="btn btn-ghost">
                  Get in touch
                </Link>
              </Magnetic>
            </ScrollReveal>

            <ScrollReveal intro delay={0.7} className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">
              <span>
                <span className="text-dim">Base</span>&nbsp; Mumbai, IN
              </span>
              <span>
                <span className="text-dim">Local</span>&nbsp; <LocalTime className="text-paper" />
              </span>
              <span className="flex items-center gap-2 text-signal">
                Scroll <ArrowDown size={12} weight="bold" className="animate-bounce" />
              </span>
            </ScrollReveal>
          </div>

          <div className="relative lg:col-span-6" style={{ perspective: 1200 }}>
            <div ref={tilt} style={{ transformStyle: "preserve-3d" }}>
              <TerminalWindow lines={TERM} intro title="manav@portfolio — zsh — 80×24" className="mx-auto w-full max-w-[560px] lg:ml-auto lg:mr-0" />
            </div>
            {CHIPS.map((c) => (
              <div
                key={c.label}
                className={`float-chip glass glass-static absolute z-10 hidden !rounded-2xl px-4 py-2.5 opacity-0 sm:block ${c.pos}`}
              >
                <p className="label !text-[0.6rem]">{c.label}</p>
                <p className="font-display text-xl leading-tight">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
