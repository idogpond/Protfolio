"use client";

import { motion } from "framer-motion";
import { useProfile } from "@/lib/useProfile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const { profile } = useProfile();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(to right,#3b82f6 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="section-container text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {profile.available_for_hire ? "Available for new opportunities" : "Currently not available"}
            </span>
          </motion.div>

          <motion.p variants={item} className="text-dark-400 font-mono text-lg">Hi, my name is</motion.p>

          <motion.h1 variants={item} className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
            {profile.name
              ? profile.name.split(" ").map((word, i, arr) =>
                  i === arr.length - 1
                    ? <span key={i} className="gradient-text">{word}</span>
                    : <span key={i}>{word} </span>
                )
              : <span className="gradient-text">Your Name</span>}
          </motion.h1>

          <motion.h2 variants={item} className="text-2xl sm:text-4xl font-bold text-dark-400">
            {profile.job_title
              ? <><span>Full Stack </span><span className="text-primary-400">{profile.job_title.replace("Full Stack ", "")}</span></>
              : <><span>Full Stack </span><span className="text-primary-400">Web Developer</span></>}
          </motion.h2>

          <motion.p variants={item} className="text-dark-400 text-lg max-w-2xl leading-relaxed">
            {profile.bio || "3+ years crafting modern web applications with React, Laravel, and C# .NET Core."}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mt-2">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact"  className="btn-outline">Contact Me</a>
            {profile.resume_url && (
              <a href={profile.resume_url as string} target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 text-dark-400 hover:text-white font-semibold rounded-xl border border-dark-700 hover:border-dark-500 transition-all duration-200">
                {String(profile.resume_label) || "Download CV"}
              </a>
            )}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-2 justify-center mt-4">
            {["React","Next.js","TypeScript","Laravel","C# .NET","Docker"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono text-dark-400 bg-dark-800/60 border border-dark-700 rounded-full">{tech}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-dark-600 text-xs font-mono">scroll down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border-2 border-dark-700 flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-primary-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
