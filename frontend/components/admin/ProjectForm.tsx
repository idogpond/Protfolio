"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectFormValues } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";

// FormSchema is derived inside the component; keep a stable local type for useForm
// by using the module-level shape. Runtime validation uses the useMemo schema.
type FormSchema = {
  title: string;
  description: string;
  tech_stack: string; // comma-separated input → split before submit
  github_url: string;
  demo_url: string;
  image_url: string;
  is_featured: boolean;
  order: number;
};

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function ProjectForm({ defaultValues, onSubmit, submitLabel }: ProjectFormProps) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().min(1, t("form.required")),
        description: z.string().min(1, t("form.required")),
        tech_stack: z.string(), // comma-separated input → split before submit
        github_url: z.string().url(t("form.invalidUrl")).or(z.literal("")),
        demo_url: z.string().url(t("form.invalidUrl")).or(z.literal("")),
        image_url: z.string(),
        is_featured: z.boolean(),
        order: z.coerce.number().int().min(0),
      }),
    [t]
  );

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      tech_stack: (defaultValues?.tech_stack ?? []).join(", "),
      github_url: defaultValues?.github_url ?? "",
      demo_url: defaultValues?.demo_url ?? "",
      image_url: defaultValues?.image_url ?? "",
      is_featured: defaultValues?.is_featured ?? false,
      order: defaultValues?.order ?? 0,
    },
  });


  async function handleFormSubmit(raw: FormSchema) {
    setServerError("");
    try {
      await onSubmit({
        ...raw,
        github_url: raw.github_url || "",
        demo_url: raw.demo_url || "",
        tech_stack: raw.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form.serverError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <Field label={t("projectForm.titleLabel")} error={errors.title?.message} htmlFor="title">
        <Input id="title" {...register("title")} placeholder="My Project"
          className={errors.title ? "border-destructive" : ""} />
      </Field>

      <Field label={t("projectForm.descriptionLabel")} error={errors.description?.message} htmlFor="description">
        <Textarea id="description" {...register("description")} rows={4}
          placeholder="Project description…"
          className={`resize-none ${errors.description ? "border-destructive" : ""}`} />
      </Field>

      <Field label={t("projectForm.techStack")} hint={t("projectForm.techStackHint")} htmlFor="tech_stack">
        <Input id="tech_stack" {...register("tech_stack")} placeholder="React, Laravel, MySQL" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("projectForm.githubUrl")} error={errors.github_url?.message} htmlFor="github_url">
          <Input id="github_url" {...register("github_url")} placeholder="https://github.com/…"
            className={errors.github_url ? "border-destructive" : ""} />
        </Field>
        <Field label={t("projectForm.demoUrl")} error={errors.demo_url?.message} htmlFor="demo_url">
          <Input id="demo_url" {...register("demo_url")} placeholder="https://demo.example.com"
            className={errors.demo_url ? "border-destructive" : ""} />
        </Field>
      </div>

      <Field label={t("projectForm.imageUrl")} htmlFor="image_url">
        <Input id="image_url" {...register("image_url")} placeholder="https://…/image.png" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("projectForm.order")} error={errors.order?.message} htmlFor="order">
          <Input id="order" type="number" {...register("order")}
            className={errors.order ? "border-destructive" : ""} />
        </Field>
        <div className="flex items-end pb-1">
          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <Label className="flex items-center gap-3 cursor-pointer font-normal text-foreground/80 text-sm">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                {t("projectForm.isFeatured")}
              </Label>
            )}
          />
        </div>
      </div>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
        {isSubmitting && <Spinner />}
        {isSubmitting ? t("form.saving") : (submitLabel ?? t("form.save"))}
      </Button>
    </form>
  );
}

// ─── helpers ────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
