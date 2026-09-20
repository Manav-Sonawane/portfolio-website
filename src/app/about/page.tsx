"use client";

import Image from "next/image";
import { useRef } from "react";
import { Certificate, GraduationCap, MapPin } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import ScrubText from "@/components/fx/ScrubText";
import GlassPanel from "@/components/fx/GlassPanel";
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

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Portrait parallax + reveal
      gsap.fromTo(".portrait-mask", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)", duration: 1.6, ease: "expo.inOut", delay: 0.6 });
      gsap.fromTo(".portrait-img", { scale: 1.35 }, { scale: 1.05, duration: 2, ease: "expo.out", delay: 0.6 });
      gsap.to(".portrait-img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".portrait-wrap", start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 sm:px-10 md:pt-44">
        <ScrollReveal intro y={14}>
          <p className="label mb-8">~/about</p>
        </ScrollReveal>
        <SplitReveal as="h1" intro className="display-xl max-w-[15ch]">
          Student by degree, <em>builder</em> by habit.
        </SplitReveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-12">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <div className="portrait-wrap relative mx-auto max-w-[460px] lg:sticky lg:top-28">
            <div className="portrait-mask relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[32px] border border-white/10 bg-ink-3" style={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }}>
              <Image
                src="/manav.jpg"
                alt="Manav Sonawane"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="portrait-img object-cover"
                style={{ objectPosition: "50% 20%", transformOrigin: "50% 15%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(160deg, rgba(124,108,255,0.5), rgba(46,230,197,0.25))" }} />
            </div>

            {/* rotating badge */}
            <div className="absolute -bottom-10 -right-4 h-36 w-36 sm:-right-10 sm:h-44 sm:w-44">
              <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
                <defs>
                  <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-paper font-mono" style={{ fontSize: 15, letterSpacing: "0.32em" }}>
                  <textPath href="#circ">FULL-STACK • AI BUILDER • OPEN TO WORK •</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-signal font-display text-3xl italic text-black">M</span>
              </span>
            </div>

            <div className="glass glass-static absolute -left-3 top-10 hidden !rounded-2xl px-4 py-2.5 sm:block">
              <p className="label flex items-center gap-1.5 !text-[0.6rem]">
                <MapPin size={11} weight="fill" className="text-signal" /> Based in
              </p>
              <p className="font-display text-xl">Mumbai, IN</p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-10 lg:col-span-7 lg:pt-10">
          <ScrubText as="p" className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.12] tracking-[-0.02em]">
            {profile.about[1]}
          </ScrubText>
          <div className="space-y-6 border-l border-white/10 pl-6 sm:pl-8">
            <ScrubText className="text-lg leading-relaxed text-paper sm:text-xl">{profile.about[0]}</ScrubText>
            <ScrubText className="text-lg leading-relaxed text-paper sm:text-xl">{profile.about[2]}</ScrubText>
            <ScrubText className="text-lg leading-relaxed text-paper sm:text-xl">{profile.about[3]}</ScrubText>
          </div>
        </div>
      </section>

      {/* Bento */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10">
        <ScrollReveal stagger={0.1} y={50} className="grid gap-4 md:grid-cols-12">
          <GlassPanel className="flex flex-col justify-between p-8 md:col-span-5">
            <GraduationCap size={30} weight="light" className="text-signal" />
            <div className="mt-16">
              <p className="label">{profile.years}</p>
              <p className="display-md mt-3">{profile.degree}</p>
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
            <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {profile.credentials.map((c) => (
                <li key={c.title} className="bg-ink-2/80 p-6 transition-colors duration-500 hover:bg-ink-3">
                  <p className="font-display text-2xl leading-tight">{c.title}</p>
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
