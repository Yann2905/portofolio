"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Sparkles,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/skills", label: "Compétences", icon: Sparkles },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default function Sidebar({ theme }: { theme: "dark" | "light" }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const NavContent = (
    <>
      <div className="mb-8">
        <div className="font-display text-lg font-bold">DALNOVA</div>
        <div className="text-[11px] uppercase tracking-widest text-white/40">
          Admin Panel
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((i) => {
          const active =
            i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
          const Icon = i.icon;
          return (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand/20 text-white ring-1 ring-brand/40"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {i.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 pt-4">
        <ThemeToggle current={theme} />
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-white/10 bg-bg-soft p-5 md:flex">
        {NavContent}
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-bg-soft/90 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <div className="font-display text-sm font-bold">DALNOVA</div>
          <div className="text-[9px] uppercase tracking-widest text-white/40">
            Admin
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="tap rounded-xl border border-white/10 bg-white/5 p-2"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/10 bg-bg-soft p-5">
            <button
              onClick={() => setOpen(false)}
              className="tap absolute right-3 top-3 rounded-xl border border-white/10 bg-white/5 p-2"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
            {NavContent}
          </aside>
        </div>
      )}
    </>
  );
}
