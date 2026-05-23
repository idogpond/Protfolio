"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import adminApi from "@/lib/adminApi";
import Toast from "@/components/admin/Toast";
import type { ProfileSettings } from "@/types/admin";

// ─── Schema ─────────────────────────────────────────────────────────────────
const schema = z.object({
  name:                z.string().min(1, "Required"),
  nickname:            z.string(),
  job_title:           z.string(),
  bio:                 z.string(),
  about_me:            z.string(),
  profile_image:       z.string(),
  years_of_experience: z.string(),
  date_of_birth:       z.string(),
  location:            z.string(),
  available_for_hire:  z.boolean(),
  email:               z.string().email("Invalid email").or(z.literal("")),
  phone:               z.string(),
  line_id:             z.string(),
  whatsapp:            z.string(),
  github_url:          z.string(),
  linkedin_url:        z.string(),
  facebook_url:        z.string(),
  twitter_url:         z.string(),
  instagram_url:       z.string(),
  youtube_url:         z.string(),
  website_url:         z.string(),
  resume_url:          z.string(),
  resume_label:        z.string(),
  meta_title:          z.string(),
  meta_description:    z.string(),
  og_image:            z.string(),
});

type FormValues = z.infer<typeof schema>;

// ─── Tabs config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "personal", label: "ข้อมูลส่วนตัว" },
  { id: "contact",  label: "ช่องทางติดต่อ" },
  { id: "social",   label: "Social Links"  },
  { id: "resume",   label: "Resume / CV"   },
  { id: "seo",      label: "SEO & Meta"    },
] as const;

type TabId = typeof TABS[number]["id"];

// ─── Shared UI helpers ───────────────────────────────────────────────────────
function Field({ label, hint, error, children }: {
  label: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-dark-300 text-sm font-medium">{label}</label>
      {hint && <p className="text-dark-600 text-xs">{hint}</p>}
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError = false) {
  return `w-full px-4 py-2.5 bg-dark-800 border rounded-xl text-white placeholder-dark-600
          outline-none transition-colors text-sm
          ${hasError ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [loading, setLoading]     = useState(true);
  const [toast, setToast]         = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  // Load profile data
  useEffect(() => {
    adminApi
      .get<ProfileSettings>("/admin/profile")
      .then((res) => {
        const d = res.data;
        reset({
          name:                String(d.name                ?? ""),
          nickname:            String(d.nickname            ?? ""),
          job_title:           String(d.job_title           ?? ""),
          bio:                 String(d.bio                 ?? ""),
          about_me:            String(d.about_me            ?? ""),
          profile_image:       String(d.profile_image       ?? ""),
          years_of_experience: String(d.years_of_experience ?? ""),
          date_of_birth:       String(d.date_of_birth       ?? ""),
          location:            String(d.location            ?? ""),
          available_for_hire:  d.available_for_hire === true || d.available_for_hire === "true",
          email:               String(d.email               ?? ""),
          phone:               String(d.phone               ?? ""),
          line_id:             String(d.line_id             ?? ""),
          whatsapp:            String(d.whatsapp            ?? ""),
          github_url:          String(d.github_url          ?? ""),
          linkedin_url:        String(d.linkedin_url        ?? ""),
          facebook_url:        String(d.facebook_url        ?? ""),
          twitter_url:         String(d.twitter_url         ?? ""),
          instagram_url:       String(d.instagram_url       ?? ""),
          youtube_url:         String(d.youtube_url         ?? ""),
          website_url:         String(d.website_url         ?? ""),
          resume_url:          String(d.resume_url          ?? ""),
          resume_label:        String(d.resume_label        ?? ""),
          meta_title:          String(d.meta_title          ?? ""),
          meta_description:    String(d.meta_description    ?? ""),
          og_image:            String(d.og_image            ?? ""),
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  async function onSubmit(data: FormValues) {
    try {
      await adminApi.post("/admin/profile", data);
      showToast("บันทึกข้อมูลสำเร็จ", "success");
    } catch {
      showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-dark-500 text-sm mt-1">ข้อมูลส่วนตัวที่แสดงบนหน้าเว็บ Public</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-800/50 p-1 rounded-xl border border-dark-800 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                        ${activeTab === tab.id
                          ? "bg-dark-900 text-white shadow border border-dark-700"
                          : "text-dark-400 hover:text-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">

        {/* ── Tab: Personal ── */}
        {activeTab === "personal" && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="ชื่อ-นามสกุล *" error={errors.name?.message}>
                <input {...register("name")} placeholder="Your Name" className={inputCls(!!errors.name)} />
              </Field>
              <Field label="ชื่อเล่น">
                <input {...register("nickname")} placeholder="Dev" className={inputCls()} />
              </Field>
            </div>
            <Field label="ตำแหน่งงาน">
              <input {...register("job_title")} placeholder="Full Stack Developer" className={inputCls()} />
            </Field>
            <Field label="Bio (สั้น — แสดงใน Hero)">
              <textarea {...register("bio")} rows={3} placeholder="แนะนำตัวสั้นๆ…" className={`${inputCls()} resize-none`} />
            </Field>
            <Field label="About Me (ยาว — แสดงใน About Section)">
              <textarea {...register("about_me")} rows={6} placeholder="เกี่ยวกับฉัน…" className={`${inputCls()} resize-y`} />
            </Field>
            <Field label="URL รูปโปรไฟล์">
              <input {...register("profile_image")} placeholder="https://…/avatar.jpg" className={inputCls()} />
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="ประสบการณ์ (ปี)">
                <input {...register("years_of_experience")} placeholder="3" className={inputCls()} />
              </Field>
              <Field label="วันเกิด">
                <input type="date" {...register("date_of_birth")} className={inputCls()} />
              </Field>
              <Field label="ที่อยู่ / เมือง">
                <input {...register("location")} placeholder="Bangkok, Thailand" className={inputCls()} />
              </Field>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="available_for_hire" {...register("available_for_hire")}
                className="w-4 h-4 accent-primary-500" />
              <label htmlFor="available_for_hire" className="text-dark-300 text-sm cursor-pointer">
                Available for hire
              </label>
            </div>
          </>
        )}

        {/* ── Tab: Contact ── */}
        {activeTab === "contact" && (
          <>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email")} placeholder="your@email.com" className={inputCls(!!errors.email)} />
            </Field>
            <Field label="Phone">
              <input {...register("phone")} placeholder="+66 8X-XXXX-XXXX" className={inputCls()} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Line ID">
                <input {...register("line_id")} placeholder="your_line_id" className={inputCls()} />
              </Field>
              <Field label="WhatsApp">
                <input {...register("whatsapp")} placeholder="+66XXXXXXXXX" className={inputCls()} />
              </Field>
            </div>
          </>
        )}

        {/* ── Tab: Social ── */}
        {activeTab === "social" && (
          <>
            {(["github_url","linkedin_url","facebook_url","twitter_url","instagram_url","youtube_url","website_url"] as const).map((key) => (
              <Field key={key} label={key.replace("_url","").replace(/^\w/, c => c.toUpperCase()) + " URL"}>
                <input {...register(key)} placeholder="https://…" className={inputCls()} />
              </Field>
            ))}
          </>
        )}

        {/* ── Tab: Resume ── */}
        {activeTab === "resume" && (
          <>
            <Field label="Resume / CV URL" hint="Path หรือ URL สำหรับดาวน์โหลด เช่น /resume.pdf">
              <input {...register("resume_url")} placeholder="/resume.pdf" className={inputCls()} />
            </Field>
            <Field label="ชื่อปุ่ม Download">
              <input {...register("resume_label")} placeholder="Download CV" className={inputCls()} />
            </Field>
          </>
        )}

        {/* ── Tab: SEO ── */}
        {activeTab === "seo" && (
          <>
            <Field label="Meta Title">
              <input {...register("meta_title")} placeholder="Your Name | Full Stack Developer" className={inputCls()} />
            </Field>
            <Field label="Meta Description" hint="แนะนำ 150-160 ตัวอักษร">
              <textarea {...register("meta_description")} rows={3}
                placeholder="Full Stack Web Developer with 3+ years…" className={`${inputCls()} resize-none`} />
            </Field>
            <Field label="OG Image URL" hint="รูปที่แสดงเมื่อ share บน Social">
              <input {...register("og_image")} placeholder="https://…/og-image.png" className={inputCls()} />
            </Field>
          </>
        )}

        {/* Save button */}
        <div className="flex justify-end pt-2 border-t border-dark-800">
          <button type="submit" disabled={isSubmitting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50">
            {isSubmitting && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isSubmitting ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
