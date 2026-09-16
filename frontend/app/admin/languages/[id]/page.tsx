"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import LanguageForm from "@/components/admin/LanguageForm";
import adminApi from "@/lib/adminApi";
import type { Language } from "@/types";
import type { LanguageFormValues } from "@/types/admin";

export default function EditLanguagePage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const t       = useTranslations("admin.languages");
  const [language, setLanguage]     = useState<Language | null>(null);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Language }>(`/admin/languages/${id}`)
      .then((res) => setLanguage(res.data.data))
      .catch(() => setFetchError(t("serverError")))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: LanguageFormValues) {
    try {
      await adminApi.put(`/admin/languages/${id}`, data);
      router.push("/admin/languages");
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : t("serverError");
      console.error(err);
      throw new Error(message);
    }
  }

  if (loading)    return <div className="text-muted-foreground/70 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!language)  return <div className="text-red-400 p-8">{t("serverError")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/languages" className="text-muted-foreground/70 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">{t("editTitle")}</h1>
      </div>
      <div className="card p-6">
        <LanguageForm
          defaultValues={{
            name_en:        language.name_en,
            name_th:        language.name_th        ?? "",
            proficiency_en: language.proficiency_en,
            proficiency_th: language.proficiency_th ?? "",
            order:          language.order,
          }}
          onSubmit={handleSubmit}
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
