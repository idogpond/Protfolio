"use client";

import { useEffect, useState } from "react";
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
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="max-w-5xl mx-auto border-t border-border">
          {experiences.map((exp) => {
            const position    = locale === "th" ? (exp.position_th || exp.position_en) : exp.position_en;
            const period      = locale === "th" ? (exp.period_th || exp.period_en) : exp.period_en;
            const description = locale === "th" ? (exp.description_th?.length ? exp.description_th : exp.description_en) : exp.description_en;

            return (
              <div
                key={exp.id}
                className="py-8 border-b border-border grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-8"
              >
                <div className="font-mono text-xs text-muted-foreground/70 sm:pt-1">{period}</div>

                <div>
                  <h3 className="text-foreground font-semibold text-lg">{position}</h3>
                  <p className="text-primary-400 font-medium mb-3">{exp.company}</p>

                  <ul className="space-y-2 mb-4">
                    {description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                        <span className="text-muted-foreground/50 mt-0.5 shrink-0">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {(exp.tech ?? []).map((tech) => (
                      <span key={tech} className="text-xs font-mono text-muted-foreground/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
