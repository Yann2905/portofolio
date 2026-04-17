"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "#work", label: "Projets" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 px-3 py-2 backdrop-blur-xl transition-all sm:px-6 sm:py-2.5 ${
          scrolled
            ? "bg-bg-soft/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]"
            : "bg-bg-card/30"
        }`}
      >
        <a href="#top" className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-[11px] font-bold text-white shadow-glow">
            Y
          </span>
          <span className="hidden truncate sm:inline">Yann Telessie</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="tap shine relative hidden overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-xs font-semibold text-white shadow-glow md:inline-flex"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Démarrer un projet
            </span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-bg-card/60 text-white md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-3 right-3 top-[68px] rounded-2xl border border-white/10 bg-bg-soft/95 p-2 backdrop-blur-xl sm:left-4 sm:right-4 sm:top-[72px] md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-gradient-to-r from-brand to-brand-glow px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Démarrer un projet
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
