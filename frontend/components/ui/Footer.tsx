"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t    = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-800/60 py-8 mt-16">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-dark-600 text-xs font-mono">
          © {year} — {t("built")}
        </p>
        <div className="flex items-center gap-1 text-dark-700 text-xs font-mono">
          <span className="text-primary-500">▲</span>
          <a href="#" className="hover:text-dark-400 transition-colors ml-1">
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
