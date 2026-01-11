const skills = {
  Languages: ["Python", "JavaScript", "Java", "C++", "SQL"],

  Backend: ["Django", "FastAPI", "Flask", "Node.js", "Express.js"],

  Frontend: ["HTML", "CSS", "Tailwind CSS", "Bootstrap"],

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

export default function Skills() {
  return (
    <main className="px-6 py-12 max-w-3xl">
      <p className="text-green-400 mb-4">manav@portfolio:~/skills$</p>

      <h2 className="text-2xl font-semibold mb-6">Skills</h2>

      {Object.entries(skills).map(([category, items]) => (
        <section key={category} className="mb-6">
          <h3 className="text-lg text-green-400 mb-2">{category}</h3>

          <ul className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <li
                key={skill}
                className="border border-gray-600 px-3 py-1 text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
