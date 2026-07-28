"use client";

import ProjectsCard from "@/components/ProjectsCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full">
      <section className="max-w-full mx-auto">
        <p className="text-green-400 mb-2 text-sm">
          manav-sonawane@portfolio:~/projects$
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold mb-6">
          Projects
        </h2>

        {/* Horizontal scroll on desktop, vertical stack on mobile */}
        <div className="md:overflow-x-auto scrollbar-hide">
          <div
            className="flex flex-col md:flex-row gap-4 md:gap-6 pb-2 items-center md:items-start"
            style={{ minWidth: "auto" }}
          >
            {projects.map((project) => (
              // @ts-expect-error - Project type doesn't match ProjectsCard props exactly
              <ProjectsCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
        <p className="py-2 text-sm sm:text-base">
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
