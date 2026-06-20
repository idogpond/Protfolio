"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { Education } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";

export default function AdminEducationsPage() {
  const t = useTranslations("admin.educations");
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading]       = useState(true);
  const [deleting, setDeleting]     = useState<number | null>(null);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => { fetchEducations(); }, []);

  async function fetchEducations() {
    try {
      const res = await adminApi.get<{ data: Education[] }>("/admin/educations");
      setEducations(res.data.data);
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
      await adminApi.delete(`/admin/educations/${id}`);
      setEducations((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground/70 text-sm mt-1">{t("count", { count: educations.length })}</p>
        </div>
        <Link href="/admin/educations/new" className={buttonVariants({ size: "sm" })}>{t("newEntry")}</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("loading")}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : educations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("empty")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="px-4 py-3 font-medium">{t("colInstitution")}</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">{t("colDegree")}</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">{t("colGraduated")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {educations.map((edu) => (
                <tr key={edu.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-foreground font-medium">{edu.institution}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-foreground/80">{edu.degree_en}</p>
                    <p className="text-muted-foreground/70 text-xs mt-0.5">{edu.field_en}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-muted-foreground text-xs">{edu.graduated_at ?? "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/educations/${edu.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {t("edit")}
                      </Link>
                      <Button
                        variant="outline" size="sm"
                        onClick={() => handleDelete(edu.id)}
                        disabled={deleting === edu.id}
                        className="text-foreground/80 hover:text-red-400 hover:border-red-500 disabled:opacity-50"
                      >
                        {deleting === edu.id ? t("deleting") : t("delete")}
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
