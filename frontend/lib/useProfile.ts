"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { ProfileSettings } from "@/types/admin";

const EMPTY: ProfileSettings = {
  name: "", nickname: "", job_title: "", bio: "", about_me: "",
  profile_image: "", years_of_experience: "3", date_of_birth: "",
  location: "", available_for_hire: false,
  email: "", phone: "", line_id: "", whatsapp: "",
  github_url: "", linkedin_url: "", facebook_url: "",
  twitter_url: "", instagram_url: "", youtube_url: "", website_url: "",
  resume_url: "", resume_label: "Download CV",
  meta_title: "", meta_description: "", og_image: "",
};

let cache: ProfileSettings | null = null;

export function useProfile() {
  const [profile, setProfile] = useState<ProfileSettings>(cache ?? EMPTY);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) { setProfile(cache); setLoading(false); return; }

    api.get<ProfileSettings>("/profile").then((res) => {
      cache = res.data;
      setProfile(res.data);
      setError(null);
    }).catch(() => {
      setError("Failed to load profile");
    }).finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}
