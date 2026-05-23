"use client";

import { useEffect, useState } from "react";
import adminApi from "@/lib/adminApi";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    try {
      const res = await adminApi.get<{ data: Project[] }>("/admin/projects");
      setProjects(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบ Project นี้?")) return;
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
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-dark-500 text-sm mt-1">{projects.length} projects</p>
        </div>
        <a href="/admin/projects/new" className="btn-primary text-sm">+ New Project</a>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-500">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-dark-500">No projects yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 text-dark-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Tech Stack</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
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
                      {(project.tech_stack ?? []).slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-1.5 py-0.5 bg-dark-700 text-dark-300 rounded">
                          {t}
                        </span>
                      ))}
                      {(project.tech_stack?.length ?? 0) > 3 && (
                        <span className="text-xs text-dark-500">+{(project.tech_stack?.length ?? 0) - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {project.is_featured
                      ? <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Yes</span>
                      : <span className="text-xs text-dark-500">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-primary-500 hover:text-primary-400 transition-colors"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deleting === project.id ? "…" : "Delete"}
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
