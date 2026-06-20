"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import adminApi from "@/lib/adminApi";
import type { AdminContact } from "@/types/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminContactsPage() {
  const t = useTranslations("admin.contacts");
  const locale = useLocale();

  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [marking, setMarking]   = useState<number | null>(null);

  useEffect(() => { fetchContacts(); }, []);

  async function fetchContacts() {
    try {
      const res = await adminApi.get<{ data: AdminContact[] }>("/admin/contacts");
      setContacts(res.data.data);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id: number) {
    setMarking(id);
    try {
      const res = await adminApi.patch<{ data: AdminContact }>(`/admin/contacts/${id}/read`);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? res.data.data : c))
      );
    } catch {
      console.error("Failed to mark contact as read");
    } finally {
      setMarking(null);
    }
  }

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(
      locale === "th" ? "th-TH" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground/70 text-sm mt-1">
            {t("count", { count: contacts.length })}
            {unreadCount > 0 && (
              <span className="ml-2 text-orange-400 font-medium">
                {t("unread", { count: unreadCount })}
              </span>
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="card p-8 text-center text-muted-foreground/70">{t("loading")}</div>
      ) : error ? (
        <div className="card p-8 text-center text-red-400">{error}</div>
      ) : contacts.length === 0 ? (
        <div className="card p-8 text-center text-muted-foreground/70">{t("empty")}</div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={cn(
                "card p-5 transition-all duration-200",
                !contact.is_read && "border-primary-500/30 bg-primary-500/5"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-foreground font-semibold">{contact.name}</span>
                    {!contact.is_read && (
                      <span className="text-xs bg-primary-500/20 text-primary-400
                                       px-2 py-0.5 rounded-full font-medium">
                        {t("newBadge")}
                      </span>
                    )}
                    <span className="text-muted-foreground/70 text-xs ml-auto shrink-0">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>

                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary-400 text-sm hover:underline"
                  >
                    {contact.email}
                  </a>

                  <p className="text-foreground/80 text-sm mt-3 leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {!contact.is_read && (
                <div className="flex justify-end mt-4 pt-4 border-t border-border">
                  <Button
                    variant="outline" size="sm"
                    onClick={() => handleMarkRead(contact.id)}
                    disabled={marking === contact.id}
                    className="text-foreground/80 hover:text-green-400 hover:border-green-500 flex items-center gap-2 disabled:opacity-50"
                  >
                    {marking === contact.id ? (
                      <>
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t("marking")}
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {t("markAsRead")}
                      </>
                    )}
                  </Button>
                </div>
              )}

              {contact.is_read && (
                <div className="flex justify-end mt-3">
                  <span className="text-xs text-muted-foreground/50 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("read")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
