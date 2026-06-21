import type { Metadata } from "next";
import type { Profile, ApiResponse } from "@/types";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"}/profile`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return {};
    const json: ApiResponse<Profile> = await res.json();
    const p = json.data;
    const isTh = locale === "th";
    return {
      title: (isTh ? p.meta_title_th : p.meta_title_en) ?? p.name,
      description: (isTh ? p.meta_description_th : p.meta_description_en) ?? undefined,
      openGraph: p.og_image ? { images: [p.og_image] } : undefined,
    };
  } catch {
    return {};
  }
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
