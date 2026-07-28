"use client";

import ExperienceBlock from "@/components/ExperienceBlock";
import { leftColumn, rightColumn } from "@/lib/experience";


export default function ExperiencePage() {
  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full max-w-7xl mx-auto">
      {/* Terminal path */}
      <p className="text-green-400 mb-2 break-words text-sm">
        manav@portfolio:~/experience$
      </p>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold mb-6">
        Experience
      </h1>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4">
        <div className="space-y-6 space-x-0">
          {leftColumn.map((exp, idx) => (
            <ExperienceBlock key={idx} exp={exp} />
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 space-x-0">
          {rightColumn.map((exp, idx) => (
            <ExperienceBlock key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </main>
  );
}
