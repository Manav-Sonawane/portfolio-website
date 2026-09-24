"use client";

import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import SectionHead from "@/components/fx/SectionHead";
import Corners from "@/components/fx/Corners";
import BigCTA from "@/components/BigCTA";
import { experiences } from "@/lib/experience";
import { profile } from "@/lib/profile";

type Row = {
  from: string;
  to: string;
  title: string;
  org: string;
  kind: string;
  current?: boolean;
  points: string[];
};

const rows: Row[] = [
  ...experiences.map((e) => {
    const [from, to] = e.period.split(" – ");
    return { from, to, title: e.role, org: e.org, kind: e.kind, current: e.current, points: e.points };
  }),
  {
    from: "2024",
    to: "2028",
    title: profile.degree,
    org: `${profile.school}, Bandra`,
    kind: "Education",
    points: [`Third year · CGPA ${profile.cgpa}`],
  },
];

export default function ExperiencePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-32 sm:px-10 md:pt-40">
        <ScrollReveal intro y={14}>
          <p className="label mb-6 !text-signal">~/experience.log</p>
        </ScrollReveal>
        <SplitReveal as="h1" intro className="display-xl max-w-[16ch]">
          Where I&apos;ve <em>worked</em> &amp; led.
        </SplitReveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10">
        <SectionHead n="03" title="Log" meta={`${String(rows.length).padStart(2, "0")} entries`} className="mb-8" />

        <ScrollReveal>
          <div className="glass glass-static relative !overflow-visible">
            <Corners />
            <div className="divide-y divide-white/10 overflow-hidden">
              {rows.map((r, i) => (
                <article key={r.org + r.from} className="group relative grid gap-5 px-5 py-7 transition-colors duration-500 hover:bg-white/[0.035] sm:px-8 md:grid-cols-[150px_minmax(0,1fr)_auto] md:gap-10">
                  <span className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] md:block md:space-y-1">
                    <p className="text-signal">{r.from}</p>
                    <p className="flex items-center gap-2 text-mute">
                      <span className="h-px w-3 bg-white/25" />
                      {r.current ? <span className="text-ok">{r.to}</span> : r.to}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-semibold uppercase tracking-[0.03em] sm:text-2xl">{r.title}</h2>
                    <p className="mt-1.5 font-mono text-[0.78rem] tracking-wide text-signal">{r.org}</p>
                    <ul className="mt-5 space-y-2.5">
                      {r.points.map((pt, k) => (
                        <li key={k} className="flex gap-3 leading-relaxed text-paper/80">
                          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal/70" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-3 md:flex-col md:items-end md:justify-between">
                    <span className="flex items-center gap-2">
                      {r.current && (
                        <span className="chip !text-ok">
                          <span className="live-dot !h-[5px] !w-[5px]" /> Current
                        </span>
                      )}
                      <span className="chip">{r.kind}</span>
                    </span>
                    <span className="font-display text-4xl leading-none text-white/[0.12] transition-colors duration-500 group-hover:text-signal/50">
                      {String(rows.length - i).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <BigCTA />
    </main>
  );
}
