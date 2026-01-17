import Image from "next/image";

const badgeConfig: Record<
  string,
  { label: string; color: string; logo: string }
> = {
  Python: { label: "Python", color: "3776AB", logo: "python" },
  JavaScript: { label: "JavaScript", color: "F7DF1E", logo: "javascript" },
  Java: { label: "Java", color: "007396", logo: "java" },
  "C++": { label: "C++", color: "00599C", logo: "cplusplus" },
  SQL: { label: "SQL", color: "4479A1", logo: "mysql" },
  Django: { label: "Django", color: "092E20", logo: "django" },
  FastAPI: { label: "FastAPI", color: "009688", logo: "fastapi" },
  Flask: { label: "Flask", color: "000000", logo: "flask" },
  "Node.js": { label: "Node.js", color: "339933", logo: "nodedotjs" },
  "Express.js": { label: "Express.js", color: "000000", logo: "express" },
  HTML: { label: "HTML5", color: "E34F26", logo: "html5" },
  CSS: { label: "CSS3", color: "1572B6", logo: "css3" },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    color: "06B6D4",
    logo: "tailwindcss",
  },
  Bootstrap: { label: "Bootstrap", color: "7952B3", logo: "bootstrap" },
  MySQL: { label: "MySQL", color: "4479A1", logo: "mysql" },
  PostgreSQL: { label: "PostgreSQL", color: "4169E1", logo: "postgresql" },
  Git: { label: "Git", color: "F05032", logo: "git" },
  GitHub: { label: "GitHub", color: "181717", logo: "github" },
  Docker: { label: "Docker", color: "2496ED", logo: "docker" },
  Postman: { label: "Postman", color: "FF6C37", logo: "postman" },
  "RESTful APIs": { label: "RESTful APIs", color: "009688", logo: "fastapi" },
  "Data Structures & Algorithms": {
    label: "DSA",
    color: "FF6B6B",
    logo: "thealgorithms",
  },
  "Full-Stack Development": {
    label: "Full Stack",
    color: "4CAF50",
    logo: "stackshare",
  },
  "Project Management": {
    label: "Project Management",
    color: "6C63FF",
    logo: "trello",
  },
  "Gemini API": { label: "Gemini API", color: "8E75B2", logo: "google" },
  DeepFace: { label: "DeepFace", color: "FF6F00", logo: "tensorflow" },
  PyTesseract: { label: "PyTesseract", color: "4285F4", logo: "google" },
  React: { label: "React", color: "61DAFB", logo: "react" },
  "Next.js": { label: "Next.js", color: "000000", logo: "nextdotjs" },
};

const skills = {
  Languages: ["Python", "JavaScript", "Java", "C++", "SQL"],

  Backend: ["Django", "FastAPI", "Flask", "Node.js", "Express.js"],

  Frontend: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "React", "Next.js"],

  Databases: ["MySQL", "PostgreSQL"],

  Tools: ["Git", "GitHub", "Docker", "Postman"],

  Concepts: [
    "RESTful APIs",
    "Data Structures & Algorithms",
    "Full-Stack Development",
    "Project Management",
  ],

  AI_Tools: ["Gemini API", "DeepFace", "PyTesseract"],
};

const leftColumn = ["Languages", "Backend", "Frontend"];
const rightColumn = ["Databases", "Tools", "Concepts", "AI_Tools"];

function SkillSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-12">
      <h3 className="text-lg text-green-400 mb-4">{title.replace("_", " ")}</h3>

      <div className="flex flex-wrap gap-3">
        {items.map((skill) => {
          const config = badgeConfig[skill];
          if (!config) return null;

          const src = `https://img.shields.io/badge/${encodeURIComponent(
            config.label
          )}-${config.color}?style=for-the-badge&logo=${
            config.logo
          }&logoColor=white`;

          return (
            <Image
              key={skill}
              src={src}
              alt={config.label}
              width={140}
              height={40}
              className="h-10 w-auto"
              unoptimized
            />
          );
        })}
      </div>
    </section>
  );
}

export default function Skills() {
  return (
    <main className="px-10 py-16 w-full">
      <section className="max-w-[1400px] mx-auto">
        <p className="text-green-400 mb-4">manav@portfolio:~/skills$</p>

        <h2 className="text-7xl font-semibold mb-12">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-[600px_1fr] gap-x-24">
          {/* LEFT COLUMN */}
          <div className="space-y-12">
            {leftColumn.map((category) => (
              <SkillSection
                key={category}
                title={category}
                items={skills[category as keyof typeof skills]}
              />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-12">
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
