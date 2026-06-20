"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import ExperienceForm from "@/components/admin/ExperienceForm";
import adminApi from "@/lib/adminApi";
import type { Experience } from "@/types";
import type { ExperienceFormValues } from "@/types/admin";

export default function EditExperiencePage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const t        = useTranslations("admin.experiences");
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Experience }>(`/admin/experiences/${id}`)
      .then((res) => setExperience(res.data.data))
      .catch(() => setFetchError(t("serverError")))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: ExperienceFormValues) {
    try {
      await adminApi.put(`/admin/experiences/${id}`, data);
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

  if (loading)    return <div className="text-dark-500 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!experience) return <div className="text-red-400 p-8">{t("serverError")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/experiences" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("editTitle")}</h1>
      </div>
      <div className="card p-6">
        <ExperienceForm
          defaultValues={{
            company:        experience.company,
            position_en:    experience.position_en,
            position_th:    experience.position_th ?? "",
            period:         experience.period,
            started_at:     experience.started_at  ?? "",
            ended_at:       experience.ended_at    ?? "",
            description_en: experience.description_en,
            description_th: experience.description_th ?? [],
            tech:           experience.tech,
            order:          experience.order,
          }}
          onSubmit={handleSubmit}
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
