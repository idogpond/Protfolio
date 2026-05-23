"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";

const schema = z.object({
  email:    z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

type FormValues = z.infer<typeof schema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setServerError("");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );
      Cookies.set("admin_token", res.data.token, { expires: 7, sameSite: "strict" });
      const from = searchParams.get("from");
      const redirectTo = from?.startsWith("/admin/") ? from : "/admin/dashboard";
      router.push(redirectTo);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setServerError(err.response?.data?.message ?? "Login failed");
      } else {
        setServerError("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text mb-1">&lt;Admin /&gt;</h1>
            <p className="text-dark-500 text-sm">Portfolio Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-dark-300 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@portfolio.com"
                {...register("email")}
                className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-600
                            outline-none transition-colors text-sm
                            ${errors.email ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-dark-300 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-600
                            outline-none transition-colors text-sm
                            ${errors.password ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isSubmitting ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>

        <p className="text-center text-dark-600 text-xs mt-6">
          <a href="/" className="hover:text-dark-400 transition-colors">← Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
