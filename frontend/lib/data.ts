import type { Skill, Experience, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Blog",       href: "#blog"       },
  { label: "Contact",    href: "#contact"    },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React",       icon: "⚛️",  level: 90, category: "frontend" },
  { name: "Next.js",     icon: "▲",   level: 85, category: "frontend" },
  { name: "TypeScript",  icon: "TS",  level: 80, category: "frontend" },
  { name: "Tailwind CSS",icon: "🎨",  level: 90, category: "frontend" },
  // Backend
  { name: "PHP Laravel", icon: "🔴",  level: 90, category: "backend"  },
  { name: "C# .NET Core",icon: "🟣",  level: 80, category: "backend"  },
  { name: "REST API",    icon: "🔌",  level: 90, category: "backend"  },
  { name: "MySQL",       icon: "🐬",  level: 85, category: "backend"  },
  // DevOps
  { name: "Docker",      icon: "🐳",  level: 75, category: "devops"   },
  { name: "Git",         icon: "🌿",  level: 85, category: "devops"   },
  { name: "Linux",       icon: "🐧",  level: 70, category: "devops"   },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Company Name",
    position: "Full Stack Developer",
    period: "2022 — Present",
    description: [
      "Developed and maintained web applications using React and Laravel",
      "Designed RESTful APIs consumed by mobile and web clients",
      "Improved performance of legacy PHP systems by 40%",
    ],
    tech: ["React", "Laravel", "MySQL", "Docker"],
  },
  {
    company: "Previous Company",
    position: "Junior Web Developer",
    period: "2021 — 2022",
    description: [
      "Built internal tools with C# .NET Core and React",
      "Collaborated with UX team to implement pixel-perfect designs",
    ],
    tech: ["C# .NET Core", "React", "SQL Server"],
  },
];
