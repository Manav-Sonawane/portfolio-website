"use client";

import ProjectsCard from "@/components/ProjectsCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <main className="px-4 sm:px-6 md:px-10 py-10 md:py-16 w-full">
      <section className="max-w-full mx-auto">
        <p className="text-green-400 mb-4">
          manav-sonawane@portfolio:~/projects$
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 md:mb-12">
          Projects
        </h2>

        {/* Horizontal scroll on desktop, vertical stack on mobile */}
        <div className="md:overflow-x-auto scrollbar-hide">
          <div
            className="flex flex-col md:flex-row gap-6 md:gap-10 pb-4 items-center md:items-start"
            style={{ minWidth: "auto" }}
          >
            {projects.map((project) => (
              // @ts-expect-error - Project type doesn't match ProjectsCard props exactly
              <ProjectsCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
        <p className="py-5 text-sm sm:text-base">
          {"(Click the cards to get project details...)"}
        </p>
      </section>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
