"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import type { Skill } from "@/types";

type CategoryKey = Skill["category"];

const CATEGORY_STYLES: Record<CategoryKey, string> = {
  frontend: "text-primary-400 bg-primary-500/10 border-primary-500/25",
  backend:  "text-accent-400 bg-accent-500/10 border-accent-500/25",
  devops:   "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  other:    "text-muted-foreground bg-muted/60 border-border",
};

function DotRating({ level }: { level: number }) {
  const filled = Math.round(level / 20);
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${i < filled ? "bg-primary-500" : "bg-border"}`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.get<{ data: Skill[] }>("/skills").then((res) => setSkills(res.data.data));
  }, []);

  const categories: { key: CategoryKey; label: string; color: string }[] = [
    { key: "frontend", label: t("frontend"), color: CATEGORY_STYLES.frontend },
    { key: "backend",  label: t("backend"),  color: CATEGORY_STYLES.backend  },
    { key: "devops",   label: t("devops"),   color: CATEGORY_STYLES.devops   },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/20">
      <div className="section-container">
        <SectionHeader
          accent={t("accent")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {categories.map((cat, ci) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.12, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[10px] font-mono font-semibold tracking-widest uppercase px-2.5 py-1 rounded border ${cat.color}`}>
                    {cat.label}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <ul className="space-y-4">
                  {catSkills.map((skill, i) => (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.12 + i * 0.07, duration: 0.4 }}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{skill.icon}</span>
                        <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <DotRating level={skill.level} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Also familiar with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-6"
        >
          <p className="text-muted-foreground/70 text-[11px] font-mono tracking-[0.3em] uppercase mb-4">
            {t("alsoFamiliarWith")}
          </p>
          <div className="flex flex-wrap gap-2">
            {["Redis", "Nginx", "REST API", "GraphQL", "Jest", "PHPUnit", "Figma", "Postman", "GitHub Actions", "Vercel", "AWS S3"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm text-muted-foreground bg-muted/60 border border-border
                           rounded hover:border-primary-500/40 hover:text-primary-300
                           transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
