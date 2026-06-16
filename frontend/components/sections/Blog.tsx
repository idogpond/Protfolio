"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import type { Blog } from "@/types";

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const t      = useTranslations("blog");
  const locale = useLocale();

  const date = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString(
        locale === "th" ? "th-TH" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-6 flex flex-col gap-4 hover:border-primary-500/30 hover:-translate-y-1
                 transition-all duration-300 group cursor-pointer"
    >
      {blog.cover_image ? (
        <img src={blog.cover_image} alt={blog.title}
             className="w-full h-44 object-cover rounded-lg bg-dark-700" />
      ) : (
        <div className="w-full h-44 rounded-lg bg-gradient-to-br from-primary-900/40 to-accent-900/40
                        border border-dark-700 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
      )}

      <div className="flex-1 space-y-3">
        <h3 className="text-white font-semibold text-base leading-snug
                       group-hover:text-primary-300 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="text-dark-400 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-dark-800">
        {date && <span className="text-dark-500 text-xs font-mono">{date}</span>}
        <span className="text-primary-400 text-sm font-medium flex items-center gap-1
                         group-hover:gap-2 transition-all">
          {t("readMore")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}

function BlogSkeleton() {
  return (
    <div className="card p-6 animate-pulse space-y-4">
      <div className="w-full h-44 bg-dark-700 rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-dark-700 rounded w-5/6" />
        <div className="h-3 bg-dark-700 rounded w-full" />
        <div className="h-3 bg-dark-700 rounded w-4/5" />
      </div>
      <div className="flex justify-between pt-3 border-t border-dark-800">
        <div className="h-3 bg-dark-700 rounded w-24" />
        <div className="h-3 bg-dark-700 rounded w-20" />
      </div>
    </div>
  );
}

export default function Blog() {
  const t = useTranslations("blog");
  const [blogs, setBlogs]     = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ data: Blog[] }>("/blogs")
      .then((res) => setBlogs(res.data.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && blogs.length === 0 && !error) return null;

  return (
    <section id="blog" className="py-24">
      <div className="section-container">
        <SectionHeader accent={t("accent")} title={t("title")} subtitle={t("subtitle")} />

        {error && (
          <p className="text-center text-dark-500 py-8 text-sm">{error}</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)
            : blogs.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
        </div>
      </div>
    </section>
  );
}
