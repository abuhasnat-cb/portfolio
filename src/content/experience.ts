import type { Experience } from "./types";

export const experience: Experience = {
  current: {
    org: "CodersBucket Limited",
    orgId: "org-codersbucket",
    orgUrl: "https://codersbucket.com/",
    badge: "CB",
    role: "Software Engineer · Full-stack",
    dates: "Oct 2025 — Present",
    current: true,
    impact: [
      "Adopted agentic AI workflows (Cursor, Claude, MCP, multi-agent), with review of every agent-written change and E2E tests, cutting delivery time by ==~60–70%==.",
      "Shipped features, A/B tests and Amplitude tracking for Simply Eloped (US) in Agile sprints with the US team.",
      "Built GymCity’s marketplace, booking and role-based dashboards (Next.js, Laravel) and Ryogen AI’s bootcamp platform with OAuth and payments.",
      "Created CB Agent, a company-wide RAG agent (n8n, Qdrant, Gemini, Slack); analytics for Swalitime and chatbot UX for Tavixa.",
    ],
  },
  earlierNote: "Earlier work · since May 2023",
  earlier: [
    {
      org: "SolutionSpin Limited",
      orgId: "org-solutionspin",
      orgUrl: "https://solutionspin.com/",
      badge: "SS",
      desc: "Software Engineer · Alljobs by Teletalk (700,000+ monthly users), BRACNet ERP HRM with RBAC, JSTU accounting system, client meetings and product demos",
      dates: "May 2024 — Sep 2025",
      kind: "work",
    },
    {
      org: "Tech Solution Factory",
      orgId: "org-tech",
      orgUrl: "https://techsolutionfactory.com/",
      badge: "TS",
      desc: "Front-end Developer (Contractual) · Smart Jute Information Software for the Ministry of Jute & Textile, Shippers' Council Bangladesh website",
      dates: "Dec 2023 — Mar 2024",
      kind: "work",
    },
    {
      org: "Ascent Group",
      orgId: "org-ascent",
      orgUrl: "https://ascent-bd.com/",
      badge: "AG",
      desc: "Trainee Software Engineer · Google Calendar two-way sync for Workfreeli",
      dates: "May 2023 — Dec 2023",
      kind: "work",
    },
    {
      org: "North South University",
      orgId: "org-nsu",
      orgUrl: "https://www.northsouth.edu/",
      badge: "NS",
      desc: "Education · BSc in Computer Science & Engineering",
      dates: "2022",
      kind: "education",
    },
  ],
};
