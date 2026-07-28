"use client";

import ProjectsCard from "@/components/ProjectsCard";
import { projects } from "@/lib/projects";
import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";
import MorphBlob from "@/components/fx/MorphBlob";
import GlassPanel from "@/components/fx/GlassPanel";

// First two projects are prime (amber tint + blob), rest are standard
const PRIME_SLUGS = ["Citioyen", "MAArK"];

export default function Projects() {
  const primeProjects = projects.filter((p) => PRIME_SLUGS.includes(p.slug));
  const otherProjects = projects.filter((p) => !PRIME_SLUGS.includes(p.slug));

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full">
      <section className="max-w-full mx-auto w-full">
        <ScrollReveal delay={0}>
          <p className="text-[--phosphor-600] mb-2 text-sm font-mono">
            manav-sonawane@portfolio:~/projects$
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <PixelDecrypt
            text="Projects"
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-6"
          />
        </ScrollReveal>

        {/* Prime projects — large cards with amber blob */}
        <div className="md:overflow-x-auto scrollbar-hide">
          <div
            className="flex flex-col md:flex-row gap-5 md:gap-6 pb-2 items-center md:items-start"
            style={{ minWidth: "auto" }}
          >
            {primeProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={0.1 + i * 0.12} className="relative">
                <MorphBlob tone="amber" />
                {/* @ts-expect-error – Project type matches at runtime */}
                <ProjectsCard {...project} />
              </ScrollReveal>
            ))}

            {/* Standard projects */}
            {otherProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={0.22 + i * 0.08}>
                {/* @ts-expect-error – Project type matches at runtime */}
                <ProjectsCard {...project} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Other / compressed projects list */}
        {otherProjects.length === 0 && (
          <ScrollReveal delay={0.4}>
            <p className="py-2 text-sm text-[--ghost-400] font-mono">
              {"(Click the cards to get project details...)"}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.5}>
          <p className="py-2 text-sm text-[--ghost-400] font-mono mt-2">
            {"(Click the cards to flip and get project details...)"}
          </p>
        </ScrollReveal>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
