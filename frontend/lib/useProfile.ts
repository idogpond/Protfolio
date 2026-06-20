"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { Profile } from "@/types";

const EMPTY: Profile = {
  id: 0,
  name: "", nickname: null,
  job_title_en: "", job_title_th: null,
  bio_en: "", bio_th: null,
  about_en: null, about_th: null,
  profile_image: null,
  years_of_experience: 0,
  date_of_birth: null,
  location_en: null, location_th: null,
  available_for_hire: false,
  email: null, phone: null, line_id: null, whatsapp: null,
  github_url: null, linkedin_url: null, facebook_url: null,
  twitter_url: null, instagram_url: null, youtube_url: null, website_url: null,
  resume_url: null, resume_label_en: "Download CV", resume_label_th: "ดาวน์โหลด CV",
  meta_title_en: null, meta_title_th: null,
  meta_description_en: null, meta_description_th: null,
  og_image: null,
};

let cache: Profile | null = null;

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(cache ?? EMPTY);
  const [loading, setLoading] = useState(!cache);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (cache) { setProfile(cache); setLoading(false); return; }
    api.get<Profile>("/profile").then((res) => {
      cache = res.data;
      setProfile(res.data);
    }).catch(() => {
      setError("Failed to load profile");
    }).finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}
