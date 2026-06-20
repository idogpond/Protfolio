"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import ExperienceForm from "@/components/admin/ExperienceForm";
import adminApi from "@/lib/adminApi";
import type { ExperienceFormValues } from "@/types/admin";

export default function NewExperiencePage() {
  const router = useRouter();
  const t      = useTranslations("admin.experiences");

  async function handleSubmit(data: ExperienceFormValues) {
    try {
      await adminApi.post("/admin/experiences", data);
      router.push("/admin/experiences");
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
        <Link href="/admin/experiences" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("newTitle")}</h1>
      </div>
      <div className="card p-6">
        <ExperienceForm onSubmit={handleSubmit} submitLabel={t("createLabel")} />
      </div>
    </div>
  );
}
