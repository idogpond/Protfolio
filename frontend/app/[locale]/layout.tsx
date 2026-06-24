import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import axios from "axios";
import ConditionalLayout from "@/components/ui/ConditionalLayout";
import { routing } from "@/i18n/routing";

async function getProfile() {
  try {
    const res = await axios.get(
      `${process.env.INTERNAL_API_URL ?? "http://backend:8000/api"}/profile`,
      { timeout: 3000 }
    );
    return res.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile();
  return {
    title:       p?.meta_title       ?? "Portfolio | Full Stack Web Developer",
    description: p?.meta_description ?? "Full Stack Web Developer with 3+ years of experience.",
    openGraph: {
      title:       p?.meta_title       ?? "Portfolio | Full Stack Web Developer",
      description: p?.meta_description ?? "Full Stack Web Developer with 3+ years of experience.",
      images:      p?.og_image ? [p.og_image] : [],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ConditionalLayout>{children}</ConditionalLayout>
    </NextIntlClientProvider>
  );
}
