import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

const LOCALES = ["en", "th"] as const;
type AdminLocale = (typeof LOCALES)[number];

const messageLoaders: Record<AdminLocale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("@/messages/en.json"),
  th: () => import("@/messages/th.json"),
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const raw = cookieStore.get("admin_locale")?.value;
  const locale: AdminLocale = (LOCALES as readonly string[]).includes(raw ?? "")
    ? (raw as AdminLocale)
    : "en";

  const messages = (await messageLoaders[locale]()).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AdminShell>{children}</AdminShell>
    </NextIntlClientProvider>
  );
}
