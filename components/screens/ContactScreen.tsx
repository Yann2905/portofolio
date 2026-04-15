"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, Mail, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { profile } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Sujet trop court"),
  message: z.string().min(10, "Message trop court"),
});

type FormState = z.infer<typeof schema>;

export default function ContactScreen() {
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
    <div className="min-h-full px-5 pt-4 pb-6">
      <div className="text-[11px] uppercase tracking-widest text-brand-soft">
        Contact
      </div>
      <h2 className="font-display mt-1 text-2xl font-bold text-white">
        Parlons de votre projet
      </h2>
      <p className="mt-1 text-xs text-white/50">
        Réponse sous 24h en semaine
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <InfoRow icon={Building2} label={profile.company} value={profile.title} />
        <InfoRow icon={MapPin} label="Localisation" value={profile.location} />
        <InfoRow icon={Mail} label="Email" value={profile.email} />
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-5 space-y-3"
      >
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
        <Field
          label="Sujet"
          value={form.subject}
          onChange={(v) => update("subject", v)}
          placeholder="Projet web, mobile, conseil…"
        />
        <Field
          label="Message"
          value={form.message}
          onChange={(v) => update("message", v)}
          placeholder="Décrivez votre besoin…"
          multiline
        />

        <button
          type="submit"
          disabled={loading}
          className="tap flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-5 py-4 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </motion.form>
    </div>
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
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/60 px-3 py-2.5 backdrop-blur">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand-soft">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-wider text-white/40">
          {label}
        </div>
        <div className="truncate text-xs font-medium text-white">{value}</div>
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
    "w-full rounded-2xl border border-white/10 bg-bg-card/60 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-brand/60 focus:bg-bg-card focus:ring-2 focus:ring-brand/20";
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
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
