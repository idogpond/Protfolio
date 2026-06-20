"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/lib/data";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const NAV_KEYS = ["about", "skills", "projects", "experience", "contact"] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/95 backdrop-blur-md border-b border-dark-800/80"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 flex items-center justify-center bg-primary-500 text-dark-950
                           text-xs font-display font-extrabold rounded-sm
                           group-hover:bg-primary-400 transition-colors">
            YN
          </span>
          <span className="text-sm font-mono text-dark-500 group-hover:text-dark-300
                           transition-colors hidden sm:block tracking-wider">
            /portfolio
          </span>
        </a>

        {/* Desktop links + switcher */}
        <div className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-dark-400 hover:text-white
                             text-sm transition-colors duration-200"
                >
                  <span className="text-primary-500/80 font-mono text-[10px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:text-white transition-colors">
                    {t(NAV_KEYS[i])}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>

        {/* Mobile: switcher + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 flex flex-col justify-center items-end gap-1.5
                       text-dark-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? "w-5 -rotate-45 -translate-y-[5px]" : "w-3.5"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-dark-950/98 backdrop-blur-md border-b border-dark-800"
          >
            <ul className="section-container py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-dark-300 hover:text-white
                               transition-colors text-sm"
                  >
                    <span className="text-primary-500 font-mono text-[10px] w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(NAV_KEYS[i])}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
