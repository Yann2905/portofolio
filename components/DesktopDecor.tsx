"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function DesktopDecor({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden w-72 flex-shrink-0 space-y-6 lg:block"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-brand-soft">
          Portfolio · 2025
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight">
          Yann
          <br />
          Aristide
          <br />
          <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
            Telessie
          </span>
        </h1>
        <p className="text-sm leading-relaxed text-white/60">
          {profile.tagline} Découvrez mon univers à travers une expérience
          mobile immersive — glissez, tapez, explorez.
        </p>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
          Disponible pour de nouveaux projets
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="hidden w-48 flex-shrink-0 space-y-6 text-right lg:block"
    >
      {profile.stats.map((s) => (
        <div key={s.label}>
          <div className="font-display text-4xl font-bold text-white">
            {s.value}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
            {s.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
