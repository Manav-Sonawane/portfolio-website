import { Experience } from "@/lib/experience";

export default function ExperienceBlock({ exp }: { exp: Experience }) {
  return (
    <div className="relative pl-6 border-l border-white/10">
      {/* Timeline dot */}
      <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-green-500" />

      <p className="text-sm text-green-400 mb-2">{exp.period}</p>

      <h2 className="text-xl font-semibold">{exp.role}</h2>

      <p className="text-white/70 mb-4">{exp.org}</p>

      <ul className="list-disc list-inside space-y-2 text-white/80">
        {exp.points.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
