"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import adminApi from "@/lib/adminApi";
import AdminLanguageSwitcher from "@/components/admin/AdminLanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname     = usePathname();
  const router       = useRouter();
  const t            = useTranslations("admin.sidebar");
  const [loggingOut, setLoggingOut] = useState(false);

  const NAV = [
    {
      href: "/admin/dashboard",
      label: t("nav.dashboard"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      href: "/admin/profile",
      label: t("nav.profile"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      href: "/admin/projects",
      label: t("nav.projects"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      href: "/admin/contacts",
      label: t("nav.contacts"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      href: "/admin/experiences",
      label: t("nav.experiences"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      ),
    },
    {
      href: "/admin/skills",
      label: t("nav.skills"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      href: "/admin/educations",
      label: t("nav.educations"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await adminApi.post("/auth/logout");
    } finally {
      Cookies.remove("admin_token");
      router.push("/admin/login");
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border flex flex-col",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
          <span className="text-lg font-bold gradient-text">&lt;Admin /&gt;</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-500/15 text-primary-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className={active ? "text-primary-400" : ""}>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom: theme toggle + language switcher + view site + logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-muted-foreground/50 text-xs font-mono">Theme</span>
            <ThemeToggle />
          </div>
          <AdminLanguageSwitcher />
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground/70
                       hover:text-foreground hover:bg-muted transition-colors mb-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {t("viewPublicSite")}
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400
                       hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {loggingOut ? t("loggingOut") : t("logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
