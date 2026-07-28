"use client";

import ExperienceBlock from "@/components/ExperienceBlock";
import { leftColumn, rightColumn } from "@/lib/experience";
import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";

export default function ExperiencePage() {
  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full max-w-7xl mx-auto">
      <ScrollReveal delay={0}>
        <p className="text-[--phosphor-600] mb-2 text-sm font-mono">
          manav@portfolio:~/experience$
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <PixelDecrypt
          text="Experience"
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-6"
        />
      </ScrollReveal>

      {/* Two-column timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4">
        {/* LEFT — staggers slightly ahead of right */}
        <div className="space-y-6">
          {leftColumn.map((exp, idx) => (
            <ScrollReveal key={idx} delay={0.1 + idx * 0.1}>
              <ExperienceBlock exp={exp} />
            </ScrollReveal>
          ))}
        </div>

        {/* RIGHT — offset stagger, like parallel terminal panes */}
        <div className="space-y-6">
          {rightColumn.map((exp, idx) => (
            <ScrollReveal key={idx} delay={0.15 + idx * 0.1}>
              <ExperienceBlock exp={exp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
