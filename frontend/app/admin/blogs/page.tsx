"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { Blog } from "@/types";

export default function AdminBlogsPage() {
  const t = useTranslations("admin.blogs");
  const locale = useLocale();
  const [blogs, setBlogs]     = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    try {
      const res = await adminApi.get<{ data: Blog[] }>("/admin/blogs");
      setBlogs(res.data.data);
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
      await adminApi.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError(t("serverError"));
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(dateStr: string | null | undefined, locale: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
          <p className="text-dark-500 text-sm mt-1">{t("count", { count: blogs.length })}</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary text-sm">{t("newPost")}</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-500">{t("loading")}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-dark-500">{t("empty")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 text-dark-400 text-left">
                <th className="px-4 py-3 font-medium">{t("colTitle")}</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">{t("colStatus")}</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">{t("colPublished")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{blog.title}</p>
                    {blog.excerpt && (
                      <p className="text-dark-500 text-xs mt-0.5 line-clamp-1">{blog.excerpt}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {blog.is_published
                      ? <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{t("published")}</span>
                      : <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">{t("draft")}</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-dark-400 text-xs">
                    {formatDate(blog.published_at, locale)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-primary-500 hover:text-primary-400 transition-colors"
                      >
                        {t("edit")}
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deleting === blog.id ? t("deleting") : t("delete")}
                      </button>
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
