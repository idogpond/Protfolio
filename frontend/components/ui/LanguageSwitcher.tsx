"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={`flex items-center gap-0.5 text-[11px] font-mono border border-border
                  rounded px-1.5 py-1 transition-opacity ${pending ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => switchLocale("en")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === "en"
            ? "text-primary-400 bg-primary-500/10"
            : "text-muted-foreground/70 hover:text-muted-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted-foreground/30">|</span>
      <button
        onClick={() => switchLocale("th")}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === "th"
            ? "text-primary-400 bg-primary-500/10"
            : "text-muted-foreground/70 hover:text-muted-foreground"
        }`}
        aria-label="Switch to Thai"
      >
        TH
      </button>
    </div>
  );
}
