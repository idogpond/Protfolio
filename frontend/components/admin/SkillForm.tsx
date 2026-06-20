"use client";

import { useState } from "react";
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
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Skill Name *" htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...register("name")} placeholder="React.js" />
        </Field>
        <Field label="Icon" hint="Emoji or short text like TS, JS" htmlFor="icon">
          <Input id="icon" {...register("icon")} placeholder="⚛️" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Level (0–100) *" htmlFor="level" error={errors.level?.message}>
          <Input id="level" type="number" {...register("level", { valueAsNumber: true })} />
        </Field>
        <Field label="Category *" htmlFor="category" error={errors.category?.message}>
          <select id="category" {...register("category")}
            className="w-full bg-dark-800 border border-dark-700 rounded-md px-3 py-2 text-sm text-white">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Display Order" htmlFor="order" error={errors.order?.message}>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
        </Field>
      </div>

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
