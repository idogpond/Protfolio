"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useProfile } from "@/lib/useProfile";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function Hero() {
  const { profile } = useProfile();
  const t = useTranslations("hero");
  const locale = useLocale();
  const nameParts = profile.name?.split(" ") ?? ["Your", "Name"];

  const isAvailable = profile.available_for_hire === true;

  const jobTitle    = locale === "th" ? (profile.job_title_th || profile.job_title_en) : profile.job_title_en;
  const bio         = locale === "th" ? (profile.bio_th       || profile.bio_en)       : profile.bio_en;
  const resumeLabel = locale === "th" ? (profile.resume_label_th || "ดาวน์โหลด CV")    : (profile.resume_label_en || t("downloadCV"));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-grid-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full bg-primary-500/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-accent-500/4 blur-3xl -z-10 pointer-events-none" />

      <div className="section-container w-full py-20 lg:py-28">
        {/* Available badge */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate="show" className="mb-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          border border-border bg-card/60 text-muted-foreground
                          text-[11px] font-mono tracking-widest uppercase"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground/30"}`} />
            {isAvailable ? t("available") : t("notAvailable")}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="show"
          className="text-muted-foreground/70 font-mono text-xs tracking-[0.25em] uppercase mb-6"
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <div className="mb-7">
          {nameParts.map((part, i) => (
            <motion.div key={i} variants={fadeUp(0.15 + i * 0.13)} initial="hidden" animate="show">
              <span
                className={`block font-display font-extrabold leading-[0.88] tracking-tight ${
                  i === nameParts.length - 1 ? "gradient-text" : "text-foreground"
                }`}
                style={{ fontSize: "clamp(3.5rem, 11vw, 8.5rem)" }}
              >
                {part}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp(0.52)} initial="hidden" animate="show" className="w-16 h-0.5 bg-primary-500 mb-8" />

        {/* Job title */}
        <motion.h2
          variants={fadeUp(0.62)}
          initial="hidden"
          animate="show"
          className="text-xl sm:text-2xl text-foreground/80 font-medium mb-4 max-w-xl leading-relaxed"
        >
          {jobTitle ?? "Full Stack Web Developer"}
        </motion.h2>

        {/* Bio */}
        <motion.p
          variants={fadeUp(0.72)}
          initial="hidden"
          animate="show"
          className="text-muted-foreground/70 text-base leading-relaxed max-w-lg mb-10"
        >
          {bio ?? "3+ years crafting modern web applications with React, Laravel, and C# .NET Core."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.86)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary">{t("viewWork")}</a>
          <a href="#contact" className="btn-outline">{t("getInTouch")}</a>
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/70 hover:text-primary-400 text-sm font-mono transition-colors"
            >
              ↓ {resumeLabel}
            </a>
          )}
        </motion.div>

        {/* Tech tags */}
        <motion.div
          variants={fadeUp(1.0)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-2"
        >
          {["React", "Next.js", "TypeScript", "Laravel", "C# .NET", "Docker"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-muted-foreground/70 border border-border rounded
                         hover:border-primary-500/50 hover:text-primary-400 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-border to-transparent"
        />
        <span className="text-muted-foreground/30 text-[10px] font-mono tracking-[0.2em]">
          {t("scroll")}
        </span>
      </motion.div>
    </section>
  );
}
