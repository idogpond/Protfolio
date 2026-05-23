"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/data";
import type { Skill } from "@/types";

const categories: { key: Skill["category"]; label: string; color: string }[] = [
  { key: "frontend", label: "Frontend",  color: "text-blue-400 border-blue-500/30 bg-blue-500/10"   },
  { key: "backend",  label: "Backend",   color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  { key: "devops",   label: "DevOps",    color: "text-green-400 border-green-500/30 bg-green-500/10" },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="card p-4 hover:border-primary-500/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-medium text-sm group-hover:text-primary-300 transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-dark-500 text-xs font-mono">{skill.level}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07 + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-dark-900/30">
      <div className="section-container">
        <SectionHeader
          accent="// tech stack"
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with regularly"
        />

        <div className="space-y-12">
          {categories.map((cat) => {
            const catSkills = SKILLS.filter((s) => s.category === cat.key);
            return (
              <div key={cat.key}>
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span
                    className={`px-3 py-1 text-xs font-mono font-semibold rounded-full border ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                  <div className="flex-1 h-px bg-dark-800" />
                </motion.div>

                {/* Skill grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* "Also familiar with" strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 card p-6"
        >
          <p className="text-dark-400 text-sm font-mono mb-4">
            // also familiar with
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Redis", "Nginx", "REST API", "GraphQL",
              "Jest", "PHPUnit", "Figma", "Postman",
              "GitHub Actions", "Vercel", "AWS S3",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm text-dark-300 bg-dark-800 border border-dark-700
                           rounded-lg hover:border-primary-500/40 hover:text-primary-300 transition-colors cursor-default"
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
