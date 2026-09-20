"use client";

import PixelDecrypt from "@/components/fx/PixelDecrypt";
import ScrollReveal from "@/components/fx/ScrollReveal";
import GlassPanel from "@/components/fx/GlassPanel";

const badgeConfig: Record<string, { label: string; color: string; logo: string }> = {
  Python: { label: "Python", color: "3776AB", logo: "python" },
  Java: { label: "Java", color: "007396", logo: "java" },
  Go: { label: "Go", color: "00ADD8", logo: "go" },
  "C++": { label: "C++", color: "00599C", logo: "cplusplus" },
  JavaScript: { label: "JavaScript", color: "F7DF1E", logo: "javascript" },
  TypeScript: { label: "TypeScript", color: "3178C6", logo: "typescript" },
  React: { label: "React.js", color: "61DAFB", logo: "react" },
  "Next.js": { label: "Next.js", color: "000000", logo: "nextdotjs" },
  "Three.js": { label: "Three.js", color: "000000", logo: "threedotjs" },
  Framer_Motion: { label: "Framer Motion", color: "0055FF", logo: "framer" },
  GSAP: { label: "GSAP", color: "88CE02", logo: "greensock" },
  Tailwind_CSS: { label: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss" },
  Electron: { label: "Electron", color: "47848F", logo: "electron" },
  JavaFX: { label: "JavaFX", color: "000000", logo: "java" },
  "Node.js": { label: "Node.js", color: "339933", logo: "nodedotjs" },
  "Express.js": { label: "Express.js", color: "000000", logo: "express" },
  Django: { label: "Django", color: "092E20", logo: "django" },
  Flask: { label: "Flask", color: "000000", logo: "flask" },
  FastAPI: { label: "FastAPI", color: "009688", logo: "fastapi" },
  Spring_Boot: { label: "Spring Boot", color: "6DB33F", logo: "springboot" },
  REST: { label: "REST", color: "000000", logo: "fastapi" },
  GraphQL: { label: "GraphQL", color: "E10098", logo: "graphql" },
  JWT: { label: "JWT", color: "000000", logo: "jsonwebtokens" },
  OAuth_2: { label: "OAuth 2.0", color: "000000", logo: "auth0" },
  "Socket.io": { label: "Socket.io", color: "010101", logo: "socketdotio" },
  Spring_Security: { label: "Spring Security", color: "6DB33F", logo: "springsecurity" },
  PostgreSQL: { label: "PostgreSQL", color: "4169E1", logo: "postgresql" },
  pgvector: { label: "pgvector", color: "4169E1", logo: "postgresql" },
  PostGIS: { label: "PostGIS", color: "4169E1", logo: "postgresql" },
  MySQL: { label: "MySQL", color: "4479A1", logo: "mysql" },
  MongoDB: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  SQLite: { label: "SQLite", color: "003B57", logo: "sqlite" },
  Drizzle: { label: "Drizzle ORM", color: "C5F74F", logo: "drizzle" },
  Flyway: { label: "Flyway", color: "CC0200", logo: "flyway" },
  LangGraph: { label: "LangGraph", color: "1C3C3C", logo: "langchain" },
  Claude_API: { label: "Claude API", color: "D97757", logo: "claude" },
  Gemini_API: { label: "Gemini API", color: "8E75B2", logo: "google" },
  Groq: { label: "Groq (Llama 3.1)", color: "F55036", logo: "groq" },
  RAG: { label: "RAG", color: "000000", logo: "huggingface" },
  Sentence_Transformers: { label: "sentence-transformers", color: "FFD21E", logo: "huggingface" },
  FAISS: { label: "FAISS", color: "0467DF", logo: "meta" },
  NLP: { label: "NLP", color: "000000", logo: "huggingface" },
  Docker: { label: "Docker", color: "2496ED", logo: "docker" },
  Git: { label: "Git", color: "F05032", logo: "git" },
  GitHub: { label: "GitHub", color: "181717", logo: "github" },
  Google_Cloud: { label: "Google Cloud", color: "4285F4", logo: "googlecloud" },
  AWS: { label: "AWS", color: "232F3E", logo: "amazonwebservices" },
  Redis: { label: "Redis", color: "FF4438", logo: "redis" },
  Vercel: { label: "Vercel", color: "000000", logo: "vercel" },
  Kali_Linux: { label: "Kali Linux", color: "268BEE", logo: "kalilinux" },
  Nmap: { label: "Nmap", color: "0E83CD", logo: "nmap" },
  Wireshark: { label: "Wireshark", color: "1679A7", logo: "wireshark" },
};

// AMBER signals security/privacy — the one deliberate palette break
const AMBER_CATEGORIES = ["Security_Privacy"];

const skills = {
  Languages: ["Python", "Java", "Go", "C++", "JavaScript", "TypeScript"],
  Frontend: ["React", "Next.js", "Three.js", "Framer_Motion", "GSAP", "Tailwind_CSS", "Electron", "JavaFX"],
  Backend: ["Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring_Boot"],
  APIs_Auth: ["REST", "GraphQL", "JWT", "OAuth_2", "Socket.io", "Spring_Security"],
  Databases: ["PostgreSQL", "pgvector", "PostGIS", "MySQL", "MongoDB", "SQLite", "Drizzle", "Flyway"],
  AI_LLM: ["LangGraph", "Claude_API", "Gemini_API", "Groq", "RAG", "Sentence_Transformers", "FAISS", "NLP"],
  Cloud_DevOps: ["Docker", "Git", "GitHub", "Google_Cloud", "AWS", "Redis", "Vercel"],
  Security_Privacy: ["Kali_Linux", "Nmap", "Wireshark"],
};

const leftColumn = ["Languages", "Frontend", "Backend", "Security_Privacy"];
const rightColumn = ["APIs_Auth", "Databases", "AI_LLM", "Cloud_DevOps"];

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
