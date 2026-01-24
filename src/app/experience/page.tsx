"use client";

import ExperienceBlock from "@/components/ExperienceBlock";
import { leftColumn, rightColumn } from "@/lib/experience";

export default function ExperiencePage() {
  return (
    <main className="px-10 py-16 max-w-7xl">
      {/* Terminal path */}
      <p className="text-green-400 mb-4">manav@portfolio:~/experience$</p>

      {/* Heading */}
      <h1 className="text-7xl font-semibold mb-16">Experience</h1>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-14">
        <div className="space-y-14 space-x-0">
          {leftColumn.map((exp, idx) => (
            <ExperienceBlock key={idx} exp={exp} />
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-14 space-x-0">
          {rightColumn.map((exp, idx) => (
            <ExperienceBlock key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </main>
  );
}
