export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface DashboardStats {
  projects: number;
  blogs: number;
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
  description: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  image_url: string;
  is_featured: boolean;
  order: number;
}

export interface ProfileSettings {
  // Personal
  name: string;
  nickname: string;
  job_title: string;
  bio: string;
  about_me: string;
  profile_image: string;
  years_of_experience: string;
  date_of_birth: string;
  location: string;
  available_for_hire: boolean | string;
  // Contact
  email: string;
  phone: string;
  line_id: string;
  whatsapp: string;
  // Social
  github_url: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
  website_url: string;
  // Resume
  resume_url: string;
  resume_label: string;
  // SEO
  meta_title: string;
  meta_description: string;
  og_image: string;
  [key: string]: string | boolean;
}

export interface BlogFormValues {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  is_published: boolean;
  published_at: string;
}
