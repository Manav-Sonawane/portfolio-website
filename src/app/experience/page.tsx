"use client";

import ExperienceBlock from "@/components/ExperienceBlock";
import { leftColumn, rightColumn } from "@/lib/experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Internships, college technical committees, campus ambassadorships and hackathons participated in by Manav Sonawane.",
};

export default function ExperiencePage() {
  return (
    <main className="px-4 sm:px-6 md:px-10 py-10 md:py-16 max-w-7xl mx-auto">
      {/* Terminal path */}
      <p className="text-green-400 mb-4 break-words">
        manav@portfolio:~/experience$
      </p>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-10 md:mb-16">
        Experience
      </h1>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-10 md:gap-y-14">
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
