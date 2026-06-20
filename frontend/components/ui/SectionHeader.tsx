"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  accent?: string;
}

export default function SectionHeader({ title, subtitle, accent }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      {accent && (
        <span className="text-primary-500 text-[11px] font-mono tracking-[0.3em] uppercase mb-3 block">
          {accent}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="mt-5 h-0.5 w-12 bg-primary-500" />
    </motion.div>
  );
}
