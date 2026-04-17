"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute right-[10%] top-[40%] h-[280px] w-[280px] rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur sm:text-[11px]"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="truncate">
            Disponible · <span className="hidden xs:inline">nouveaux projets · </span>
            {profile.location}
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(1)}
          className="font-display mt-6 text-[40px] font-bold leading-[1] tracking-tight text-white sm:text-7xl lg:text-[88px]"
        >
          Je conçois des produits
          <br className="hidden sm:block" />{" "}
          <span className="text-gradient-brand">digitaux qui scalent.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(2)}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {profile.role}, fondateur de <span className="text-white">{profile.company}</span>.
          J&apos;aide entreprises et fondateurs à passer de l&apos;idée au produit en
          production — web, mobile, et infrastructure.
        </motion.p>

        <motion.div
          {...fadeUp(3)}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <a
            href="#work"
            className="tap shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
          >
            Voir mes projets
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="tap inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Avatar + meta strip */}
        <motion.div
          {...fadeUp(4)}
          className="mt-14 flex flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:gap-6"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/15 ring-2 ring-brand/30">
            <Image src="/yann.jpg" alt={profile.name} fill className="object-cover" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/50 sm:gap-4 sm:text-sm">
            <span className="text-white/80">{profile.name}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(5)}
          className="mt-14 grid w-full max-w-4xl grid-cols-3 divide-x divide-white/10 rounded-3xl border border-white/10 bg-bg-card/40 backdrop-blur-xl sm:mt-20"
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="px-2 py-5 text-center sm:px-8 sm:py-8">
              <div className="font-display text-2xl font-bold text-white sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-[9px] uppercase tracking-wider text-white/50 sm:mt-2 sm:text-xs sm:tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
