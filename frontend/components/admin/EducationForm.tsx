"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import type { EducationFormValues } from "@/types/admin";

const schema = z.object({
  degree_en:    z.string().min(1),
  degree_th:    z.string(),
  field_en:     z.string().min(1),
  field_th:     z.string(),
  institution:  z.string().min(1),
  started_at:   z.string().nullable(),
  graduated_at: z.string().nullable(),
  gpa:          z.string().nullable(),
  order:        z.number().min(0),
});

interface Props {
  defaultValues?: Partial<EducationFormValues>;
  onSubmit: (data: EducationFormValues) => Promise<void>;
  submitLabel: string;
}

export default function EducationForm({ defaultValues, onSubmit, submitLabel }: Props) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EducationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      degree_en:    defaultValues?.degree_en    ?? "",
      degree_th:    defaultValues?.degree_th    ?? "",
      field_en:     defaultValues?.field_en     ?? "",
      field_th:     defaultValues?.field_th     ?? "",
      institution:  defaultValues?.institution  ?? "",
      started_at:   defaultValues?.started_at   ?? "",
      graduated_at: defaultValues?.graduated_at ?? "",
      gpa:          defaultValues?.gpa          ?? "",
      order:        defaultValues?.order         ?? 0,
    },
  });

  async function handleFormSubmit(data: EducationFormValues) {
    setServerError("");
    try {
      // Convert empty string year/gpa fields to null before sending to backend,
      // so Laravel's nullable|integer validation passes instead of failing on "".
      await onSubmit({
        ...data,
        started_at:   data.started_at   === "" ? null : data.started_at,
        graduated_at: data.graduated_at === "" ? null : data.graduated_at,
        gpa:          data.gpa          === "" ? null : data.gpa,
      });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form.serverError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Field label={t("educationForm.institutionLabel")} htmlFor="institution" error={errors.institution?.message}>
        <Input id="institution" {...register("institution")} placeholder={t("educationForm.institutionPlaceholder")} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("educationForm.degreeEnLabel")} htmlFor="degree_en" error={errors.degree_en?.message}>
          <Input id="degree_en" {...register("degree_en")} placeholder={t("educationForm.degreeEnPlaceholder")} />
        </Field>
        <Field label={t("educationForm.degreeThLabel")} htmlFor="degree_th">
          <Input id="degree_th" {...register("degree_th")} placeholder="วิทยาศาสตรบัณฑิต" />
        </Field>
        <Field label={t("educationForm.fieldEnLabel")} htmlFor="field_en" error={errors.field_en?.message}>
          <Input id="field_en" {...register("field_en")} placeholder={t("educationForm.fieldEnPlaceholder")} />
        </Field>
        <Field label={t("educationForm.fieldThLabel")} htmlFor="field_th">
          <Input id="field_th" {...register("field_th")} placeholder="เทคโนโลยีสารสนเทศ" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label={t("educationForm.startedLabel")} htmlFor="started_at">
          <Input id="started_at" {...register("started_at")} placeholder={t("educationForm.startedPlaceholder")} />
        </Field>
        <Field label={t("educationForm.graduatedLabel")} htmlFor="graduated_at">
          <Input id="graduated_at" {...register("graduated_at")} placeholder={t("educationForm.graduatedPlaceholder")} />
        </Field>
        <Field label={t("educationForm.gpaLabel")} htmlFor="gpa">
          <Input id="gpa" {...register("gpa")} placeholder="3.50" />
        </Field>
      </div>

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
