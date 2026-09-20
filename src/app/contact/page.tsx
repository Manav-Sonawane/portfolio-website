"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Magnetic from "@/components/fx/Magnetic";
import LocalTime from "@/components/fx/LocalTime";
import { contacts, profile } from "@/lib/profile";

const links = contacts.filter((c) => c.label !== "Email");

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const badge = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      return;
    }
    setCopied(true);
    gsap.fromTo(badge.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1,0.5)" });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-36 sm:px-10 md:pt-44">
        <ScrollReveal intro y={14}>
          <p className="label mb-8 flex items-center gap-3">
            <span className="live-dot" /> ~/contact — open to collaboration
          </p>
        </ScrollReveal>
        <SplitReveal as="h1" intro className="display-xl max-w-[19ch]">
          Let&apos;s build something <em>meaningful.</em>
        </SplitReveal>
      </section>

      {/* Email — the hero interaction */}
      <section className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10">
        <ScrollReveal>
          <div className="glass group relative overflow-hidden p-8 sm:p-14">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-70"
              style={{ background: "radial-gradient(60% 90% at 100% 0%, rgba(198,255,77,0.14), transparent 60%), radial-gradient(50% 70% at 0% 100%, rgba(124,108,255,0.16), transparent 65%)" }}
            />
            <p className="label mb-6">Drop me a line</p>
            <button
              type="button"
              onClick={copy}
              data-cursor="copy"
              aria-label={`Copy email address ${profile.email}`}
              className="block text-left font-display text-[clamp(1.6rem,5.6vw,5.6rem)] leading-none tracking-[-0.03em] break-all transition-colors duration-500 hover:text-signal sm:break-normal"
            >
              {profile.email}
            </button>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  Open mail app <ArrowUpRight size={15} weight="bold" className="arrow" />
                </a>
              </Magnetic>
              <button type="button" onClick={copy} className="btn btn-ghost">
                <span ref={badge} className="inline-flex">
                  {copied ? <Check size={15} weight="bold" /> : <Copy size={15} weight="bold" />}
                </span>
                {copied ? "Copied to clipboard" : "Copy address"}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Elsewhere */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <p className="label mb-4">Find me elsewhere</p>
            <p className="prose-lead max-w-xs">Code on GitHub, problems on LeetCode, thoughts on X.</p>
            <div className="mt-10 space-y-2 font-mono text-xs uppercase tracking-[0.14em] text-mute">
              <p>
                <span className="text-dim">Base</span>&nbsp; {profile.location}
              </p>
              <p>
                <span className="text-dim">Local</span>&nbsp; <LocalTime className="text-paper" />
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-8">
          <ScrollReveal stagger={0.07} y={30} className="border-t border-white/10">
            {links.map((c, i) => (
              <a
                key={c.label}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 overflow-hidden border-b border-white/10 py-6 sm:grid-cols-[4rem_10rem_1fr_auto] sm:py-8"
              >
                <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-[600ms] group-hover:scale-y-100" style={{ transitionTimingFunction: "var(--ease-expo)" }} />
                <span className="relative font-mono text-xs text-dim transition-colors duration-500 group-hover:text-black/60">0{i + 1}</span>
                <span className="relative display-md transition-all duration-500 group-hover:translate-x-2 group-hover:text-black sm:col-span-1">{c.label}</span>
                <span className="relative hidden text-mute transition-colors duration-500 group-hover:text-black/70 sm:block">{c.value}</span>
                <span className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-black group-hover:text-black">
                  <ArrowUpRight size={18} weight="light" />
                </span>
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
