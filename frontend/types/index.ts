// ─── API Response wrapper ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export interface Profile {
  id: number;
  name: string;
  nickname: string | null;
  job_title_en: string;
  job_title_th: string | null;
  bio_en: string;
  bio_th: string | null;
  about_en: string | null;
  about_th: string | null;
  profile_image: string | null;
  years_of_experience: number;
  date_of_birth: string | null;
  location_en: string | null;
  location_th: string | null;
  available_for_hire: boolean;
  email: string | null;
  phone: string | null;
  line_id: string | null;
  whatsapp: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  website_url: string | null;
  resume_url: string | null;
  resume_label_en: string | null;
  resume_label_th: string | null;
  meta_title_en: string | null;
  meta_title_th: string | null;
  meta_description_en: string | null;
  meta_description_th: string | null;
  og_image: string | null;
}

// ─── Experience ──────────────────────────────────────────────────────────────
export interface Experience {
  id: number;
  company: string;
  position_en: string;
  position_th: string | null;
  period: string;
  started_at: string | null;
  ended_at: string | null;
  description_en: string[];
  description_th: string[] | null;
  tech: string[];
  order: number;
}

// ─── Skill ───────────────────────────────────────────────────────────────────
export interface Skill {
  id: number;
  name: string;
  icon: string | null;
  level: number;
  category: "frontend" | "backend" | "devops" | "other";
  order: number;
}

// ─── Education ───────────────────────────────────────────────────────────────
export interface Education {
  id: number;
  degree_en: string;
  degree_th: string | null;
  field_en: string;
  field_th: string | null;
  institution: string;
  started_at: number | null;
  graduated_at: number | null;
  gpa: number | null;
  order: number;
}

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  title_th: string | null;
  description: string;
  description_th: string | null;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// ─── Nav Link ────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}
