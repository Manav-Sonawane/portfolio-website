"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import GlassPanel from "@/components/fx/GlassPanel";
import BigCTA from "@/components/BigCTA";
import { experiences } from "@/lib/experience";
import { profile } from "@/lib/profile";

export default function ExperiencePage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".tl-line", { scaleY: 1 });
        gsap.set(".tl-dot", { backgroundColor: "#c6ff4d", scale: 1 });
        return;
      }
      // The spine draws itself as you scroll
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-wrap", start: "top 60%", end: "bottom 70%", scrub: 0.5 } }
      );
      // Each node ignites when reached
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        const dot = item.querySelector(".tl-dot");
        gsap.fromTo(
          dot,
          { backgroundColor: "#14141e", scale: 0.7, boxShadow: "0 0 0 0 rgba(198,255,77,0)" },
          {
            backgroundColor: "#c6ff4d",
            scale: 1,
            boxShadow: "0 0 0 8px rgba(198,255,77,0.14)",
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: item, start: "top 62%", toggleActions: "play none none reverse" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 sm:px-10 md:pt-44">
        <ScrollReveal intro y={14}>
          <p className="label mb-8">~/experience</p>
        </ScrollReveal>
        <SplitReveal as="h1" intro className="display-xl max-w-[12ch]">
          Where I&apos;ve <em>worked</em> &amp; led.
        </SplitReveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="prose-lead max-w-xs">
                Two internships, a campus tech team, and an ambassador role — shipping backends, leading engineers, and organising events.
              </p>
              <div className="mt-8 grid max-w-xs grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-5xl text-signal">2</p>
                  <p className="label mt-1">Internships</p>
                </div>
                <div>
                  <p className="font-display text-5xl text-signal">7</p>
                  <p className="label mt-1">Devs led</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="tl-wrap relative lg:col-span-8">
          {/* spine */}
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-white/10 sm:left-[15px]">
            <div className="tl-line h-full w-full origin-top bg-gradient-to-b from-signal via-signal to-teal" />
          </div>

          <div className="space-y-10 pl-9 sm:pl-14">
            {experiences.map((e) => (
              <div key={e.org + e.period} className="tl-item relative">
                <span className="tl-dot absolute -left-[32px] top-9 h-[15px] w-[15px] rounded-full border border-signal/60 sm:-left-[49px] sm:h-[17px] sm:w-[17px]" style={{ background: "#14141e" }} />
                <ScrollReveal y={60}>
                  <GlassPanel className="p-7 sm:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-signal">{e.period}</span>
                      <span className="flex items-center gap-2">
                        {e.current && (
                          <span className="chip !text-signal">
                            <span className="live-dot !h-[6px] !w-[6px]" /> Current
                          </span>
                        )}
                        <span className="chip">{e.kind}</span>
                      </span>
                    </div>
                    <h2 className="display-md mt-6">{e.role}</h2>
                    <p className="mt-2 font-mono text-sm text-mute">@ {e.org}</p>
                    <ul className="mt-8 space-y-3.5">
                      {e.points.map((pt, i) => (
                        <li key={i} className="flex gap-4 leading-relaxed text-paper/85">
                          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                </ScrollReveal>
              </div>
            ))}

            {/* Education */}
            <div className="tl-item relative">
              <span className="tl-dot absolute -left-[32px] top-9 h-[15px] w-[15px] rounded-full border border-signal/60 sm:-left-[49px] sm:h-[17px] sm:w-[17px]" style={{ background: "#14141e" }} />
              <ScrollReveal y={60}>
                <GlassPanel className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-signal">{profile.years}</span>
                    <span className="chip">Education</span>
                  </div>
                  <h2 className="display-md mt-6">{profile.degree}</h2>
                  <p className="mt-2 font-mono text-sm text-mute">@ {profile.school}, Bandra</p>
                  <p className="mt-6 text-paper/85">
                    Third year · CGPA <span className="font-display text-2xl text-signal">{profile.cgpa}</span>
                  </p>
                </GlassPanel>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <BigCTA />
    </main>
  );
}
