"use client";

import { Home, Briefcase, Sparkles, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import type { ScreenKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const items: { key: ScreenKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "Accueil", icon: Home },
  { key: "projects", label: "Projets", icon: Briefcase },
  { key: "skills", label: "Skills", icon: Sparkles },
  { key: "contact", label: "Contact", icon: Mail },
];

export default function BottomNav() {
  const screen = useApp((s) => s.screen);
  const setScreen = useApp((s) => s.setScreen);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3">
      <div className="relative flex items-center justify-around rounded-3xl border border-white/10 bg-bg-card/90 px-2 py-2 backdrop-blur-xl">
        {items.map((item) => {
          const active = screen === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setScreen(item.key)}
              className={cn(
                "tap relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-white" : "text-white/40"
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/30 to-brand/10 ring-1 ring-brand/40"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-5 w-5" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
