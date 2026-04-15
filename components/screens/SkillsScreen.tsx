"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: Array<Skill["category"] | "Tous"> = [
  "Tous",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Design",
];

export default function SkillsScreen({ skills }: { skills: Skill[] }) {
  const [cat, setCat] = useState<(typeof categories)[number]>("Tous");
  const filtered =
    cat === "Tous" ? skills : skills.filter((s) => s.category === cat);

  return (
    <div className="min-h-full px-5 pt-4 pb-6">
      <div className="text-[11px] uppercase tracking-widest text-brand-soft">
        Expertise
      </div>
      <h2 className="font-display mt-1 text-2xl font-bold text-white">
        Compétences
      </h2>
      <p className="mt-1 text-xs text-white/50">
        Stack technique orientée produit
      </p>

      {/* Categories scroll */}
      <div className="phone-scroll -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "tap whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
              cat === c
                ? "border-brand/60 bg-brand/20 text-white"
                : "border-white/10 bg-white/5 text-white/60"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-white/10 bg-bg-card/60 p-3 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {s.name}
              </span>
              <span className="text-[10px] font-medium text-brand-soft">
                {s.level}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
              />
            </div>
            <div className="mt-1 text-[9px] uppercase tracking-wider text-white/30">
              {s.category}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
