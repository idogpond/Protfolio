"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import api from "@/lib/axios";
import { useProfile } from "@/lib/useProfile";
import type { ContactFormData } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { profile } = useProfile();
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const contactInfo = [
    {
      show: !!profile.email,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
      label: "Email", value: String(profile.email), href: `mailto:${profile.email}`,
    },
    {
      show: !!profile.github_url,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
      label: "GitHub", value: String(profile.github_url).replace("https://",""), href: String(profile.github_url),
    },
    {
      show: !!profile.linkedin_url,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
      label: "LinkedIn", value: String(profile.linkedin_url).replace("https://",""), href: String(profile.linkedin_url),
    },
  ].filter(c => c.show);

  function validate(): boolean {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    if (!form.message.trim() || form.message.length < 10) e.message = "กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      const res = await api.post<{ message: string }>("/contacts", form);
      setServerMessage(res.data.message);
      setState("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setState("error");
      setServerMessage(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  return (
    <section id="contact" className="py-24 bg-dark-900/30">
      <div className="section-container">
        <SectionHeader accent="// get in touch" title="Contact Me" subtitle="Have a project in mind? Let's talk!" />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-xl">Let&apos;s connect</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                ยินดีรับงาน Freelance, Full-time, หรือโปรเจกต์ที่น่าสนใจ ส่งข้อความมาได้เลยครับ
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 card hover:border-primary-500/30 hover:text-primary-300 transition-all group">
                  <span className="text-primary-400 group-hover:scale-110 transition-transform">{info.icon}</span>
                  <div>
                    <p className="text-dark-500 text-xs">{info.label}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="card p-7 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-dark-300 text-sm font-medium">ชื่อ <span className="text-red-400">*</span></label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your Name"
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-md text-white placeholder-dark-600 outline-none transition-colors text-sm ${errors.name ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`} />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-dark-300 text-sm font-medium">อีเมล <span className="text-red-400">*</span></label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-md text-white placeholder-dark-600 outline-none transition-colors text-sm ${errors.email ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`} />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-dark-300 text-sm font-medium">ข้อความ <span className="text-red-400">*</span></label>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="สวัสดีครับ ผมสนใจ..."
                  maxLength={2000}
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-md text-white placeholder-dark-600 outline-none transition-colors text-sm resize-none ${errors.message ? "border-red-500" : "border-dark-700 focus:border-primary-500"}`} />
                <div className="flex justify-between items-start mt-1">
                  {errors.message ? <p className="text-red-400 text-xs">{errors.message}</p> : <span />}
                  <p className={`text-xs font-mono transition-colors ${
                    form.message.length >= 1900 ? "text-amber-400" : "text-dark-600"
                  }`}>
                    {form.message.length}/2000
                  </p>
                </div>
              </div>
              {serverMessage && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm ${state === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-400"}`}>
                  {serverMessage}
                </motion.div>
              )}
              <button type="submit" disabled={state === "loading" || state === "success"}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                {state === "loading" && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                {state === "loading" ? "กำลังส่ง..." : state === "success" ? "ส่งแล้ว ✓" : "ส่งข้อความ"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
