"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import EducationForm from "@/components/admin/EducationForm";
import adminApi from "@/lib/adminApi";
import type { EducationFormValues } from "@/types/admin";

export default function NewEducationPage() {
  const router = useRouter();
  const t      = useTranslations("admin.educations");

  async function handleSubmit(data: EducationFormValues) {
    try {
      await adminApi.post("/admin/educations", data);
      router.push("/admin/educations");
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
        <Link href="/admin/educations" className="text-muted-foreground/70 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">{t("newTitle")}</h1>
      </div>
      <div className="card p-6">
        <EducationForm onSubmit={handleSubmit} submitLabel={t("createLabel")} />
      </div>
    </div>
  );
}
