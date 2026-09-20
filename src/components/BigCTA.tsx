"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import Magnetic from "@/components/fx/Magnetic";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import { profile } from "@/lib/profile";

/** Closing call-to-action reused at the end of each page. */
export default function BigCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".cta-orb",
        { scale: 0.6, opacity: 0.3 },
        { scale: 1.15, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom 60%", scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative mx-auto max-w-[1400px] px-6 py-28 sm:px-10 md:py-40">
      <div
        className="cta-orb pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(198,255,77,0.10), rgba(124,108,255,0.10) 40%, transparent 68%)" }}
      />
      <div className="relative">
        <ScrollReveal>
          <p className="label mb-8 flex items-center gap-3">
            <span className="live-dot" /> What&apos;s next?
          </p>
        </ScrollReveal>

        <SplitReveal as="h2" className="display-xl max-w-[16ch]">
          Let&apos;s build something <em>meaningful.</em>
        </SplitReveal>

        <div className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <ScrollReveal delay={0.1}>
            <p className="prose-lead max-w-md">
              Hackathon team, internship, or an open-source idea worth shipping — my inbox is open.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/contact" className="btn btn-primary !px-8 !py-5 !text-sm">
                Start a conversation <ArrowUpRight size={16} weight="bold" className="arrow" />
              </Link>
            </Magnetic>
            <a href={`mailto:${profile.email}`} className="u-link font-mono text-sm text-mute transition-colors hover:text-paper">
              {profile.email}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
