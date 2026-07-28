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
            <PixelDecrypt
              text="About Me"
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-5 text-[--phosphor-100]"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4">
              I&apos;m an I.T. Engg Student @TSEC, Mumbai, with a strong inclination
              toward backend development.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4">
              I am learning ethical hacking and cloud computing while actively
              participating in hackathons and contributing to open-source projects.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed mb-4">
              I&apos;ve worked across startups and technical teams, building scalable
              web applications, RESTful APIs, and backend systems using Python,
              Django, Node.js, and databases like PostgreSQL and MongoDB.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <p className="text-[--ghost-400] text-base sm:text-lg leading-relaxed">
              Beyond development, I&apos;ve taken up leadership and coordination roles
              — managing teams, organizing hackathons, and contributing to college
              technical committees.
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
