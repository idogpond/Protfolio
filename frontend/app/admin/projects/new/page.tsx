"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import ProjectForm from "@/components/admin/ProjectForm";
import adminApi from "@/lib/adminApi";
import type { ProjectFormValues } from "@/types/admin";

export default function NewProjectPage() {
  const router = useRouter();
  const t      = useTranslations("admin.projects");

  async function handleSubmit(data: ProjectFormValues) {
    try {
      await adminApi.post("/admin/projects", data);
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

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/projects" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("newTitle")}</h1>
      </div>
      <div className="card p-6">
        <ProjectForm onSubmit={handleSubmit} submitLabel={t("createLabel")} />
      </div>
    </div>
  );
}
