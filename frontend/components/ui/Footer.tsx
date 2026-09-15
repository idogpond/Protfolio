"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t    = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8 mt-16">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/50 text-xs">
          © {year} {t("built")}
        </p>
        <a href="#" className="text-muted-foreground/50 hover:text-foreground text-xs transition-colors">
          {t("backToTop")}
        </a>
      </div>
    </footer>
  );
}
