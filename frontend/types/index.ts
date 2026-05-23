// ─── API Response wrapper ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  is_published: boolean;
  published_at: string | null;
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

// ─── Skill ───────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "other";
}

// ─── Experience ──────────────────────────────────────────────────────────────
export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  tech: string[];
}
