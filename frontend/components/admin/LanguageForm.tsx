"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import type { LanguageFormValues } from "@/types/admin";

const schema = z.object({
  name_en:        z.string().min(1),
  name_th:        z.string(),
  proficiency_en: z.string().min(1),
  proficiency_th: z.string(),
  order:          z.number().min(0),
});

interface Props {
  defaultValues?: Partial<LanguageFormValues>;
  onSubmit: (data: LanguageFormValues) => Promise<void>;
  submitLabel: string;
}

export default function LanguageForm({ defaultValues, onSubmit, submitLabel }: Props) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LanguageFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name_en:        defaultValues?.name_en        ?? "",
      name_th:        defaultValues?.name_th        ?? "",
      proficiency_en: defaultValues?.proficiency_en  ?? "",
      proficiency_th: defaultValues?.proficiency_th  ?? "",
      order:          defaultValues?.order           ?? 0,
    },
  });

  async function handleFormSubmit(data: LanguageFormValues) {
    setServerError("");
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form.serverError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("languageForm.nameEnLabel")} htmlFor="name_en" error={errors.name_en?.message}>
          <Input id="name_en" {...register("name_en")} placeholder="English" />
        </Field>
        <Field label={t("languageForm.nameThLabel")} htmlFor="name_th">
          <Input id="name_th" {...register("name_th")} placeholder="อังกฤษ" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("languageForm.proficiencyEnLabel")} htmlFor="proficiency_en" error={errors.proficiency_en?.message}>
          <Input id="proficiency_en" {...register("proficiency_en")} placeholder="Working Proficiency" />
        </Field>
        <Field label={t("languageForm.proficiencyThLabel")} htmlFor="proficiency_th">
          <Input id="proficiency_th" {...register("proficiency_th")} placeholder="ใช้งานได้ดี" />
        </Field>
      </div>
      <Field label={t("languageForm.orderLabel")} htmlFor="order" error={errors.order?.message}>
        <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
      </Field>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <div className="flex justify-end pt-2 border-t border-border">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("form.saving") : submitLabel}
        </Button>
      </div>
    </form>
  );
}
