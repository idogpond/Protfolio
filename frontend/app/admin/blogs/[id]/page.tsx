"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import adminApi from "@/lib/adminApi";
import type { Blog } from "@/types";
import type { BlogFormValues } from "@/types/admin";

export default function EditBlogPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const [blog, setBlog]     = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .get<{ data: Blog }>(`/admin/blogs/${id}`)
      .then((res) => setBlog(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: BlogFormValues) {
    await adminApi.put(`/admin/blogs/${id}`, data);
    router.push("/admin/blogs");
  }

  if (loading) return <div className="text-dark-500 p-8">Loading…</div>;
  if (!blog)   return <div className="text-red-400 p-8">Blog not found.</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <a href="/admin/blogs" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          ← Back to Blogs
        </a>
        <h1 className="text-2xl font-bold text-white mt-2">Edit Blog Post</h1>
      </div>
      <div className="card p-6">
        <BlogForm
          defaultValues={{
            title:        blog.title,
            slug:         blog.slug,
            content:      blog.content,
            excerpt:      blog.excerpt      ?? "",
            cover_image:  blog.cover_image  ?? "",
            is_published: blog.is_published,
            published_at: blog.published_at ?? "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Post"
        />
      </div>
    </div>
  );
}
