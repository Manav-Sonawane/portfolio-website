"use client";

import ProjectsCard from "@/components/ProjectsCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <main className="px-10 py-16 w-full">
      <section className="max-w-full mx-auto">
        <p className="text-green-400 mb-4">
          manav-sonawane@portfolio:~/projects$
        </p>

        <h2 className="text-7xl font-semibold mb-12">Projects</h2>

        {/* Single horizontal scrolling row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-10 pb-4" style={{ minWidth: "max-content" }}>
            {projects.map((project) => (
              // @ts-expect-error - Project type doesn't match ProjectsCard props exactly
              <ProjectsCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
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
