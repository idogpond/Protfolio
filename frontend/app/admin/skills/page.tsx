"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { Skill } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";

export default function AdminSkillsPage() {
  const t = useTranslations("admin.skills");
  const [skills, setSkills]     = useState<Skill[]>([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => { fetchSkills(); }, []);

  async function fetchSkills() {
    try {
      const res = await adminApi.get<{ data: Skill[] }>("/admin/skills");
      setSkills(res.data.data);
    } catch {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t("confirmDelete"))) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/admin/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground/70 text-sm mt-1">{t("count", { count: skills.length })}</p>
        </div>
        <Link href="/admin/skills/new" className={buttonVariants({ size: "sm" })}>{t("newSkill")}</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("loading")}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : skills.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("empty")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="px-4 py-3 font-medium">{t("colName")}</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">{t("colCategory")}</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">{t("colLevel")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {skill.icon && <span className="text-lg">{skill.icon}</span>}
                      <p className="text-foreground font-medium">{skill.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs px-2 py-0.5 bg-muted text-foreground/80 rounded-full capitalize">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-border rounded-full h-1.5 max-w-24">
                        <div
                          className="bg-primary-500 h-1.5 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/skills/${skill.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {t("edit")}
                      </Link>
                      <Button
                        variant="outline" size="sm"
                        onClick={() => handleDelete(skill.id)}
                        disabled={deleting === skill.id}
                        className="text-foreground/80 hover:text-red-400 hover:border-red-500 disabled:opacity-50"
                      >
                        {deleting === skill.id ? t("deleting") : t("delete")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
