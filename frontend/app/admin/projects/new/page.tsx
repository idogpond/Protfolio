"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import ProjectForm from "@/components/admin/ProjectForm";
import adminApi from "@/lib/adminApi";
import type { ProjectFormValues } from "@/types/admin";

export default function NewProjectPage() {
  const router = useRouter();

  async function handleSubmit(data: ProjectFormValues) {
    try {
      await adminApi.post("/admin/projects", data);
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

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <a href="/admin/projects" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          ← Back to Projects
        </a>
        <h1 className="text-2xl font-bold text-white mt-2">New Project</h1>
      </div>
      <div className="card p-6">
        <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />
      </div>
    </div>
  );
}
