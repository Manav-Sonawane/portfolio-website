export const profile = {
  name: "Manav Sonawane",
  headline: "Full-Stack Developer & AI Builder",
  location: "Mumbai, India",
  email: "sonawanemanav96@gmail.com",
  school: "Thadomal Shahani Engineering College",
  degree: "B.E. Information Technology",
  years: "2024 – 2028",
  cgpa: 9.12,
  about: [
    "I am a B.E. Information Technology student at Thadomal Shahani Engineering College (TSEC, Mumbai), currently in my third year (2024–2028) maintaining a CGPA of 9.12.",
    "I am a full-stack developer and AI builder, seeking hackathon teams, internships, and open-source collaboration. I have built concurrency-safe web systems (BookMySeat with Django, PostgreSQL and Redis) and led a team of seven developers during my internships at ElevanceSkills Technologies and ESPECA Technologies.",
    "My technical expertise spans Python, Java, Go, and TypeScript, AI/LLM tooling like LangGraph, the Claude and Gemini APIs, and RAG, databases like PostgreSQL (pgvector, HNSW, PostGIS), MongoDB, and MySQL, and cloud/DevOps platforms like Google Cloud (Cloud Run, Cloud SQL, Vertex AI), AWS, and Docker.",
    "Beyond engineering, I am a Technical Team Member at TSEC CodeStorm (led planning for Codessiance '26) and a Student Ambassador for Ai+ Smartphone. I hold a Google Cloud Skill Badge (Vertex AI) and am a Postman API Fundamentals Student Expert.",
  ],
  credentials: [
    { title: "Google Cloud Skill Badge", sub: "Vertex AI" },
    { title: "Postman API Fundamentals", sub: "Student Expert" },
    { title: "Ai+ Smartphone", sub: "Student Ambassador" },
    { title: "TSEC CodeStorm", sub: "Technical Team · Codessiance '26" },
  ],
};

export const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export const contacts = [
  { label: "Email", value: profile.email, link: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/Manav-Sonawane", link: "https://github.com/Manav-Sonawane" },
  { label: "LinkedIn", value: "linkedin.com/in/manav-sonawane", link: "https://linkedin.com/in/manav-sonawane" },
  { label: "LeetCode", value: "leetcode.com/Manav_Sonawane", link: "https://leetcode.com/Manav_Sonawane" },
  { label: "Instagram", value: "instagram.com/_manav_sonawane", link: "https://www.instagram.com/_manav_sonawane" },
  { label: "X", value: "x.com/Code_with_Manav", link: "https://x.com/Code_with_Manav" },
];

export const stack = [
  "Python", "Java", "TypeScript", "Go", "React", "Next.js", "FastAPI", "Django",
  "LangGraph", "Claude API", "Gemini API", "PostgreSQL", "pgvector", "Docker", "Google Cloud", "Redis",
];
