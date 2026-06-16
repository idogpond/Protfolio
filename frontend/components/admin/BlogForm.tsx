"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BlogFormValues } from "@/types/admin";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label }    from "@/components/ui/label";
import { Field }    from "@/components/ui/field";

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

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormSchema>({
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
      <Field label={t("blogForm.titleLabel")} error={errors.title?.message} htmlFor="title">
        <Input id="title" {...register("title")} placeholder="My Blog Post"
          className={errors.title ? "border-destructive" : ""} />
      </Field>

      <Field label={t("blogForm.slug")} hint={t("blogForm.slugHint")} htmlFor="slug">
        <Input id="slug" {...register("slug")} placeholder="my-blog-post" />
      </Field>

      <Field label={t("blogForm.excerpt")} htmlFor="excerpt">
        <Textarea id="excerpt" {...register("excerpt")} rows={2}
          placeholder="Short description for preview…" className="resize-none" />
      </Field>

      <Field label={t("blogForm.content")} error={errors.content?.message} htmlFor="content">
        <Textarea id="content" {...register("content")} rows={12}
          placeholder="Markdown content…"
          className={`resize-y font-mono text-xs ${errors.content ? "border-destructive" : ""}`} />
      </Field>

      <Field label={t("blogForm.coverImage")} error={errors.cover_image?.message} htmlFor="cover_image">
        <Input id="cover_image" {...register("cover_image")} placeholder="https://…/cover.jpg"
          className={errors.cover_image ? "border-destructive" : ""} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("blogForm.publishDate")} htmlFor="published_at">
          <Input id="published_at" type="datetime-local" {...register("published_at")} />
        </Field>
        <div className="flex items-end pb-1">
          <Controller
            name="is_published"
            control={control}
            render={({ field }) => (
              <Label className="flex items-center gap-3 cursor-pointer font-normal text-dark-300 text-sm">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                {t("blogForm.isPublished")}
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

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
