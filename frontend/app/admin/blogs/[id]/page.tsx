"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import axios from "axios";
import BlogForm from "@/components/admin/BlogForm";
import adminApi from "@/lib/adminApi";
import type { Blog } from "@/types";
import type { BlogFormValues } from "@/types/admin";

export default function EditBlogPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const t        = useTranslations("admin.blogs");
  const [blog, setBlog]           = useState<Blog | null>(null);
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<{ data: Blog }>(`/admin/blogs/${id}`)
      .then((res) => setBlog(res.data.data))
      .catch(() => setFetchError(t("serverError")))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: BlogFormValues) {
    try {
      await adminApi.put(`/admin/blogs/${id}`, data);
      router.push("/admin/blogs");
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : t("serverError");
      console.error(err);
      throw new Error(message);
    }
  }

  if (loading)    return <div className="text-dark-500 p-8">{t("loading")}</div>;
  if (fetchError) return <div className="text-red-400 p-8">{fetchError}</div>;
  if (!blog)      return <div className="text-red-400 p-8">{t("notFound")}</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/blogs" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          {t("backToList")}
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">{t("editTitle")}</h1>
      </div>
      <div className="card p-6">
        <BlogForm
          defaultValues={{
            title:        blog.title,
            slug:         blog.slug,
            excerpt:      blog.excerpt      ?? "",
            content:      blog.content,
            cover_image:  blog.cover_image  ?? "",
            published_at: blog.published_at ?? "",
            is_published: blog.is_published,
          }}
          onSubmit={handleSubmit}
          submitLabel={t("updateLabel")}
        />
      </div>
    </div>
  );
}
