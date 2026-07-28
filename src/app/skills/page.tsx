"use client";

import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";
import GlassPanel from "@/components/fx/GlassPanel";

const badgeConfig: Record<string, { label: string; color: string; logo: string }> = {
  Python: { label: "Python", color: "3776AB", logo: "python" },
  JavaScript: { label: "JavaScript", color: "F7DF1E", logo: "javascript" },
  Java: { label: "Java", color: "007396", logo: "java" },
  "C++": { label: "C++", color: "00599C", logo: "cplusplus" },
  TypeScript: { label: "TypeScript", color: "3178C6", logo: "typescript" },
  React: { label: "React", color: "61DAFB", logo: "react" },
  "Next.js": { label: "Next.js", color: "000000", logo: "nextdotjs" },
  "Three.js": { label: "Three.js", color: "000000", logo: "threedotjs" },
  Electron: { label: "Electron", color: "47848F", logo: "electron" },
  JavaFX: { label: "JavaFX", color: "000000", logo: "java" },
  Django: { label: "Django", color: "092E20", logo: "django" },
  Flask: { label: "Flask", color: "000000", logo: "flask" },
  FastAPI: { label: "FastAPI", color: "009688", logo: "fastapi" },
  "Node.js": { label: "Node.js", color: "339933", logo: "nodedotjs" },
  "Express.js": { label: "Express.js", color: "000000", logo: "express" },
  MySQL: { label: "MySQL", color: "4479A1", logo: "mysql" },
  SQLite: { label: "SQLite", color: "003B57", logo: "sqlite" },
  PostgreSQL: { label: "PostgreSQL", color: "4169E1", logo: "postgresql" },
  MongoDB: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  Drizzle: { label: "Drizzle", color: "C5F74F", logo: "drizzle" },
  Git: { label: "Git", color: "F05032", logo: "git" },
  GitHub: { label: "GitHub", color: "181717", logo: "github" },
  Docker: { label: "Docker", color: "2496ED", logo: "docker" },
  Google_Cloud: { label: "Google Cloud", color: "4285F4", logo: "googlecloud" },
  AWS: { label: "AWS", color: "232F3E", logo: "amazonwebservices" },
  Gemini_API: { label: "Gemini API", color: "8E75B2", logo: "google" },
  HuggingFace: { label: "HuggingFace", color: "FFD21E", logo: "huggingface" },
  Transformers: { label: "Transformers", color: "FFD21E", logo: "huggingface" },
  Kali_Linux: { label: "Kali Linux", color: "268BEE", logo: "kalilinux" },
  Nmap: { label: "Nmap", color: "0E83CD", logo: "nmap" },
  Wireshark: { label: "Wireshark", color: "1679A7", logo: "wireshark" },
};

// AMBER signals security/privacy — the one deliberate palette break
const AMBER_CATEGORIES = ["Security_Privacy"];

const skills = {
  Languages: ["Python", "JavaScript", "Java", "C++", "TypeScript"],
  Backend: ["Django", "FastAPI", "Flask", "Node.js", "Express.js"],
  Frontend: ["React", "Next.js", "Three.js", "Electron", "JavaFX"],
  Databases: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Drizzle"],
  Cloud_DevOps: ["Git", "GitHub", "Docker", "Google_Cloud", "AWS"],
  AI_Tools: ["Gemini_API", "HuggingFace", "Transformers"],
  Security_Privacy: ["Kali_Linux", "Nmap", "Wireshark"],
};

const leftColumn = ["Languages", "Backend", "Frontend", "Security_Privacy"];
const rightColumn = ["Databases", "Cloud_DevOps", "AI_Tools"];

// Skills actively in use — pulse breathing effect
const ACTIVE_SKILLS = ["TypeScript", "FastAPI", "Google_Cloud", "Gemini_API"];

function SkillBadge({ skill, amber }: { skill: string; amber?: boolean }) {
  const config = badgeConfig[skill];
  if (!config) return null;

  const isActive = ACTIVE_SKILLS.includes(skill);

  return (
    <span
      className={`inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded text-sm sm:text-base font-mono border transition-all duration-200 ${
        amber
          ? "border-[--amber-900] text-[--amber-400] bg-[--amber-900]/20 hover:border-[--amber-400] hover:shadow-[var(--glow-amber)]"
          : "border-[--phosphor-900] text-[--phosphor-400] bg-[--void-raised] hover:border-[--phosphor-600] hover:shadow-[var(--glow-phosphor-tight)]"
      } ${isActive ? "animate-pulse-slow" : ""}`}
    >
      <img
        src={`https://cdn.simpleicons.org/${config.logo}/${amber ? "ffb454" : "4ade80"}`}
        alt={config.label}
        className="w-4.5 h-4.5"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      {config.label}
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
    </span>
  );
}

function SkillSection({
  title,
  items,
  delay,
}: {
  title: string;
  items: string[];
  delay: number;
}) {
  const amber = AMBER_CATEGORIES.includes(title);
  const displayTitle = title.replace(/_/g, " ");

  return (
    <ScrollReveal delay={delay}>
      <section className="mb-5 pb-4 border-b border-[--phosphor-900] last:border-none">
        <h3
          className={`text-sm mb-2 font-mono tracking-widest uppercase ${
            amber ? "text-[--amber-400]" : "text-[--phosphor-400]"
          }`}
        >
          {amber ? "⚑ " : "// "}{displayTitle}
        </h3>
        <div className="flex flex-wrap gap-3.5 sm:gap-4">
          {items.map((skill) => (
            <SkillBadge key={skill} skill={skill} amber={amber} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

export default function Skills() {
  return (
    <main className="flex-1 px-6 py-8 flex flex-col justify-center w-full">
      <section className="max-w-[1400px] mx-auto w-full">
        <ScrollReveal delay={0}>
          <p className="text-[--phosphor-600] mb-2 text-sm font-mono">
            manav@portfolio:~/skills$
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-5xl font-bold mb-6">
            <PixelDecrypt text="Skills" />
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* LEFT COLUMN */}
          <div>
            {leftColumn.map((cat, i) => (
              <SkillSection
                key={cat}
                title={cat}
                items={skills[cat as keyof typeof skills]}
                delay={0.1 + i * 0.08}
              />
            ))}
          </div>
          {/* RIGHT COLUMN */}
          <div>
            {rightColumn.map((cat, i) => (
              <SkillSection
                key={cat}
                title={cat}
                items={skills[cat as keyof typeof skills]}
                delay={0.18 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
