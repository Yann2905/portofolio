"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  Palette,
  type LucideIcon,
} from "lucide-react";
import type { Skill } from "@/lib/types";
import SectionHeading from "./SectionHeading";

const CATEGORY_META: Record<
  Skill["category"],
  { icon: LucideIcon; label: string; accent: string }
> = {
  Frontend: { icon: Code2, label: "Frontend", accent: "from-brand to-brand-soft" },
  Backend: { icon: Server, label: "Backend", accent: "from-accent to-brand-soft" },
  Mobile: { icon: Smartphone, label: "Mobile", accent: "from-brand-glow to-accent" },
  DevOps: { icon: Cloud, label: "DevOps & Cloud", accent: "from-brand to-accent" },
  Design: { icon: Palette, label: "Design", accent: "from-accent to-brand" },
};

const ORDER: Skill["category"][] = [
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Design",
];

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = ORDER.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="stack" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack technique"
          title={
            <>
              Outils que je maîtrise,
              <br />
              <span className="text-gradient-brand">au quotidien.</span>
            </>
          }
          description="Une stack moderne, éprouvée en production, choisie pour la vitesse de livraison sans sacrifier la qualité."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {grouped.map((group, i) => {
            const meta = CATEGORY_META[group.cat];
            const Icon = meta.icon;
            const span =
              i === 0
                ? "lg:col-span-3"
                : i === 1
                  ? "lg:col-span-3"
                  : "lg:col-span-2";

            return (
              <motion.div
                key={group.cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-white/20 sm:p-7 ${span}`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${meta.accent} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-glow`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Catégorie
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {meta.label}
                    </h3>
                  </div>
                </div>

                <ul className="relative mt-6 space-y-4">
                  {group.items.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-white/85">
                          {s.name}
                        </span>
                        <span className="font-display text-xs font-semibold tabular-nums text-white/40">
                          {s.level}%
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 1.1,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${meta.accent}`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
