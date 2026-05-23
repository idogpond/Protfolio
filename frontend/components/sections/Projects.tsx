"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import { useProfile } from "@/lib/useProfile";
import type { Project } from "@/types";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-6 flex flex-col gap-4 hover:border-primary-500/40
                 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Large index number — decorative background */}
      <span
        className="absolute top-3 right-4 font-display font-extrabold leading-none
                   text-[5rem] text-dark-800/50 select-none pointer-events-none
                   group-hover:text-primary-500/8 transition-colors duration-500"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="h-0.5 w-8 bg-primary-500 group-hover:w-12 transition-all duration-300" />
        <div className="flex gap-3 relative z-10">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-600 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-600 hover:text-primary-400 transition-colors"
              aria-label="Live Demo"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Title & description */}
      <div className="flex-1">
        <h3 className="text-white font-display font-bold text-lg mb-2
                       group-hover:text-primary-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark-800">
        {(project.tech_stack ?? []).map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-primary-400 bg-primary-500/10
                       px-2 py-0.5 rounded border border-primary-500/20"
          >
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
        <div className="h-0.5 w-8 bg-dark-700 rounded" />
        <div className="flex gap-3">
          <div className="w-4.5 h-4.5 bg-dark-700 rounded" />
          <div className="w-4.5 h-4.5 bg-dark-700 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-dark-700 rounded w-3/4" />
        <div className="h-3.5 bg-dark-700 rounded w-full" />
        <div className="h-3.5 bg-dark-700 rounded w-5/6" />
      </div>
      <div className="flex gap-2 pt-3 border-t border-dark-800">
        <div className="h-5 w-14 bg-dark-700 rounded" />
        <div className="h-5 w-18 bg-dark-700 rounded" />
        <div className="h-5 w-12 bg-dark-700 rounded" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { profile } = useProfile();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

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
        <SectionHeader
          accent="// my work"
          title="Featured Projects"
          subtitle="A selection of things I've built"
        />

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm mb-1">Could not load projects</p>
            <p className="text-dark-500 text-xs font-mono">{error}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
        </div>

        {!loading && projects.length === 0 && !error && (
          <p className="text-center text-dark-500 py-12 text-sm">
            No projects yet.
          </p>
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
              View More on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
