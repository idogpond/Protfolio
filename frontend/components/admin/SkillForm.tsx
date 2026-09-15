"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import type { SkillFormValues } from "@/types/admin";

const schema = z.object({
  name:     z.string().min(1),
  icon:     z.string(),
  level:    z.number().min(0).max(100),
  category: z.enum(["frontend", "backend", "devops", "other"]),
  order:    z.number().min(0),
});

interface Props {
  defaultValues?: Partial<SkillFormValues>;
  onSubmit: (data: SkillFormValues) => Promise<void>;
  submitLabel: string;
}

export default function SkillForm({ defaultValues, onSubmit, submitLabel }: Props) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SkillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:     defaultValues?.name     ?? "",
      icon:     defaultValues?.icon     ?? "",
      level:    defaultValues?.level    ?? 80,
      category: defaultValues?.category ?? "backend",
      order:    defaultValues?.order    ?? 0,
    },
  });

  async function handleFormSubmit(data: SkillFormValues) {
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
        <Field label={t("skillForm.nameLabel")} htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...register("name")} placeholder={t("skillForm.namePlaceholder")} />
        </Field>
        <Field label={t("skillForm.iconLabel")} hint={t("skillForm.iconHint")} htmlFor="icon">
          <Input id="icon" {...register("icon")} placeholder="⚛️" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label={t("skillForm.levelLabel")} htmlFor="level" error={errors.level?.message}>
          <Input id="level" type="number" {...register("level", { valueAsNumber: true })} />
        </Field>
        <Field label={t("skillForm.categoryLabel")} htmlFor="category" error={errors.category?.message}>
          <select id="category" {...register("category")}
            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground">
            <option value="frontend">{t("skillForm.categoryFrontend")}</option>
            <option value="backend">{t("skillForm.categoryBackend")}</option>
            <option value="devops">{t("skillForm.categoryDevops")}</option>
            <option value="other">{t("skillForm.categoryOther")}</option>
          </select>
        </Field>
        <Field label={t("skillForm.orderLabel")} htmlFor="order" error={errors.order?.message}>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
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
