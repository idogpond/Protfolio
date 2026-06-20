"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import ProjectForm from "@/components/admin/ProjectForm";
import adminApi from "@/lib/adminApi";
import type { Project } from "@/types";
import type { ProjectFormValues } from "@/types/admin";

export default function EditProjectPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const t        = useTranslations("admin.projects");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Project }>(`/admin/projects/${id}`)
      .then((res) => setProject(res.data.data))
      .catch(() => setFetchError(t("serverError")))
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
          : t("serverError");
      console.error(err);
      throw new Error(message);
    }
  }

  if (loading) return <div className="text-muted-foreground/70 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!project) return <div className="text-red-400 p-8">{t("notFound")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/projects" className="text-muted-foreground/70 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">{t("editTitle")}</h1>
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
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
