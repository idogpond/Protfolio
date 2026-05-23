"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { EXPERIENCES } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-dark-900/30">
      <div className="section-container">
        <SectionHeader
          accent="// career"
          title="Work Experience"
          subtitle="My professional journey so far"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-dark-700 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-4 h-4 -translate-x-1/2 rounded-full
                                bg-dark-950 border-2 border-primary-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.3)]" />

                <div className="card p-6 hover:border-primary-500/30 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{exp.position}</h3>
                      <p className="text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="shrink-0 px-3 py-1 text-xs font-mono text-dark-400
                                     bg-dark-800 border border-dark-700 rounded-full self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-dark-300 text-sm">
                        <span className="text-primary-500 mt-0.5 shrink-0">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-dark-800">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
