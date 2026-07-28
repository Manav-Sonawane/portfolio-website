"use client";

import Image from "next/image";
import TerminalProfileCard from "@/components/TerminalProfileCard";
import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";
import GlassPanel from "@/components/fx/GlassPanel";

export default function About() {
  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">

        {/* LEFT: Text */}
        <section className="max-w-3xl">
          <ScrollReveal delay={0}>
            <p className="text-[--phosphor-600] mb-2 text-sm font-mono">
              manav-sonawane@portfolio:~/about$
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-5 text-[--phosphor-100]">
              <PixelDecrypt text="About Me" />
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4 font-mono">
              I am a B.E. Information Technology student at Thadomal Shahani Engineering College (TSEC, Mumbai), currently in my third year (2024–2028) maintaining a CGPA of 9.12.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4 font-mono">
              I specialize in backend engineering and full-stack development, with hands-on experience building highly concurrent web systems (such as BookMySeat with Django) and leading engineering teams during my internships at ElevanceSkills Technologies and ESPECA Technologies.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4 font-mono">
              My technical expertise spans Python, TypeScript, and Java, alongside databases like PostgreSQL (including pgvector and HNSW indexing for AI search), MongoDB, and MySQL, and cloud/DevOps platforms like Google Cloud Services, AWS, and Docker.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed font-mono">
              Beyond engineering, I am a Technical Team Member at TSEC CodeStorm and a Student Ambassador for Ai+ Smartphone, blending leadership, technical coordination, and a passion for ethical hacking.
            </p>
          </ScrollReveal>
        </section>

        {/* RIGHT: Photo + Terminal Card */}
        <section className="flex flex-col gap-5 justify-center items-center">
          <ScrollReveal delay={0.1}>
            {/* Photo with phosphor scan reveal effect */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-[--phosphor-900] bg-black/40 shadow-[var(--glow-phosphor)]">
              <Image
                src="/manav.jpg"
                alt="Manav Sonawane"
                width={288}
                height={288}
                className="object-cover opacity-90 mix-blend-screen hover:opacity-100 transition-opacity duration-300"
                priority
              />
              {/* Phosphor-green tint overlay on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300 bg-[--phosphor-400]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassPanel className="w-full max-w-sm">
              <TerminalProfileCard />
            </GlassPanel>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
