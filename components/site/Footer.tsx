"use client";

import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

const SOCIALS = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: profile.socials.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 text-base font-semibold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-xs font-bold text-white shadow-glow">
              Y
            </span>
            {profile.shortName}
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
            {profile.title} — produits web & mobile depuis {profile.location}.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-soft"
          >
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/admin/login"
            title="Admin"
            className="text-[11px] text-white/30 transition-colors hover:text-brand-soft"
          >
            © {new Date().getFullYear()} {profile.company} — Tous droits réservés
          </a>
        </div>
      </div>
    </footer>
  );
}
