"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { useProfile } from "@/lib/useProfile";

export default function About() {
  const { profile } = useProfile();
  const t = useTranslations("about");
  const locale = useLocale();

  const aboutMe  = locale === "th" ? (profile.about_th || profile.about_en) : profile.about_en;
  const location = locale === "th" ? (profile.location_th || profile.location_en) : profile.location_en;
  const jobTitle = locale === "th" ? (profile.job_title_th || profile.job_title_en) : profile.job_title_en;

  const stats = [
    { value: `${profile.years_of_experience || 3}+`, label: t("stats.experience") },
    { value: "20+", label: t("stats.projects") },
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
        <SectionHeader
          accent={t("accent")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="space-y-5 text-foreground/80 leading-relaxed"
          >
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

            <ul className="space-y-2 pt-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 shrink-0">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a href="#contact" className="btn-primary inline-block">{t("cta")}</a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-6 text-center hover:border-primary-500/40 transition-colors duration-300"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="card col-span-2 p-5 font-mono text-sm"
            >
              <div className="flex gap-1.5 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <p className="text-muted-foreground/70"><span className="text-accent-400">const</span> <span className="text-primary-300">developer</span> <span className="text-muted-foreground">{"= {"}</span></p>
              <p className="pl-4 text-muted-foreground"><span className="text-green-400">name</span><span className="text-muted-foreground/70">: </span><span className="text-yellow-300">&quot;{String(profile.name) || "Your Name"}&quot;</span>,</p>
              <p className="pl-4 text-muted-foreground"><span className="text-green-400">role</span><span className="text-muted-foreground/70">: </span><span className="text-yellow-300">&quot;{jobTitle || "Full Stack Dev"}&quot;</span>,</p>
              <p className="pl-4 text-muted-foreground"><span className="text-green-400">available</span><span className="text-muted-foreground/70">: </span><span className="text-blue-400">{profile.available_for_hire ? "true" : "false"}</span>,</p>
              <p className="text-muted-foreground">{"}"}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
