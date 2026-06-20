"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import SkillForm from "@/components/admin/SkillForm";
import adminApi from "@/lib/adminApi";
import type { SkillFormValues } from "@/types/admin";

export default function NewSkillPage() {
  const router = useRouter();
  const t      = useTranslations("admin.skills");

  async function handleSubmit(data: SkillFormValues) {
    try {
      await adminApi.post("/admin/skills", data);
      router.push("/admin/skills");
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
        <Link href="/admin/skills" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("newTitle")}</h1>
      </div>
      <div className="card p-6">
        <SkillForm onSubmit={handleSubmit} submitLabel={t("createLabel")} />
      </div>
    </div>
  );
}
