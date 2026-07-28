import Image from "next/image";

const badgeConfig: Record<
  string,
  { label: string; color: string; logo: string }
> = {
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
};

const skills = {
  Languages: ["Python", "JavaScript", "Java", "C++", "TypeScript"],
  Backend: ["Django", "FastAPI", "Flask", "Node.js", "Express.js"],
  Frontend: ["React", "Next.js", "Three.js", "Electron", "JavaFX"],
  Databases: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Drizzle"],
  Cloud_DevOps: ["Git", "GitHub", "Docker", "Google_Cloud", "AWS"],
  AI_Tools: ["Gemini_API", "HuggingFace", "Transformers"],
};

const leftColumn = ["Languages", "Backend", "Frontend"];
const rightColumn = ["Databases", "Cloud_DevOps", "AI_Tools"];

function SkillSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-6 pb-4 border-b border-gray-800 last:border-none">
      <h3 className="text-base text-green-400 mb-2">{title.replace("_", " ")}</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((skill) => {
          const config = badgeConfig[skill];
          if (!config) return null;

          const src = `https://img.shields.io/badge/${encodeURIComponent(
            config.label,
          )}-${config.color}?style=for-the-badge&logo=${
            config.logo
          }&logoColor=white`;

          return (
            <Image
              key={skill}
              src={src}
              alt={config.label}
              width={120}
              height={32}
              unoptimized
              className="
    h-8 w-auto
    transition
    duration-200
    ease-out
    brightness-50
    hover:-translate-y-1
    hover:brightness-100
    hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.35)]
  "
            />
          );
        })}
      </div>
    </section>
  );
}

export default function Skills() {
  return (
    <main className="flex-1 px-6 py-8 flex flex-col justify-center w-full">
      <section className="max-w-[1400px] mx-auto">
        <p className="text-green-400 mb-2 text-sm">manav@portfolio:~/skills$</p>

        <h2 className="text-5xl font-semibold mb-6">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {leftColumn.map((category) => (
              <SkillSection
                key={category}
                title={category}
                items={skills[category as keyof typeof skills]}
              />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {rightColumn.map((category) => (
              <SkillSection
                key={category}
                title={category}
                items={skills[category as keyof typeof skills]}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
