"use client";

import { useEffect, useState } from "react";
import adminApi from "@/lib/adminApi";
import type { Blog } from "@/types";

export default function AdminBlogsPage() {
  const [blogs, setBlogs]   = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    try {
      const res = await adminApi.get<{ data: Blog[] }>("/admin/blogs");
      setBlogs(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("ยืนยันการลบ Blog นี้?")) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-dark-500 text-sm mt-1">{blogs.length} posts</p>
        </div>
        <a href="/admin/blogs/new" className="btn-primary text-sm">+ New Post</a>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-500">Loading…</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-dark-500">No blog posts yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 text-dark-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Published</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{blog.title}</p>
                    <p className="text-dark-500 text-xs font-mono mt-0.5">{blog.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {blog.is_published
                      ? <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Published</span>
                      : <span className="text-xs text-dark-500 bg-dark-800 px-2 py-0.5 rounded-full">Draft</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-dark-400 text-xs">
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString("th-TH")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/admin/blogs/${blog.id}`}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-primary-500 hover:text-primary-400 transition-colors">
                        Edit
                      </a>
                      <button onClick={() => handleDelete(blog.id)} disabled={deleting === blog.id}
                        className="text-xs px-3 py-1.5 border border-dark-700 text-dark-300 rounded-lg
                                   hover:border-red-500 hover:text-red-400 transition-colors disabled:opacity-50">
                        {deleting === blog.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
