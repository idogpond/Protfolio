"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { DashboardStats } from "@/types/admin";

export default function DashboardPage() {
  const t = useTranslations("admin.dashboard");
  const [stats, setStats]     = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const STAT_CARDS = [
    {
      key: "projects" as const,
      label: t("stats.projects"),
      href: "/admin/projects",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      key: "blogs" as const,
      label: t("stats.blogs"),
      href: "/admin/blogs",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      key: "contacts" as const,
      label: t("stats.contacts"),
      href: "/admin/contacts",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      key: "unread" as const,
      label: t("stats.unread"),
      href: "/admin/contacts",
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    adminApi
      .get<DashboardStats>("/admin/stats")
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-dark-500 text-sm mt-1">{t("overview")}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <a
            key={card.key}
            href={card.href}
            className={`card p-6 border hover:border-opacity-60 transition-all hover:-translate-y-0.5 ${card.bg}`}
          >
            <div className={`mb-3 ${card.color}`}>{card.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? (
                <div className="h-8 w-12 bg-dark-700 rounded animate-pulse" />
              ) : (
                stats?.[card.key] ?? 0
              )}
            </div>
            <div className="text-dark-400 text-sm">{card.label}</div>
          </a>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-white font-semibold mb-4">{t("quickActions")}</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/projects/new" className="btn-primary text-sm">{t("newProject")}</a>
          <a href="/admin/blogs/new"    className="btn-outline text-sm">{t("newBlog")}</a>
          <a href="/admin/contacts"     className="btn-outline text-sm">{t("viewMessages")}</a>
        </div>
      </div>
    </div>
  );
}
