"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import ProjectForm from "@/components/admin/ProjectForm";
import adminApi from "@/lib/adminApi";
import type { Project } from "@/types";
import type { ProjectFormValues } from "@/types/admin";

export default function EditProjectPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .get<{ data: Project }>(`/admin/projects/${id}`)
      .then((res) => setProject(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: ProjectFormValues) {
    try {
      await adminApi.put(`/admin/projects/${id}`, data);
      router.push("/admin/projects");
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong. Please try again.";
      console.error(err);
      throw new Error(message);
    }
  }

  if (loading) return <div className="text-dark-500 p-8">Loading…</div>;
  if (!project) return <div className="text-red-400 p-8">Project not found.</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <a href="/admin/projects" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          ← Back to Projects
        </a>
        <h1 className="text-2xl font-bold text-white mt-2">Edit Project</h1>
      </div>
      <div className="card p-6">
        <ProjectForm
          defaultValues={{
            title:       project.title,
            description: project.description,
            tech_stack:  project.tech_stack ?? [],
            github_url:  project.github_url ?? "",
            demo_url:    project.demo_url   ?? "",
            image_url:   project.image_url  ?? "",
            is_featured: project.is_featured,
            order:       project.order,
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Project"
        />
      </div>
    </div>
  );
}
