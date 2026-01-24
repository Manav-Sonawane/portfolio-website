export interface Experience {
  period: string;
  role: string;
  org: string;
  points: string[];
}

export const leftColumn: Experience[] = [
  {
    period: "Dec 2025 – Present",
    role: "AI+ Student Ambassador",
    org: "AI+ Smartphone",
    points: [
      "Representing AI+ on campus as a student ambassador",
      "Promoting AI-driven smartphone technology",
      "Conducting demos, sessions, and outreach programs",
      "Building leadership and public communication skills",
    ],
  },
  {
    period: "Dec 2025 – Jan 2026",
    role: "Full Stack Web Developer Intern",
    org: "ElevanceSkills Technologies",
    points: [
      "Built BookMySeat — a full-stack movie ticket booking platform",
      "Implemented concurrency control and session handling",
      "Integrated payment gateway and admin dashboard",
      "Worked with Django, PostgreSQL, Bootstrap",
    ],
  },
];

export const rightColumn: Experience[] = [
  {
    period: "Jul 2025 – Oct 2025",
    role: "Technical Project Manager Intern",
    org: "ESPECA Technologies",
    points: [
      "Led a 7-member technical team",
      "Handled sprint planning and task allocation",
      "Contributed to backend development and reviews",
      "Ensured timely delivery of features",
    ],
  },
  {
    period: "Apr 2025 – Present",
    role: "Technical Team Member",
    org: "CodeStorm – TSEC",
    points: [
      "Worked on UI revamps and frontend improvements",
      "Organized hackathons and technical events",
      "Contributed to open-source initiatives",
    ],
  },
];
