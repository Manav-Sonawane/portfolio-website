"use client";

import ProjectsCard from "@/components/ProjectsCard";
import { projects } from "@/lib/projects";
import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";
import MorphBlob from "@/components/fx/MorphBlob";
import GlassPanel from "@/components/fx/GlassPanel";
import Link from "next/link";

const PRIME_SLUGS = ["Citioyen", "MAArK"];
const STANDARD_SLUGS = ["Codered-IO"];

export default function Projects() {
  const primeProjects = projects.filter((p) => PRIME_SLUGS.includes(p.slug));
  const standardProjects = projects.filter((p) => STANDARD_SLUGS.includes(p.slug));
  const otherProjects = projects.filter((p) => !PRIME_SLUGS.includes(p.slug) && !STANDARD_SLUGS.includes(p.slug));

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full">
      <section className="max-w-full mx-auto w-full">
        <ScrollReveal delay={0}>
          <p className="text-[--phosphor-600] mb-2 text-sm font-mono">
            manav-sonawane@portfolio:~/projects$
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-6">
            <PixelDecrypt text="Projects" />
          </h2>
        </ScrollReveal>

        {/* Prime projects and Standard projects — cards */}
        <div className="md:overflow-x-auto scrollbar-hide mb-8">
          <div
            className="flex flex-col md:flex-row gap-5 md:gap-8 pb-4 items-center md:items-start"
            style={{ minWidth: "auto" }}
          >
            {/* Prime projects */}
            {primeProjects.map((project, i) => (
              <ScrollReveal 
                key={project.slug} 
                delay={0.1 + i * 0.12} 
                className="relative w-full max-w-[320px] sm:max-w-[380px] shrink-0"
              >
                <MorphBlob tone="amber" />
                <ProjectsCard project={project} isPrime={true} />
              </ScrollReveal>
            ))}

            {/* Standard projects */}
            {standardProjects.map((project, i) => (
              <ScrollReveal 
                key={project.slug} 
                delay={0.22 + i * 0.08} 
                className="relative w-full max-w-[320px] sm:max-w-[380px] shrink-0"
              >
                <MorphBlob tone="phosphor" />
                <ProjectsCard project={project} isPrime={false} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.4}>
          <p className="pb-4 text-sm text-[--ghost-400] font-mono">
            {"(Click the cards to flip and get project details...)"}
          </p>
        </ScrollReveal>

        {/* Other / compressed projects list */}
        {otherProjects.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[--phosphor-900]">
            <ScrollReveal delay={0.5}>
              <h3 className="text-[--phosphor-400] text-sm font-mono tracking-widest uppercase mb-4">
                // Other Projects
              </h3>
            </ScrollReveal>
            <div className="flex flex-col gap-3">
              {otherProjects.map((project, i) => (
                <ScrollReveal key={project.slug} delay={0.6 + i * 0.05}>
                  <GlassPanel className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="text-[--phosphor-100] font-bold text-lg mb-1">{project.title}</h4>
                      <p className="text-[--ghost-400] text-sm">{project.tagline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono border border-[--phosphor-600] text-[--phosphor-400] px-3 py-1.5 rounded hover:bg-[--phosphor-600] hover:text-[#000] transition-colors"
                        >
                          [ GitHub → ]
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono border border-[--ghost-700] text-[--ghost-400] px-3 py-1.5 rounded hover:border-[--phosphor-400] hover:text-[--phosphor-400] transition-colors"
                        >
                          [ Live → ]
                        </a>
                      )}
                    </div>
                  </GlassPanel>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
