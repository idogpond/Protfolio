"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t    = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8 mt-16">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/50 text-xs font-mono">
          © {year} — {t("built")}
        </p>
        <div className="flex items-center gap-1 text-muted-foreground/30 text-xs font-mono">
          <span className="text-primary-500">▲</span>
          <a href="#" className="hover:text-muted-foreground transition-colors ml-1">
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
