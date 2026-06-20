"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";

type FormValues = { email: string; password: string };

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const t            = useTranslations("admin.login");
  const [serverError, setServerError] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        email:    z.string().email(t("errors.emailInvalid")),
        password: z.string().min(1, t("errors.passwordRequired")),
      }),
    [t]
  );

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text mb-1">&lt;Admin /&gt;</h1>
            <p className="text-muted-foreground/70 text-sm">{t("panelTitle")}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground/80">{t("emailLabel")}</Label>
              <Input
                id="email" type="email" placeholder="admin@portfolio.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground/80">{t("passwordLabel")}</Label>
              <Input
                id="password" type="password" placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
            </div>

            {serverError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {serverError}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2">
              {isSubmitting && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground/50 text-xs mt-6">
          <a href="/" className="hover:text-muted-foreground transition-colors">{t("backToPortfolio")}</a>
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
