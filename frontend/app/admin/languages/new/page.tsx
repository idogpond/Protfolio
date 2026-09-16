"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import LanguageForm from "@/components/admin/LanguageForm";
import adminApi from "@/lib/adminApi";
import type { LanguageFormValues } from "@/types/admin";

export default function NewLanguagePage() {
  const router = useRouter();
  const t      = useTranslations("admin.languages");

  async function handleSubmit(data: LanguageFormValues) {
    try {
      await adminApi.post("/admin/languages", data);
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

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/languages" className="text-muted-foreground/70 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">{t("newTitle")}</h1>
      </div>
      <div className="card p-6">
        <LanguageForm onSubmit={handleSubmit} submitLabel={t("createLabel")} />
      </div>
    </div>
  );
}
