"use client";

import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { useProfile } from "@/lib/useProfile";

export default function About() {
  const { profile } = useProfile();
  const t = useTranslations("about");
  const locale = useLocale();

  const aboutMe  = locale === "th" ? (profile.about_th || profile.about_en) : profile.about_en;
  const location = locale === "th" ? (profile.location_th || profile.location_en) : profile.location_en;

  const stats = [
    { value: `${profile.years_of_experience || 3}+`, label: t("stats.experience") },
    { value: "10+", label: t("stats.projects") },
    { value: "10+", label: t("stats.clients") },
    { value: "5+",  label: t("stats.stacks") },
  ];

  const highlights = [
    t("highlights.typescript"),
    t("highlights.api"),
    t("highlights.agile"),
    t("highlights.performance"),
  ];

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            {aboutMe
              ? aboutMe.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              : <p>{t("fallbackBio", { years: String(profile.years_of_experience || 3) })}</p>}

            {location && (
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </p>
            )}

            {profile.age != null && (
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {t("age", { age: profile.age })}
              </p>
            )}

            <ul className="space-y-2 pt-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-muted-foreground/50 mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a href="#contact" className="btn-primary inline-block">{t("cta")}</a>
            </div>
          </div>

          {/* Stats */}
          <div className="card divide-y divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between px-6 py-4">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <span className="text-2xl font-display font-bold text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
