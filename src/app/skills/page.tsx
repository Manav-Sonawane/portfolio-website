const skills = {
  langauges: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  frameworks: ["Node.js", "Express.js", "Django", "Flask", "React"],
  tools: ["Git", "Docker", "PostgreSQL", "MongoDB", "AWS", "MySQL"],
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
