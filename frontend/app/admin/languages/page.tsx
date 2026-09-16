"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { Language } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { useConfirm } from "@/components/ui/confirm-dialog";

export default function AdminLanguagesPage() {
  const t = useTranslations("admin.languages");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading]     = useState(true);
  const [deleting, setDeleting]   = useState<number | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const { confirm, dialog } = useConfirm();

  useEffect(() => { fetchLanguages(); }, []);

  async function fetchLanguages() {
    try {
      const res = await adminApi.get<{ data: Language[] }>("/admin/languages");
      setLanguages(res.data.data);
    } catch {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!(await confirm(t("confirmDelete")))) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/admin/languages/${id}`);
      setLanguages((prev) => prev.filter((l) => l.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      {dialog}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground/70 text-sm mt-1">{t("count", { count: languages.length })}</p>
        </div>
        <Link href="/admin/languages/new" className={buttonVariants({ size: "sm" })}>{t("newLanguage")}</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("loading")}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : languages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground/70">{t("empty")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="px-4 py-3 font-medium">{t("colName")}</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">{t("colProficiency")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {languages.map((language) => (
                <tr key={language.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-foreground font-medium">{language.name_en}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-muted-foreground/80">{language.proficiency_en}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/languages/${language.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {t("edit")}
                      </Link>
                      <Button
                        variant="outline" size="sm"
                        onClick={() => handleDelete(language.id)}
                        disabled={deleting === language.id}
                        className="text-foreground/80 hover:text-red-400 hover:border-red-500 disabled:opacity-50"
                      >
                        {deleting === language.id ? t("deleting") : t("delete")}
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
