"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import type { ExperienceFormValues } from "@/types/admin";

const schema = z.object({
  company:        z.string().min(1),
  position_en:    z.string().min(1),
  position_th:    z.string(),
  period:         z.string().min(1),
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
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      company:        defaultValues?.company        ?? "",
      position_en:    defaultValues?.position_en    ?? "",
      position_th:    defaultValues?.position_th    ?? "",
      period:         defaultValues?.period         ?? "",
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
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Field label="Company *" htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Position (EN) *" htmlFor="position_en" error={errors.position_en?.message}>
          <Input id="position_en" {...register("position_en")} />
        </Field>
        <Field label="Position (TH)" htmlFor="position_th">
          <Input id="position_th" {...register("position_th")} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Period *" htmlFor="period" hint='e.g. "Oct 2022 — Present"' error={errors.period?.message}>
          <Input id="period" {...register("period")} />
        </Field>
        <Field label="Started" htmlFor="started_at">
          <Input id="started_at" type="date" {...register("started_at")} />
        </Field>
        <Field label="Ended (blank = present)" htmlFor="ended_at">
          <Input id="ended_at" type="date" {...register("ended_at")} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Description EN *" hint="One bullet point per line" htmlFor="description_en" error={errors.description_en?.message}>
          <Textarea id="description_en" {...register("description_en")} rows={6} className="resize-y font-mono text-sm" />
        </Field>
        <Field label="Description TH" hint="One bullet point per line" htmlFor="description_th">
          <Textarea id="description_th" {...register("description_th")} rows={6} className="resize-y font-mono text-sm" />
        </Field>
      </div>
      <Field label="Tech Stack" hint="Comma-separated e.g. Laravel, React, Docker" htmlFor="tech">
        <Input id="tech" {...register("tech")} />
      </Field>
      <Field label="Display Order" htmlFor="order" error={errors.order?.message}>
        <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
      </Field>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <div className="flex justify-end pt-2 border-t border-dark-800">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
