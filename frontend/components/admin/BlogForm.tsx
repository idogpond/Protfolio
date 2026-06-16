"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { BlogFormValues } from "@/types/admin";

interface BlogFormProps {
  defaultValues?: Partial<BlogFormValues>;
  onSubmit: (data: BlogFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function BlogForm({ defaultValues, onSubmit, submitLabel }: BlogFormProps) {
  const t = useTranslations("admin");
  const [serverError, setServerError] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        title:        z.string().min(1, t("form.required")),
        slug:         z.string().optional().default(""),
        excerpt:      z.string().optional().default(""),
        content:      z.string().min(1, t("form.required")),
        cover_image:  z.string().url(t("form.invalidUrl")).optional().or(z.literal("")),
        is_published: z.boolean().optional().default(false),
        published_at: z.string().optional().default(""),
      }),
    [t]
  );

  type FormSchema = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:        defaultValues?.title        ?? "",
      slug:         defaultValues?.slug         ?? "",
      content:      defaultValues?.content      ?? "",
      excerpt:      defaultValues?.excerpt      ?? "",
      cover_image:  defaultValues?.cover_image  ?? "",
      is_published: defaultValues?.is_published ?? false,
      published_at: defaultValues?.published_at
        ? new Date(defaultValues.published_at).toISOString().slice(0, 16)
        : "",
    },
  });

  async function handleFormSubmit(raw: FormSchema) {
    setServerError("");
    try {
      await onSubmit(raw as BlogFormValues);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form.serverError"));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Title */}
      <Field label={t("blogForm.titleLabel")} error={errors.title?.message}>
        <input {...register("title")} placeholder="My Blog Post" className={inputCls(!!errors.title)} />
      </Field>

      {/* Slug */}
      <Field label={t("blogForm.slug")} hint={t("blogForm.slugHint")}>
        <input {...register("slug")} placeholder="my-blog-post" className={inputCls(false)} />
      </Field>

      {/* Excerpt */}
      <Field label={t("blogForm.excerpt")}>
        <textarea {...register("excerpt")} rows={2} placeholder="Short description for preview…"
          className={inputCls(false) + " resize-none"} />
      </Field>

      {/* Content */}
      <Field label={t("blogForm.content")} error={errors.content?.message}>
        <textarea {...register("content")} rows={12} placeholder="Markdown content…"
          className={`${inputCls(!!errors.content)} resize-y font-mono text-xs`} />
      </Field>

      {/* Cover Image */}
      <Field label={t("blogForm.coverImage")} error={errors.cover_image?.message}>
        <input {...register("cover_image")} placeholder="https://…/cover.jpg" className={inputCls(!!errors.cover_image)} />
      </Field>

      {/* Published At + is_published */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("blogForm.publishDate")}>
          <input type="datetime-local" {...register("published_at")} className={inputCls(false)} />
        </Field>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("is_published")} className="w-4 h-4 accent-primary-500" />
            <span className="text-dark-300 text-sm">{t("blogForm.isPublished")}</span>
          </label>
        </div>
      </div>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}
        className="btn-primary flex items-center gap-2 disabled:opacity-50">
        {isSubmitting && <Spinner />}
        {isSubmitting ? t("form.saving") : (submitLabel ?? t("form.save"))}
      </button>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-2.5 bg-dark-800 border rounded-xl text-white placeholder-dark-600
          outline-none transition-colors text-sm
          ${hasError ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`;
}

function Field({ label, hint, error, children }: {
  label: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-dark-300 text-sm font-medium">{label}</label>
      {hint && <p className="text-dark-600 text-xs">{hint}</p>}
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
