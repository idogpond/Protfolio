"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { ProjectFormValues } from "@/types/admin";

const schema = z.object({
  title:       z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  tech_stack:  z.string(), // comma-separated input → split before submit
  github_url:  z.string().url("Invalid URL").or(z.literal("")),
  demo_url:    z.string().url("Invalid URL").or(z.literal("")),
  image_url:   z.string(),
  is_featured: z.boolean(),
  order:       z.coerce.number().int().min(0),
});

type FormSchema = z.infer<typeof schema>;

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function ProjectForm({ defaultValues, onSubmit, submitLabel = "Save" }: ProjectFormProps) {
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:       defaultValues?.title       ?? "",
      description: defaultValues?.description ?? "",
      tech_stack:  (defaultValues?.tech_stack ?? []).join(", "),
      github_url:  defaultValues?.github_url  ?? "",
      demo_url:    defaultValues?.demo_url    ?? "",
      image_url:   defaultValues?.image_url   ?? "",
      is_featured: defaultValues?.is_featured ?? false,
      order:       defaultValues?.order       ?? 0,
    },
  });

  async function handleFormSubmit(raw: FormSchema) {
    setServerError("");
    try {
      await onSubmit({
        ...raw,
        github_url: raw.github_url || "",
        demo_url:   raw.demo_url   || "",
        tech_stack: raw.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Title */}
      <Field label="Title *" error={errors.title?.message}>
        <input {...register("title")} placeholder="My Project" className={inputCls(!!errors.title)} />
      </Field>

      {/* Description */}
      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register("description")} rows={4} placeholder="Project description…"
          className={inputCls(!!errors.description) + " resize-none"} />
      </Field>

      {/* Tech Stack */}
      <Field label="Tech Stack" hint="comma-separated e.g. React, Laravel, Docker">
        <input {...register("tech_stack")} placeholder="React, Laravel, MySQL" className={inputCls(false)} />
      </Field>

      {/* URLs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="GitHub URL" error={errors.github_url?.message}>
          <input {...register("github_url")} placeholder="https://github.com/…" className={inputCls(!!errors.github_url)} />
        </Field>
        <Field label="Demo URL" error={errors.demo_url?.message}>
          <input {...register("demo_url")} placeholder="https://demo.example.com" className={inputCls(!!errors.demo_url)} />
        </Field>
      </div>

      {/* Image URL */}
      <Field label="Image URL">
        <input {...register("image_url")} placeholder="https://…/image.png" className={inputCls(false)} />
      </Field>

      {/* Order + Featured */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Display Order" error={errors.order?.message}>
          <input type="number" {...register("order")} className={inputCls(!!errors.order)} />
        </Field>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("is_featured")}
              className="w-4 h-4 accent-primary-500" />
            <span className="text-dark-300 text-sm">Featured project</span>
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
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

// ─── helpers ────────────────────────────────────────────────────────────────

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
