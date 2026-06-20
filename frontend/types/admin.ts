export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface DashboardStats {
  projects: number;
  contacts: number;
  unread: number;
}

export interface AdminContact {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ProjectFormValues {
  title: string;
  title_th: string;
  description: string;
  description_th: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  image_url: string;
  is_featured: boolean;
  order: number;
}

export interface ExperienceFormValues {
  company: string;
  position_en: string;
  position_th: string;
  period: string;
  started_at: string;
  ended_at: string;
  description_en: string[];
  description_th: string[];
  tech: string[];
  order: number;
}

export interface SkillFormValues {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "other";
  order: number;
}

export interface EducationFormValues {
  degree_en: string;
  degree_th: string;
  field_en: string;
  field_th: string;
  institution: string;
  started_at: string | null;
  graduated_at: string | null;
  gpa: string | null;
  order: number;
}

// Re-export Profile from index for admin use
export type { Profile } from "./index";
