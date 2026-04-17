"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Compass, Layers, Rocket } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const PILLARS = [
  {
    icon: Compass,
    title: "Discovery & cadrage",
    body: "Comprendre le problème avant l'écran. Atelier produit, scope, KPIs.",
  },
  {
    icon: Layers,
    title: "Design système",
    body: "Composants cohérents, pensés pour scaler — du wireframe à la prod.",
  },
  {
    icon: Rocket,
    title: "Mise en production",
    body: "CI/CD, monitoring, performance. Le code part en prod, pas en démo.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src="/yann.jpg"
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-bg-card/80 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand/20 text-brand-soft">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">
                    {profile.title}
                  </div>
                  <div className="truncate text-sm font-semibold text-white">
                    {profile.company} — {profile.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="À propos"
            title={
              <>
                Un développeur produit,
                <br />
                <span className="text-gradient-brand">pas un freelance code-only.</span>
              </>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 space-y-5 text-base leading-relaxed text-white/65"
          >
            {profile.bio.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <div className="mt-10 grid gap-3 grid-cols-1 sm:grid-cols-3">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                  className="rounded-2xl border border-white/10 bg-bg-card/40 p-5 backdrop-blur"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-brand-soft">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">
                    {pillar.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    {pillar.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
