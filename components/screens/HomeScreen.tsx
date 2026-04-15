"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { useApp } from "@/lib/store";
import Avatar from "../Avatar";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomeScreen() {
  const setScreen = useApp((s) => s.setScreen);

  return (
    <div className="flex min-h-full flex-col px-5 pt-4 pb-6">
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="mb-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-soft">
          <Sparkles className="h-3 w-3" />
          Bienvenue
        </div>
        <Avatar size={56} />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate="show"
        className="font-display text-[32px] font-bold leading-[1.1] text-white"
      >
        Yann Aristide
        <br />
        <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
          Telessie
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate="show"
        className="mt-2 text-sm font-medium text-white/70"
      >
        {profile.role} · DG {profile.company}
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={3}
        initial="hidden"
        animate="show"
        className="mt-1 flex items-center gap-1 text-xs text-white/40"
      >
        <MapPin className="h-3 w-3" />
        {profile.location}
      </motion.div>

      <motion.p
        variants={fadeUp}
        custom={4}
        initial="hidden"
        animate="show"
        className="mt-5 text-sm leading-relaxed text-white/65"
      >
        {profile.tagline} J'accompagne entreprises et particuliers dans la
        conception et la mise en production de plateformes web & mobiles sur
        mesure, pensées comme des produits digitaux complets.
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={5}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-3 gap-2"
      >
        {profile.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-bg-card/70 p-3 text-center backdrop-blur"
          >
            <div className="font-display text-xl font-bold text-white">
              {s.value}
            </div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={6}
        initial="hidden"
        animate="show"
        className="mt-6 space-y-2"
      >
        <button
          onClick={() => setScreen("projects")}
          className="tap group flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-5 py-4 text-sm font-semibold text-white shadow-glow"
        >
          Voir mes projets
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => setScreen("contact")}
          className="tap flex w-full items-center justify-between rounded-2xl border border-white/10 bg-bg-card/60 px-5 py-4 text-sm font-semibold text-white/90 backdrop-blur"
        >
          Me contacter
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>

      <motion.a
        href="/admin/login"
        variants={fadeUp}
        custom={7}
        initial="hidden"
        animate="show"
        className="mt-auto pt-6 text-center text-[10px] text-white/30 transition-colors hover:text-brand-soft"
        title="Admin"
      >
        © 2025 DALNOVA — Daloa, CI
      </motion.a>
    </div>
  );
}
