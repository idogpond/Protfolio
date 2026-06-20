"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import EducationForm from "@/components/admin/EducationForm";
import adminApi from "@/lib/adminApi";
import type { Education } from "@/types";
import type { EducationFormValues } from "@/types/admin";

export default function EditEducationPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const t       = useTranslations("admin.educations");
  const [education, setEducation]   = useState<Education | null>(null);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Education }>(`/admin/educations/${id}`)
      .then((res) => setEducation(res.data.data))
      .catch(() => setFetchError(t("serverError")))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: EducationFormValues) {
    try {
      await adminApi.put(`/admin/educations/${id}`, data);
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

  if (loading)    return <div className="text-dark-500 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!education) return <div className="text-red-400 p-8">{t("serverError")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/educations" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("editTitle")}</h1>
      </div>
      <div className="card p-6">
        <EducationForm
          defaultValues={{
            degree_en:    education.degree_en,
            degree_th:    education.degree_th    ?? "",
            field_en:     education.field_en,
            field_th:     education.field_th     ?? "",
            institution:  education.institution,
            started_at:   education.started_at   != null ? String(education.started_at) : "",
            graduated_at: education.graduated_at != null ? String(education.graduated_at) : "",
            gpa:          education.gpa          != null ? String(education.gpa) : "",
            order:        education.order,
          }}
          onSubmit={handleSubmit}
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
