"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const t = useTranslations("admin.projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    try {
      const res = await adminApi.get<{ data: Project[] }>("/admin/projects");
      setProjects(res.data.data);
    } catch {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t("confirmDelete"))) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/admin/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
          <p className="text-dark-500 text-sm mt-1">{t("count", { count: projects.length })}</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary text-sm">{t("newProject")}</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-500">{t("loading")}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-dark-500">{t("empty")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 text-dark-400 text-left">
                <th className="px-4 py-3 font-medium">{t("colTitle")}</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">{t("colTechStack")}</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">{t("colFeatured")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-dark-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.tech_stack ?? []).slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-1.5 py-0.5 bg-dark-700 text-dark-300 rounded">
                          {tech}
                        </span>
                      ))}
                      {(project.tech_stack?.length ?? 0) > 3 && (
                        <span className="text-xs text-dark-500">+{(project.tech_stack?.length ?? 0) - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {project.is_featured
                      ? <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{t("featuredYes")}</span>
                      : <span className="text-xs text-dark-500">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-primary-500 hover:text-primary-400 transition-colors"
                      >
                        {t("edit")}
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deleting === project.id ? t("deleting") : t("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
