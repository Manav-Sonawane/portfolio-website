export interface Experience {
  period: string;
  role: string;
  org: string;
  kind: string;
  current?: boolean;
  points: string[];
}

/** Ordered by most recent first. */
export const experiences: Experience[] = [
  {
    period: "Apr 2025 – Present",
    role: "Technical Team Member",
    org: "TSEC CodeStorm",
    kind: "Leadership",
    current: true,
    points: [
      "Led planning for Codessiance '26.",
      "Worked on UI revamps and frontend improvements.",
      "Organized hackathons and technical events.",
      "Contributed to open-source initiatives.",
    ],
  },
  {
    period: "Dec 2025 – May 2026",
    role: "Student Ambassador / Insider",
    org: "Ai+ Smartphone",
    kind: "Ambassador",
    points: [
      "Represented AI+ on campus as a student ambassador.",
      "Promoted AI-driven smartphone technology.",
      "Conducted demos, sessions, and outreach programs.",
    ],
  },
  {
    period: "Dec 2025 – Jan 2026",
    role: "Full Stack Web Developer Intern",
    org: "ElevanceSkills Technologies",
    kind: "Internship",
    points: [
      "Built BookMySeat end-to-end, a BookMyShow-style movie ticket booking platform, from Django backend and PostgreSQL schema through the customer-facing UI.",
      "Implemented concurrency-safe seat reservation, Redis-backed session caching, JWT/OAuth authentication, payment gateway integration, and automated email confirmations.",
      "Built an admin panel with analytics dashboards and movie management, and used Cron-scheduled jobs for routine data upkeep.",
    ],
  },
  {
    period: "Jul 2025 – Oct 2025",
    role: "Technical Project Manager Intern",
    org: "ESPECA Technologies",
    kind: "Internship",
    points: [
      "Led a team of seven developers end-to-end across sprint planning, risk management, and delivery using ClickUp.",
      "Contributed to backend development using Flask, FastAPI, and MySQL.",
      "Designed REST APIs and optimized database queries.",
    ],
  },
];
