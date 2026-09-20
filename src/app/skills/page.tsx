"use client";

import { useState } from "react";
import SplitReveal from "@/components/fx/SplitReveal";
import ScrollReveal from "@/components/fx/ScrollReveal";
import GlassPanel from "@/components/fx/GlassPanel";
import Marquee from "@/components/fx/Marquee";
import BigCTA from "@/components/BigCTA";

type Badge = { label: string; color: string; logo?: string };

const badgeConfig: Record<string, Badge> = {
  Python: { label: "Python", color: "3776AB", logo: "python" },
  Java: { label: "Java", color: "ED8B00", logo: "openjdk" },
  Go: { label: "Go", color: "00ADD8", logo: "go" },
  "C++": { label: "C++", color: "00599C", logo: "cplusplus" },
  JavaScript: { label: "JavaScript", color: "F7DF1E", logo: "javascript" },
  TypeScript: { label: "TypeScript", color: "3178C6", logo: "typescript" },
  React: { label: "React.js", color: "61DAFB", logo: "react" },
  "Next.js": { label: "Next.js", color: "FFFFFF", logo: "nextdotjs" },
  "Three.js": { label: "Three.js", color: "FFFFFF", logo: "threedotjs" },
  Framer_Motion: { label: "Framer Motion", color: "0055FF", logo: "framer" },
  GSAP: { label: "GSAP", color: "88CE02", logo: "greensock" },
  Tailwind_CSS: { label: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss" },
  Electron: { label: "Electron", color: "47848F", logo: "electron" },
  JavaFX: { label: "JavaFX", color: "ED8B00", logo: "openjdk" },
  "Node.js": { label: "Node.js", color: "339933", logo: "nodedotjs" },
  "Express.js": { label: "Express.js", color: "FFFFFF", logo: "express" },
  Django: { label: "Django", color: "44B78B", logo: "django" },
  Flask: { label: "Flask", color: "FFFFFF", logo: "flask" },
  FastAPI: { label: "FastAPI", color: "009688", logo: "fastapi" },
  Spring_Boot: { label: "Spring Boot", color: "6DB33F", logo: "springboot" },
  REST: { label: "REST", color: "C6FF4D" },
  GraphQL: { label: "GraphQL", color: "E10098", logo: "graphql" },
  JWT: { label: "JWT", color: "D63AFF", logo: "jsonwebtokens" },
  OAuth_2: { label: "OAuth 2.0", color: "C6FF4D" },
  "Socket.io": { label: "Socket.io", color: "FFFFFF", logo: "socketdotio" },
  Spring_Security: { label: "Spring Security", color: "6DB33F", logo: "springsecurity" },
  PostgreSQL: { label: "PostgreSQL", color: "4169E1", logo: "postgresql" },
  pgvector: { label: "pgvector", color: "4169E1", logo: "postgresql" },
  PostGIS: { label: "PostGIS", color: "4169E1", logo: "postgresql" },
  MySQL: { label: "MySQL", color: "4479A1", logo: "mysql" },
  MongoDB: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  SQLite: { label: "SQLite", color: "44A5D8", logo: "sqlite" },
  Drizzle: { label: "Drizzle ORM", color: "C5F74F", logo: "drizzle" },
  Flyway: { label: "Flyway", color: "CC0200", logo: "flyway" },
  LangGraph: { label: "LangGraph", color: "1C9B86", logo: "langchain" },
  Claude_API: { label: "Claude API", color: "D97757", logo: "claude" },
  Gemini_API: { label: "Gemini API", color: "8E75B2", logo: "googlegemini" },
  Groq: { label: "Groq (Llama 3.1)", color: "F55036" },
  RAG: { label: "RAG", color: "C6FF4D" },
  Sentence_Transformers: { label: "sentence-transformers", color: "FFD21E", logo: "huggingface" },
  FAISS: { label: "FAISS", color: "0467DF", logo: "meta" },
  NLP: { label: "NLP", color: "C6FF4D" },
  Docker: { label: "Docker", color: "2496ED", logo: "docker" },
  Git: { label: "Git", color: "F05032", logo: "git" },
  GitHub: { label: "GitHub", color: "FFFFFF", logo: "github" },
  Google_Cloud: { label: "Google Cloud", color: "4285F4", logo: "googlecloud" },
  AWS: { label: "AWS", color: "FF9900" },
  Redis: { label: "Redis", color: "FF4438", logo: "redis" },
  Vercel: { label: "Vercel", color: "FFFFFF", logo: "vercel" },
  Kali_Linux: { label: "Kali Linux", color: "268BEE", logo: "kalilinux" },
  Nmap: { label: "Nmap", color: "0E83CD" },
  Wireshark: { label: "Wireshark", color: "1679A7", logo: "wireshark" },
};

// AMBER signals security/privacy — the one deliberate palette break
const AMBER_CATEGORIES = ["Security_Privacy"];

const skills: Record<string, string[]> = {
  Languages: ["Python", "Java", "Go", "C++", "JavaScript", "TypeScript"],
  Frontend: ["React", "Next.js", "Three.js", "Framer_Motion", "GSAP", "Tailwind_CSS", "Electron", "JavaFX"],
  Backend: ["Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring_Boot"],
  APIs_Auth: ["REST", "GraphQL", "JWT", "OAuth_2", "Socket.io", "Spring_Security"],
  Databases: ["PostgreSQL", "pgvector", "PostGIS", "MySQL", "MongoDB", "SQLite", "Drizzle", "Flyway"],
  AI_LLM: ["LangGraph", "Claude_API", "Gemini_API", "Groq", "RAG", "Sentence_Transformers", "FAISS", "NLP"],
  Cloud_DevOps: ["Docker", "Git", "GitHub", "Google_Cloud", "AWS", "Redis", "Vercel"],
  Security_Privacy: ["Kali_Linux", "Nmap", "Wireshark"],
};

// Bento layout: [category, grid span classes]
const layout: [string, string][] = [
  ["AI_LLM", "md:col-span-7"],
  ["Languages", "md:col-span-5"],
  ["Frontend", "md:col-span-6"],
  ["Backend", "md:col-span-6"],
  ["Databases", "md:col-span-4"],
  ["APIs_Auth", "md:col-span-4"],
  ["Cloud_DevOps", "md:col-span-4"],
  ["Security_Privacy", "md:col-span-12"],
];

// Skills actively in use — pulse a live dot
const ACTIVE_SKILLS = ["TypeScript", "FastAPI", "Google_Cloud", "Gemini_API", "LangGraph"];

function SkillPill({ skill, amber }: { skill: string; amber?: boolean }) {
  const cfg = badgeConfig[skill];
  const [failed, setFailed] = useState(false);
  if (!cfg) return null;
  const active = ACTIVE_SKILLS.includes(skill);
  const brand = amber ? "ffb454" : cfg.color;

  return (
    <li
      className="group/pill relative flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-3 pr-4 font-mono text-[0.78rem] text-paper/85 transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] hover:text-paper"
      style={{ ["--brand" as string]: `#${brand}` }}
    >
      {cfg.logo && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${cfg.logo}/${brand}`}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-4 w-4 opacity-55 grayscale transition-all duration-500 group-hover/pill:opacity-100 group-hover/pill:grayscale-0"
        />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] opacity-70" />
      )}
      {cfg.label}
      {active && <span className="live-dot !h-[6px] !w-[6px]" title="Actively using" />}
    </li>
  );
}

export default function Skills() {
  const allLabels = Object.values(badgeConfig).map((b) => b.label);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 sm:px-10 md:pt-44">
        <ScrollReveal intro y={14}>
          <p className="label mb-8">~/skills</p>
        </ScrollReveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitReveal as="h1" intro className="display-xl max-w-[12ch]">
            Tools of the <em>trade.</em>
          </SplitReveal>
          <ScrollReveal intro delay={0.4}>
            <p className="prose-lead max-w-sm">
              From schema to interface to LLM agent. <span className="inline-flex items-center gap-2 text-paper"><span className="live-dot" /> marks what I&apos;m using right now.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10">
        <ScrollReveal stagger={0.07} y={50} className="grid gap-4 md:grid-cols-12">
          {layout.map(([cat, span], i) => {
            const amber = AMBER_CATEGORIES.includes(cat);
            const items = skills[cat];
            return (
              <GlassPanel key={cat} className={`p-7 sm:p-8 ${span}`}>
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className={`display-md ${amber ? "text-amber" : ""}`}>{cat === "AI_LLM" ? "AI / LLM" : cat.replace(/_/g, " & ")}</h2>
                  <span className="whitespace-nowrap font-mono text-[0.7rem] text-dim">
                    {String(i + 1).padStart(2, "0")} · {items.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {items.map((s) => (
                    <SkillPill key={s} skill={s} amber={amber} />
                  ))}
                </ul>
              </GlassPanel>
            );
          })}
        </ScrollReveal>
      </section>

      <div className="mt-16 border-y border-white/10 py-7">
        <Marquee items={allLabels} duration={120} className="display-md text-outline" itemClassName="italic" />
      </div>

      <BigCTA />
    </main>
  );
}
