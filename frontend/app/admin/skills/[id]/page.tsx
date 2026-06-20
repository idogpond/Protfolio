"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import SkillForm from "@/components/admin/SkillForm";
import adminApi from "@/lib/adminApi";
import type { Skill } from "@/types";
import type { SkillFormValues } from "@/types/admin";

export default function EditSkillPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const t       = useTranslations("admin.skills");
  const [skill, setSkill]         = useState<Skill | null>(null);
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Skill }>(`/admin/skills/${id}`)
      .then((res) => setSkill(res.data.data))
      .catch(() => setFetchError(t("serverError")))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: SkillFormValues) {
    try {
      await adminApi.put(`/admin/skills/${id}`, data);
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

  if (loading)    return <div className="text-dark-500 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!skill)     return <div className="text-red-400 p-8">{t("serverError")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/skills" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("editTitle")}</h1>
      </div>
      <div className="card p-6">
        <SkillForm
          defaultValues={{
            name:     skill.name,
            icon:     skill.icon     ?? "",
            level:    skill.level,
            category: skill.category,
            order:    skill.order,
          }}
          onSubmit={handleSubmit}
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
