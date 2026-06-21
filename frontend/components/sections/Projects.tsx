"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import { useProfile } from "@/lib/useProfile";
import type { Project } from "@/types";

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: string }) {
  const title = locale === "th" ? (project.title_th || project.title) : project.title;
  const description = locale === "th" ? (project.description_th || project.description) : project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-6 flex flex-col gap-4 hover:border-primary-500/40
                 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="h-0.5 w-8 bg-primary-500 group-hover:w-12 transition-all duration-300" />
        <div className="flex gap-3 relative z-10">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground/50 hover:text-foreground transition-colors" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground/50 hover:text-primary-400 transition-colors" aria-label="Live Demo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-foreground font-display font-bold text-lg mb-2 group-hover:text-primary-300 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
        {(project.tech_stack ?? []).map((tech) => (
          <span key={tech} className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="card p-6 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-0.5 w-8 bg-border rounded" />
        <div className="flex gap-3">
          <div className="w-4 h-4 bg-border rounded" />
          <div className="w-4 h-4 bg-border rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-border rounded w-3/4" />
        <div className="h-3.5 bg-border rounded w-full" />
        <div className="h-3.5 bg-border rounded w-5/6" />
      </div>
      <div className="flex gap-2 pt-3 border-t border-border">
        <div className="h-5 w-14 bg-border rounded" />
        <div className="h-5 w-18 bg-border rounded" />
        <div className="h-5 w-12 bg-border rounded" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { profile } = useProfile();
  const t = useTranslations("projects");
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ data: Project[] }>("/projects")
      .then((res) => setProjects(res.data.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <SectionHeader accent={t("accent")} title={t("title")} subtitle={t("subtitle")} />

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm mb-1">{t("loadError")}</p>
            <p className="text-muted-foreground/70 text-xs font-mono">{error}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
            : projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} locale={locale} />)}
        </div>

        {!loading && projects.length === 0 && !error && (
          <p className="text-center text-muted-foreground/70 py-12 text-sm">{t("empty")}</p>
        )}

        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={(profile.github_url as string | undefined) || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t("viewMore")}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
