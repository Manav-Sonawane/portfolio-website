export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  accent: string;
  tech: string[];
  role: string;
  highlights: string[];
  github: string;
  live: string | null;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "Citioyen",
    title: "Citioyen",
    tagline: "AI-powered civic issue reporting platform",
    category: "AI · Full-stack",
    accent: "#7c6cff",
    tech: ["React 19", "Express 5", "TypeScript", "PostgreSQL", "Gemini API", "Docker", "GCP"],
    role: "Full-Stack Developer",
    highlights: [
      "Built an AI-powered civic issue reporting platform end-to-end, integrating the Gemini API for issue categorization, severity scoring, and resolution verification with human override.",
      "Implemented pgvector (HNSW) duplicate detection and deployed a containerized full stack on Google Cloud Run with Cloud SQL and OAuth 2.0 authentication.",
    ],
    github: "https://github.com/Manav-Sonawane/citioyen",
    live: null,
    featured: true,
  },
  {
    slug: "SeaSarathi",
    title: "SeaSarathi",
    tagline: "Agentic AI fishing advisory for Indian coastal fishermen",
    category: "Agentic AI",
    accent: "#2ee6c5",
    tech: ["FastAPI", "LangGraph", "Claude 3.5 Sonnet", "GeoPandas"],
    role: "Full-Stack Developer",
    highlights: [
      "Built an agentic AI fishing-advisory app for Indian coastal fishermen, orchestrating safety and fishing-zone recommendations via LangGraph and Claude 3.5 Sonnet over live and historical marine data.",
    ],
    github: "https://github.com/Manav-Sonawane/SeaSarathi",
    live: null,
    featured: true,
  },
  {
    slug: "MAArK",
    title: "MAArK",
    tagline: "Privacy-first search engine and desktop browser",
    category: "Security · Desktop",
    accent: "#ffb454",
    tech: ["Java", "Maven", "JavaFX", "Electron IPC"],
    role: "Backend Developer",
    highlights: [
      "Led backend development of a privacy-first desktop browser using Java and Electron IPC.",
      "Architected triple-tier IP masking, per-tab session isolation, and anti-fingerprinting.",
      "Added breach detection via HaveIBeenPwned.",
    ],
    github: "https://github.com/Manav-Sonawane/MAArK",
    live: null,
    featured: true,
  },
  {
    slug: "Codered-IO",
    title: "Codered IO",
    tagline: "Browser arcade with four 2D and 3D multiplayer games",
    category: "Real-time · Games",
    accent: "#ff6b9a",
    tech: ["React", "Three.js", "Socket.io", "Express.js", "MongoDB"],
    role: "Full-Stack Developer",
    highlights: [
      "Built a browser-based arcade platform with four 2D/3D games at the Devhacks hackathon.",
      "Implemented real-time multiplayer sync using Socket.io.",
      "Designed 3D game rendering and interactions using Three.js.",
    ],
    github: "https://github.com/Manav-Sonawane/CodeRed.io",
    live: "https://codered-io.onrender.com",
  },
  {
    slug: "PlayStation-UI-Revamp",
    title: "PlayStation UI Revamp",
    tagline: "Social-first gaming dashboard — MockUp'26 Top 8",
    category: "Frontend · Hackathon",
    accent: "#4d8dff",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP"],
    role: "Frontend Developer",
    highlights: [
      "Reimagined a streaming-platform-style UI as a social-first gaming dashboard in a 5-hour hackathon sprint — MockUp'26, Top 8 finish (Team CodeSI).",
    ],
    github: "https://github.com/Manav-Sonawane/Playstation-Revamp",
    live: null,
  },
  {
    slug: "CareerForge-AI",
    title: "CareerForge AI",
    tagline: "NLP resume analyzer for skill-gap analysis",
    category: "NLP · Backend",
    accent: "#c6ff4d",
    tech: ["Python", "Flask", "Gemini API", "NLP"],
    role: "Full-Stack Developer",
    highlights: [
      "Built an NLP-based resume parser (PyTesseract OCR + Gemini API) for skill-gap analysis and career recommendations.",
    ],
    github: "https://github.com/Manav-Sonawane/CareerForge_AI",
    live: null,
  },
  {
    slug: "BookMySeat",
    title: "BookMySeat",
    tagline: "Concurrency-safe movie ticket booking platform",
    category: "Backend · Full-stack",
    accent: "#ff8a4c",
    tech: ["Django", "Python", "PostgreSQL", "Redis"],
    role: "Full-Stack Developer",
    highlights: [
      "Implemented concurrency-safe seat reservation, Redis-backed session caching, JWT/OAuth authentication, payment gateway integration, and automated email confirmations.",
      "Built an admin panel with analytics dashboards and movie management, with Cron-scheduled jobs for routine data upkeep.",
    ],
    github: "https://github.com/Manav-Sonawane/BookMySeat",
    live: null,
  },
];
