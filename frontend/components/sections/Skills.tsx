"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import type { Skill } from "@/types";

type CategoryKey = Skill["category"];

const CATEGORY_BORDER: Record<CategoryKey, string> = {
  frontend: "border-primary-500",
  backend:  "border-accent-500",
  devops:   "border-emerald-500",
  other:    "border-border",
};

const CATEGORY_FILL: Record<CategoryKey, string> = {
  frontend: "bg-primary-500",
  backend:  "bg-accent-500",
  devops:   "bg-emerald-500",
  other:    "bg-border",
};

function LevelBar({ level, fillClass }: { level: number; fillClass: string }) {
  return (
    <div className="w-16 h-1 rounded-full bg-border overflow-hidden shrink-0" aria-hidden="true">
      <div className={`h-full rounded-full ${fillClass}`} style={{ width: `${level}%` }} />
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.get<{ data: Skill[] }>("/skills").then((res) => setSkills(res.data.data));
  }, []);

  const categories: { key: CategoryKey; label: string; border: string; fill: string }[] = [
    { key: "frontend", label: t("frontend"), border: CATEGORY_BORDER.frontend, fill: CATEGORY_FILL.frontend },
    { key: "backend",  label: t("backend"),  border: CATEGORY_BORDER.backend,  fill: CATEGORY_FILL.backend  },
    { key: "devops",   label: t("devops"),   border: CATEGORY_BORDER.devops,   fill: CATEGORY_FILL.devops   },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/20">
      <div className="section-container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            return (
              <div key={cat.key}>
                <h3 className={`text-base font-display font-semibold text-foreground pb-3 mb-5 border-b-2 ${cat.border}`}>
                  {cat.label}
                </h3>

                <ul className="space-y-4">
                  {catSkills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{skill.icon}</span>
                        <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <LevelBar level={skill.level} fillClass={cat.fill} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
