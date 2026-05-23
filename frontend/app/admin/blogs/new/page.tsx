"use client";

import { useRouter } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import adminApi from "@/lib/adminApi";
import type { BlogFormValues } from "@/types/admin";

export default function NewBlogPage() {
  const router = useRouter();

  async function handleSubmit(data: BlogFormValues) {
    await adminApi.post("/admin/blogs", data);
    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <a href="/admin/blogs" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
          ← Back to Blogs
        </a>
        <h1 className="text-2xl font-bold text-white mt-2">New Blog Post</h1>
      </div>
      <div className="card p-6">
        <BlogForm onSubmit={handleSubmit} submitLabel="Create Post" />
      </div>
    </div>
  );
}
