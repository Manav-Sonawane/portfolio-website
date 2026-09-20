"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import { projects } from "@/lib/projects";

const featured = projects.filter((p) => p.featured);

/**
 * Desktop: the section pins and the track scrolls sideways, scrubbed by the wheel.
 * Mobile / reduced-motion: a plain vertical stack.
 */
export default function FeaturedWork() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const getDistance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth);

        gsap.to(track.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".work-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${getDistance()}`, scrub: true, invalidateOnRefresh: true },
        });
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative overflow-hidden py-24 lg:flex lg:h-[100svh] lg:items-center lg:py-0 motion-reduce:lg:block motion-reduce:lg:h-auto motion-reduce:lg:py-24">
      <div ref={track} className="flex flex-col gap-6 px-6 sm:px-10 lg:h-[78vh] lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] lg:pr-[10vw] motion-reduce:lg:mx-auto motion-reduce:lg:h-auto motion-reduce:lg:max-w-[1400px] motion-reduce:lg:flex-col motion-reduce:lg:!px-10">
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-between lg:w-[30vw] lg:max-w-[440px] motion-reduce:lg:w-full motion-reduce:lg:max-w-none">
          <div>
            <ScrollReveal>
              <p className="label mb-6">Selected work — 01</p>
            </ScrollReveal>
            <SplitReveal as="h2" className="display-lg">
              Things I&apos;ve <em>shipped</em>, end to end.
            </SplitReveal>
            <ScrollReveal delay={0.15}>
              <p className="prose-lead mt-6 max-w-sm">
                Civic AI on Cloud Run, an agentic advisory for fishermen, and a privacy-first browser — each built from schema to interface.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal className="mt-10 hidden lg:block">
            <div className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">
              <span>Scroll</span>
              <div className="h-px w-40 bg-white/15">
                <div className="work-progress h-px origin-left scale-x-0 bg-signal" />
              </div>
              <span>0{featured.length}</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Cards */}
        {featured.map((p, i) => (
          <article
            key={p.slug}
            className="glass group relative flex min-h-[460px] shrink-0 flex-col justify-between p-7 sm:p-10 lg:w-[min(64vw,880px)] motion-reduce:lg:w-full"
            style={{ ["--accent" as string]: p.accent }}
          >
            {/* accent aurora */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: `radial-gradient(70% 80% at 85% 0%, ${p.accent}33, transparent 60%), radial-gradient(50% 60% at 0% 100%, ${p.accent}14, transparent 65%)` }}
            />
            <span className="work-num pointer-events-none absolute -right-4 -top-10 select-none font-display text-[22rem] italic leading-none text-outline opacity-60 sm:text-[28rem]">
              {i + 1}
            </span>

            <div className="relative flex items-start justify-between gap-4">
              <span className="chip" style={{ color: p.accent, borderColor: `${p.accent}55` }}>
                {p.category}
              </span>
              <span className="label">0{i + 1} / 0{featured.length}</span>
            </div>

            <div className="relative mt-16">
              <h3 className="display-lg">{p.title}</h3>
              <p className="prose-lead mt-4 max-w-xl">{p.tagline}</p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-mute/80">{p.highlights[0]}</p>
            </div>

            <div className="relative mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <ul className="flex max-w-lg flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 gap-3">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label={`${p.title} on GitHub`}>
                  <GithubLogo size={15} weight="bold" /> Code
                </a>
                <Link href="/projects" className="btn btn-primary btn-sm">
                  Details <ArrowUpRight size={14} weight="bold" className="arrow" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Outro */}
        <Link
          href="/projects"
          data-cursor="all"
          className="group flex shrink-0 flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-white/15 p-10 text-center transition-colors duration-500 hover:border-signal/60 lg:w-[26vw] lg:max-w-[380px] motion-reduce:lg:w-full motion-reduce:lg:max-w-none"
        >
          <span className="display-md">
            All <em>{projects.length}</em> projects
          </span>
          <span className="grid h-20 w-20 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-black">
            <ArrowUpRight size={28} weight="light" />
          </span>
        </Link>
      </div>
    </section>
  );
}
