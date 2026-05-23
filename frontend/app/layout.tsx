import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ui/ConditionalLayout";
import axios from "axios";

async function getProfile() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8000/api"}/profile`,
      { timeout: 3000 }
    );
    return res.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile();
  return {
    title:       p?.meta_title       ?? "Portfolio | Full Stack Web Developer",
    description: p?.meta_description ?? "Full Stack Web Developer with 3+ years of experience.",
    openGraph: {
      title:       p?.meta_title       ?? "Portfolio | Full Stack Web Developer",
      description: p?.meta_description ?? "Full Stack Web Developer with 3+ years of experience.",
      images:      p?.og_image ? [p.og_image] : [],
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark-950 text-dark-100 antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
