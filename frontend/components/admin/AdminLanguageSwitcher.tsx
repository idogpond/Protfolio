"use client";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";

export default function AdminLanguageSwitcher() {
  const locale = useLocale();

  function switchLocale(next: string) {
    Cookies.set("admin_locale", next, { expires: 365, sameSite: "strict" });
    window.location.reload();
  }

  const btnCls = (loc: string) =>
    `px-2 py-0.5 rounded transition-colors ${
      locale === loc
        ? "text-primary-400 bg-primary-500/10"
        : "text-dark-500 hover:text-dark-300"
    }`;

  return (
    <div className="flex items-center justify-center gap-0.5 text-[11px] font-mono border border-dark-800 rounded px-1 py-1 mx-3 mb-2">
      <button onClick={() => switchLocale("en")} className={btnCls("en")}>EN</button>
      <span className="text-dark-700">|</span>
      <button onClick={() => switchLocale("th")} className={btnCls("th")}>TH</button>
    </div>
  );
}
