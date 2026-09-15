"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { DatePicker } from "@/components/ui/date-picker";
import type { ExperienceFormValues } from "@/types/admin";

const schema = z.object({
  company:        z.string().min(1),
  position_en:    z.string().min(1),
  position_th:    z.string(),
  period_en:      z.string().min(1),
  period_th:      z.string(),
  started_at:     z.string(),
  ended_at:       z.string(),
  description_en: z.string().min(1),  // newline-separated in form
  description_th: z.string(),
  tech:           z.string(),         // comma-separated in form
  order:          z.number().min(0),
});

type FormFields = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<ExperienceFormValues>;
  onSubmit: (data: ExperienceFormValues) => Promise<void>;
  submitLabel: string;
}

export default function ExperienceForm({ defaultValues, onSubmit, submitLabel }: Props) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      company:        defaultValues?.company        ?? "",
      position_en:    defaultValues?.position_en    ?? "",
      position_th:    defaultValues?.position_th    ?? "",
      period_en:      defaultValues?.period_en       ?? "",
      period_th:      defaultValues?.period_th       ?? "",
      started_at:     defaultValues?.started_at     ?? "",
      ended_at:       defaultValues?.ended_at       ?? "",
      description_en: defaultValues?.description_en?.join("\n") ?? "",
      description_th: defaultValues?.description_th?.join("\n") ?? "",
      tech:           defaultValues?.tech?.join(", ") ?? "",
      order:          defaultValues?.order           ?? 0,
    },
  });

  async function handleFormSubmit(data: FormFields) {
    setServerError("");
    try {
      await onSubmit({
        ...data,
        description_en: data.description_en.split("\n").map(s => s.trim()).filter(Boolean),
        description_th: data.description_th.split("\n").map(s => s.trim()).filter(Boolean),
        tech:           data.tech.split(",").map(s => s.trim()).filter(Boolean),
      });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form.serverError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Field label={t("experienceForm.companyLabel")} htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("experienceForm.positionEnLabel")} htmlFor="position_en" error={errors.position_en?.message}>
          <Input id="position_en" {...register("position_en")} />
        </Field>
        <Field label={t("experienceForm.positionThLabel")} htmlFor="position_th">
          <Input id="position_th" {...register("position_th")} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("experienceForm.periodEnLabel")} htmlFor="period_en" hint={t("experienceForm.periodHint")} error={errors.period_en?.message}>
          <Input id="period_en" {...register("period_en")} />
        </Field>
        <Field label={t("experienceForm.periodThLabel")} htmlFor="period_th">
          <Input id="period_th" {...register("period_th")} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("experienceForm.startedLabel")}>
          <Controller
            name="started_at"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder={t("experienceForm.startedPlaceholder")}
                clearable
              />
            )}
          />
        </Field>
        <Field label={t("experienceForm.endedLabel")}>
          <Controller
            name="ended_at"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder={t("experienceForm.endedPlaceholder")}
                clearable
              />
            )}
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("experienceForm.descriptionEnLabel")} hint={t("experienceForm.descriptionHint")} htmlFor="description_en" error={errors.description_en?.message}>
          <Textarea id="description_en" {...register("description_en")} rows={6} className="resize-y font-mono text-sm" />
        </Field>
        <Field label={t("experienceForm.descriptionThLabel")} hint={t("experienceForm.descriptionHint")} htmlFor="description_th">
          <Textarea id="description_th" {...register("description_th")} rows={6} className="resize-y font-mono text-sm" />
        </Field>
      </div>
      <Field label={t("experienceForm.techLabel")} hint={t("experienceForm.techHint")} htmlFor="tech">
        <Input id="tech" {...register("tech")} />
      </Field>
      <Field label={t("experienceForm.orderLabel")} htmlFor="order" error={errors.order?.message}>
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
