"use client";

import { useRef } from "react";
import { GithubLogo, Code, Trophy, UsersThree, GraduationCap } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import GlassPanel from "@/components/fx/GlassPanel";
import ScrollReveal from "@/components/fx/ScrollReveal";
import SplitReveal from "@/components/fx/SplitReveal";
import SectionHead from "@/components/fx/SectionHead";
import CountUp from "@/components/fx/CountUp";
import { profile } from "@/lib/profile";
import type { GitHubStats } from "@/lib/github";
import type { LeetCodeStats } from "@/lib/leetcode";

export default function Impact({ github, leetcode }: { github: GitHubStats; leetcode: LeetCodeStats }) {
  const root = useRef<HTMLElement>(null);
  const total = Math.max(leetcode.totalSolved, 1);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".lc-bar").forEach((bar) => {
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: bar, start: "top 95%", once: true } });
      });
    },
    { scope: root }
  );

  const bars = [
    { label: "Easy", value: leetcode.easySolved, color: "var(--teal)" },
    { label: "Medium", value: leetcode.mediumSolved, color: "var(--amber)" },
    { label: "Hard", value: leetcode.hardSolved, color: "var(--rose)" },
  ];

  return (
    <section ref={root} className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionHead n="02" title="By the numbers" className="mb-8 w-full md:w-[560px]" />
          <SplitReveal as="h2" className="display-lg max-w-[16ch]">
            Consistency, <em>measured.</em>
          </SplitReveal>
        </div>
        <ScrollReveal delay={0.1}>
          <p className="prose-lead max-w-sm">Live counts from GitHub and LeetCode, refreshed hourly.</p>
        </ScrollReveal>
      </div>

      <ScrollReveal stagger={0.09} y={50} className="grid gap-4 md:grid-cols-12">
        {/* GitHub */}
        <GlassPanel className="p-7 sm:p-9 md:col-span-7">
          <div className="flex items-center justify-between">
            <p className="label flex items-center gap-2">
              <GithubLogo size={15} weight="fill" /> github / {github.login}
            </p>
            <a href={`https://github.com/${github.login}`} target="_blank" rel="noopener noreferrer" className="u-link font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mute hover:text-signal">
              Visit ↗
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="font-display text-7xl leading-none sm:text-8xl">
                <CountUp target={github.public_repos} />
              </p>
              <p className="label mt-3">Public repos</p>
            </div>
            <div>
              <p className="font-display text-7xl leading-none sm:text-8xl">
                <CountUp target={github.followers} />
              </p>
              <p className="label mt-3">Followers</p>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-[2px] border border-white/10 bg-black/30 p-3">
            {/* ghchart renders on a light palette; invert + a rust seed color gives a cyan-on-dark heatmap */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/a92700/${github.login}`}
              alt="GitHub contribution graph"
              className="h-auto w-full opacity-90"
              style={{ filter: "invert(1)" }}
              loading="lazy"
            />
          </div>
        </GlassPanel>

        {/* LeetCode */}
        <GlassPanel className="flex flex-col justify-between p-7 sm:p-9 md:col-span-5">
          <div>
            <p className="label flex items-center gap-2">
              <Code size={15} weight="bold" /> leetcode / Manav_Sonawane
            </p>
            <p className="mt-8 font-display text-8xl leading-none sm:text-9xl">
              <CountUp target={leetcode.totalSolved} />
            </p>
            <p className="label mt-3">Problems solved</p>
          </div>
          <div className="mt-10 space-y-4">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex justify-between font-mono text-[0.7rem] uppercase tracking-[0.12em]">
                  <span className="text-mute">{b.label}</span>
                  <span className="text-paper">{b.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden bg-white/8">
                  <div className="lc-bar h-full origin-left" style={{ width: `${(b.value / total) * 100}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Facts */}
        <GlassPanel className="p-7 md:col-span-4">
          <GraduationCap size={26} weight="light" className="text-signal" />
          <p className="mt-6 font-display text-6xl leading-none">
            <CountUp target={profile.cgpa} decimals={2} />
          </p>
          <p className="label mt-3">CGPA — B.E. IT, TSEC</p>
        </GlassPanel>
        <GlassPanel className="p-7 md:col-span-4">
          <UsersThree size={26} weight="light" className="text-signal" />
          <p className="mt-6 font-display text-6xl leading-none">
            <CountUp target={7} />
            <span className="text-mute"> devs</span>
          </p>
          <p className="label mt-3">Led as Technical PM intern</p>
        </GlassPanel>
        <GlassPanel className="p-7 md:col-span-4">
          <Trophy size={26} weight="light" className="text-signal" />
          <p className="mt-6 font-display text-6xl leading-none">
            Top <CountUp target={8} />
          </p>
          <p className="label mt-3">MockUp&apos;26 — 5-hour sprint</p>
        </GlassPanel>
      </ScrollReveal>
    </section>
  );
}
