"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import type { Experience } from "@/types";

export default function Experience() {
  const t      = useTranslations("experience");
  const locale = useLocale();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    api.get<{ data: Experience[] }>("/experiences")
      .then((res) => setExperiences(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="section-container">
        <SectionHeader accent={t("accent")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-border to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const position    = locale === "th" ? (exp.position_th || exp.position_en) : exp.position_en;
              const description = locale === "th" ? (exp.description_th?.length ? exp.description_th : exp.description_en) : exp.description_en;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-6 w-3.5 h-3.5 -translate-x-1/2 rounded-full
                                  bg-background border-2 border-primary-500 shadow-[0_0_8px_2px_rgba(245,158,11,0.25)]" />

                  <div className="card p-6 hover:border-primary-500/30 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-foreground font-semibold text-lg">{position}</h3>
                        <p className="text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="shrink-0 px-3 py-1 text-xs font-mono text-muted-foreground
                                       bg-muted border border-border rounded-full self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                          <span className="text-primary-500 mt-0.5 shrink-0">▹</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                      {(exp.tech ?? []).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
