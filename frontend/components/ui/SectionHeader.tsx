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
      className="text-center mb-16"
    >
      {accent && (
        <span className="text-primary-400 text-sm font-mono font-semibold tracking-widest uppercase mb-2 block">
          {accent}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500" />
        <div className="w-2 h-2 rounded-full bg-primary-500" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-500" />
      </div>
    </motion.div>
  );
}
