export interface Experience {
  period: string;
  role: string;
  org: string;
  points: string[];
}

export const leftColumn: Experience[] = [
  {
    period: "Dec 2025 – Jan 2026",
    role: "Full Stack Web Developer Intern",
    org: "ElevanceSkills Technologies",
    points: [
      "Developed BookMySeat movie ticket booking platform using Django.",
      "Implemented concurrency control, session caching, authentication, payment gateway integration.",
      "Built an admin panel with analytics dashboards and movie management features.",
    ],
  },
  {
    period: "Apr 2025 – Present",
    role: "Technical Team Member",
    org: "TSEC CodeStorm",
    points: [
      "Worked on UI revamps and frontend improvements",
      "Organized hackathons and technical events",
      "Contributed to open-source initiatives",
    ],
  },
];

export const rightColumn: Experience[] = [
  {
    period: "Jul 2025 – Oct 2025",
    role: "Technical Project Manager Intern",
    org: "ESPECA Technologies",
    points: [
      "Led a team of seven developers using ClickUp for project coordination.",
      "Contributed to backend development using Flask, FastAPI and MySQL.",
      "Designed REST APIs and optimized database queries for better performance.",
    ],
  },
  {
    period: "Dec 2025 – May 2026",
    role: "Student Ambassador / Insider",
    org: "Ai+ Smartphone",
    points: [
      "Representing AI+ on campus as a student ambassador.",
      "Promoting AI-driven smartphone technology.",
      "Conducting demos, sessions, and outreach programs.",
    ],
  },
];
