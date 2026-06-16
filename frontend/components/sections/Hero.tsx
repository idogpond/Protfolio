"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
  const nameParts =
    (profile.name as string | undefined)?.split(" ") ?? ["Your", "Name"];

  const isAvailable =
    profile.available_for_hire === true || profile.available_for_hire === "true";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3f3f4618 1px, transparent 1px)",
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
                          border border-dark-800 bg-dark-900/60 text-dark-400
                          text-[11px] font-mono tracking-widest uppercase"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-dark-600"}`} />
            {isAvailable ? t("available") : t("notAvailable")}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="show"
          className="text-dark-500 font-mono text-xs tracking-[0.25em] uppercase mb-6"
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <div className="mb-7">
          {nameParts.map((part, i) => (
            <motion.div key={i} variants={fadeUp(0.15 + i * 0.13)} initial="hidden" animate="show">
              <span
                className={`block font-display font-extrabold leading-[0.88] tracking-tight ${
                  i === nameParts.length - 1 ? "gradient-text" : "text-white"
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
          className="text-xl sm:text-2xl text-dark-300 font-medium mb-4 max-w-xl leading-relaxed"
        >
          {(profile.job_title as string | undefined) ?? "Full Stack Web Developer"}
        </motion.h2>

        {/* Bio */}
        <motion.p
          variants={fadeUp(0.72)}
          initial="hidden"
          animate="show"
          className="text-dark-500 text-base leading-relaxed max-w-lg mb-10"
        >
          {(profile.bio as string | undefined) ??
            "3+ years crafting modern web applications with React, Laravel, and C# .NET Core."}
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
              href={profile.resume_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-primary-400 text-sm font-mono transition-colors"
            >
              ↓ {(profile.resume_label as string) || t("downloadCV")}
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
              className="px-3 py-1 text-xs font-mono text-dark-500 border border-dark-800 rounded
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
          className="w-px h-10 bg-gradient-to-b from-dark-700 to-transparent"
        />
        <span className="text-dark-700 text-[10px] font-mono tracking-[0.2em]">
          {t("scroll")}
        </span>
      </motion.div>
    </section>
  );
}
