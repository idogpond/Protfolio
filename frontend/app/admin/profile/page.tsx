"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import adminApi from "@/lib/adminApi";
import Toast from "@/components/admin/Toast";
import type { Profile } from "@/types";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label }    from "@/components/ui/label";
import { Field }    from "@/components/ui/field";

// ─── Explicit FormValues type ─────────────────────────────────────────────────
type FormValues = {
  name:                 string;
  nickname:             string;
  job_title_en:         string;
  job_title_th:         string;
  bio_en:               string;
  bio_th:               string;
  about_en:             string;
  about_th:             string;
  profile_image:        string;
  years_of_experience:  number;
  date_of_birth:        string;
  location_en:          string;
  location_th:          string;
  available_for_hire:   boolean;
  email:                string;
  phone:                string;
  line_id:              string;
  whatsapp:             string;
  github_url:           string;
  linkedin_url:         string;
  facebook_url:         string;
  twitter_url:          string;
  instagram_url:        string;
  youtube_url:          string;
  website_url:          string;
  resume_url:           string;
  resume_label_en:      string;
  resume_label_th:      string;
  meta_title_en:        string;
  meta_title_th:        string;
  meta_description_en:  string;
  meta_description_th:  string;
  og_image:             string;
};

// ─── TabId ────────────────────────────────────────────────────────────────────
type TabId = "personal" | "contact" | "social" | "resume" | "seo";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminProfilePage() {
  const t = useTranslations("admin.profile");

  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [loading, setLoading]     = useState(true);
  const [toast, setToast]         = useState<{ message: string; type: "success" | "error" } | null>(null);

  // ─── Schema (inside component so t() is available) ─────────────────────────
  const schema = useMemo(
    () =>
      z.object({
        name:                z.string().min(1, t("errors.required")),
        nickname:            z.string(),
        job_title_en:        z.string(),
        job_title_th:        z.string(),
        bio_en:              z.string(),
        bio_th:              z.string(),
        about_en:            z.string(),
        about_th:            z.string(),
        profile_image:       z.string(),
        years_of_experience: z.coerce.number(),
        date_of_birth:       z.string(),
        location_en:         z.string(),
        location_th:         z.string(),
        available_for_hire:  z.boolean(),
        email:               z.string().email(t("errors.emailInvalid")).or(z.literal("")),
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
        resume_label_en:     z.string(),
        resume_label_th:     z.string(),
        meta_title_en:       z.string(),
        meta_title_th:       z.string(),
        meta_description_en: z.string(),
        meta_description_th: z.string(),
        og_image:            z.string(),
      }),
    [t]
  );

  // ─── Tabs (inside component so t() is available) ───────────────────────────
  const TABS = [
    { id: "personal" as TabId, label: t("tabs.personal") },
    { id: "contact"  as TabId, label: t("tabs.contact")  },
    { id: "social"   as TabId, label: t("tabs.social")   },
    { id: "resume"   as TabId, label: t("tabs.resume")   },
    { id: "seo"      as TabId, label: t("tabs.seo")      },
  ];

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  // Load profile data
  useEffect(() => {
    adminApi
      .get<Profile>("/admin/profile")
      .then((res) => {
        const d = res.data;
        reset({
          name:                String(d.name                ?? ""),
          nickname:            String(d.nickname            ?? ""),
          job_title_en:        String(d.job_title_en        ?? ""),
          job_title_th:        String(d.job_title_th        ?? ""),
          bio_en:              String(d.bio_en              ?? ""),
          bio_th:              String(d.bio_th              ?? ""),
          about_en:            String(d.about_en            ?? ""),
          about_th:            String(d.about_th            ?? ""),
          profile_image:       String(d.profile_image       ?? ""),
          years_of_experience: Number(d.years_of_experience ?? 0),
          date_of_birth:       String(d.date_of_birth       ?? ""),
          location_en:         String(d.location_en         ?? ""),
          location_th:         String(d.location_th         ?? ""),
          available_for_hire:  d.available_for_hire === true,
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
          resume_label_en:     String(d.resume_label_en     ?? ""),
          resume_label_th:     String(d.resume_label_th     ?? ""),
          meta_title_en:       String(d.meta_title_en       ?? ""),
          meta_title_th:       String(d.meta_title_th       ?? ""),
          meta_description_en: String(d.meta_description_en ?? ""),
          meta_description_th: String(d.meta_description_th ?? ""),
          og_image:            String(d.og_image            ?? ""),
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  async function onSubmit(data: FormValues) {
    try {
      await adminApi.post("/admin/profile", data);
      showToast(t("saveSuccess"), "success");
    } catch {
      showToast(t("saveError"), "error");
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
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-dark-500 text-sm mt-1">{t("subtitle")}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-800/50 p-1 rounded-xl border border-dark-800 overflow-x-auto">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                        ${activeTab === tab.id
                          ? "bg-dark-900 text-white shadow border border-dark-700"
                          : "text-dark-400 hover:text-white"}`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">

        {/* ── Tab: Personal ── */}
        {activeTab === "personal" && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.fullName")} error={errors.name?.message} htmlFor="name">
                <Input id="name" {...register("name")} placeholder="Your Name"
                  className={errors.name ? "border-destructive" : ""} />
              </Field>
              <Field label={t("personal.nickname")} htmlFor="nickname">
                <Input id="nickname" {...register("nickname")} placeholder="Dev" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.jobTitleEn")} htmlFor="job_title_en">
                <Input id="job_title_en" {...register("job_title_en")} placeholder="Full Stack Developer" />
              </Field>
              <Field label={t("personal.jobTitleTh")} htmlFor="job_title_th">
                <Input id="job_title_th" {...register("job_title_th")} placeholder="นักพัฒนา Full Stack" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.bioEn")} htmlFor="bio_en">
                <Textarea id="bio_en" {...register("bio_en")} rows={3} placeholder="…" className="resize-none" />
              </Field>
              <Field label={t("personal.bioTh")} htmlFor="bio_th">
                <Textarea id="bio_th" {...register("bio_th")} rows={3} placeholder="…" className="resize-none" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.aboutEn")} htmlFor="about_en">
                <Textarea id="about_en" {...register("about_en")} rows={6} placeholder="…" className="resize-y" />
              </Field>
              <Field label={t("personal.aboutTh")} htmlFor="about_th">
                <Textarea id="about_th" {...register("about_th")} rows={6} placeholder="…" className="resize-y" />
              </Field>
            </div>
            <Field label={t("personal.profileImage")} htmlFor="profile_image">
              <Input id="profile_image" {...register("profile_image")} placeholder="https://…/avatar.jpg" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.yearsOfExp")} htmlFor="years_of_experience">
                <Input id="years_of_experience" type="number" {...register("years_of_experience", { valueAsNumber: true })} placeholder="3" />
              </Field>
              <Field label={t("personal.dateOfBirth")} htmlFor="date_of_birth">
                <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("personal.locationEn")} htmlFor="location_en">
                <Input id="location_en" {...register("location_en")} placeholder="Bangkok, Thailand" />
              </Field>
              <Field label={t("personal.locationTh")} htmlFor="location_th">
                <Input id="location_th" {...register("location_th")} placeholder="กรุงเทพฯ ประเทศไทย" />
              </Field>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Controller
                name="available_for_hire"
                control={control}
                render={({ field }) => (
                  <Label className="flex items-center gap-3 cursor-pointer font-normal text-dark-300 text-sm">
                    <Checkbox
                      id="available_for_hire"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    {t("personal.availableForHire")}
                  </Label>
                )}
              />
            </div>
          </>
        )}

        {/* ── Tab: Contact ── */}
        {activeTab === "contact" && (
          <>
            <Field label={t("contactTab.email")} error={errors.email?.message} htmlFor="profile_email">
              <Input id="profile_email" type="email" {...register("email")} placeholder="your@email.com"
                className={errors.email ? "border-destructive" : ""} />
            </Field>
            <Field label={t("contactTab.phone")} htmlFor="phone">
              <Input id="phone" {...register("phone")} placeholder="+66 8X-XXXX-XXXX" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("contactTab.lineId")} htmlFor="line_id">
                <Input id="line_id" {...register("line_id")} placeholder="your_line_id" />
              </Field>
              <Field label={t("contactTab.whatsapp")} htmlFor="whatsapp">
                <Input id="whatsapp" {...register("whatsapp")} placeholder="+66XXXXXXXXX" />
              </Field>
            </div>
          </>
        )}

        {/* ── Tab: Social ── */}
        {activeTab === "social" && (
          <>
            <Field label={t("social.github")} htmlFor="github_url">
              <Input id="github_url" {...register("github_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.linkedin")} htmlFor="linkedin_url">
              <Input id="linkedin_url" {...register("linkedin_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.facebook")} htmlFor="facebook_url">
              <Input id="facebook_url" {...register("facebook_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.twitter")} htmlFor="twitter_url">
              <Input id="twitter_url" {...register("twitter_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.instagram")} htmlFor="instagram_url">
              <Input id="instagram_url" {...register("instagram_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.youtube")} htmlFor="youtube_url">
              <Input id="youtube_url" {...register("youtube_url")} placeholder="https://…" />
            </Field>
            <Field label={t("social.website")} htmlFor="website_url">
              <Input id="website_url" {...register("website_url")} placeholder="https://…" />
            </Field>
          </>
        )}

        {/* ── Tab: Resume ── */}
        {activeTab === "resume" && (
          <>
            <Field label={t("resume.url")} hint={t("resume.urlHint")} htmlFor="resume_url">
              <Input id="resume_url" {...register("resume_url")} placeholder="/resume.pdf" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("resume.labelEn")} htmlFor="resume_label_en">
                <Input id="resume_label_en" {...register("resume_label_en")} placeholder="Download CV" />
              </Field>
              <Field label={t("resume.labelTh")} htmlFor="resume_label_th">
                <Input id="resume_label_th" {...register("resume_label_th")} placeholder="ดาวน์โหลด CV" />
              </Field>
            </div>
          </>
        )}

        {/* ── Tab: SEO ── */}
        {activeTab === "seo" && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("seo.metaTitleEn")} htmlFor="meta_title_en">
                <Input id="meta_title_en" {...register("meta_title_en")} placeholder="Your Name | Full Stack Developer" />
              </Field>
              <Field label={t("seo.metaTitleTh")} htmlFor="meta_title_th">
                <Input id="meta_title_th" {...register("meta_title_th")} placeholder="ชื่อ | นักพัฒนา Full Stack" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("seo.metaDescriptionEn")} hint={t("seo.metaDescHint")} htmlFor="meta_description_en">
                <Textarea id="meta_description_en" {...register("meta_description_en")} rows={3}
                  placeholder="Full Stack Web Developer with 3+ years…" className="resize-none" />
              </Field>
              <Field label={t("seo.metaDescriptionTh")} hint={t("seo.metaDescHint")} htmlFor="meta_description_th">
                <Textarea id="meta_description_th" {...register("meta_description_th")} rows={3}
                  placeholder="นักพัฒนา Full Stack ที่มีประสบการณ์ 3+ ปี…" className="resize-none" />
              </Field>
            </div>
            <Field label={t("seo.ogImage")} hint={t("seo.ogImageHint")} htmlFor="og_image">
              <Input id="og_image" {...register("og_image")} placeholder="https://…/og-image.png" />
            </Field>
          </>
        )}

        {/* Save button */}
        <div className="flex justify-end pt-2 border-t border-dark-800">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isSubmitting ? t("saving") : t("save")}
          </Button>
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
