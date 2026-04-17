"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Building2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Sujet trop court"),
  message: z.string().min(10, "Message trop court"),
});

type FormState = z.infer<typeof schema>;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("send failed");
      toast.success("Message envoyé — je reviens vers vous rapidement.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Envoi impossible. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-brand/15 blur-[110px]" />
        <div className="absolute right-[10%] top-[40%] h-[260px] w-[260px] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Travaillons ensemble"
              title={
                <>
                  Un projet en tête ?{" "}
                  <span className="text-gradient-brand">Parlons-en.</span>
                </>
              }
              description="Réponse sous 24h en semaine. Que vous ayez un brief précis ou juste une intuition, je peux vous aider à clarifier la suite."
            />

            <div className="mt-10 space-y-3">
              <InfoRow icon={Building2} label={profile.company} value={profile.title} />
              <InfoRow icon={MapPin} label="Localisation" value={profile.location} />
              <InfoRow icon={Mail} label="Email" value={profile.email} />
            </div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/10 bg-bg-card/50 p-5 backdrop-blur-xl sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nom"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  placeholder="Votre nom"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="vous@exemple.com"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Sujet"
                  value={form.subject}
                  onChange={(v) => update("subject", v)}
                  placeholder="Projet web, mobile, conseil…"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Message"
                  value={form.message}
                  onChange={(v) => update("message", v)}
                  placeholder="Décrivez votre besoin, votre stack, vos délais…"
                  multiline
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="tap shine relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-6 py-4 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card/40 px-5 py-4 backdrop-blur">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-soft">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-white/40">
          {label}
        </div>
        <div className="truncate text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const base =
    "w-full rounded-2xl border border-white/10 bg-bg/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-brand/60 focus:bg-bg/60 focus:ring-2 focus:ring-brand/20";
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}
