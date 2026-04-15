"use client";

import { useState } from "react";
import { Moon, Sun, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ThemeToggle({ current }: { current: "dark" | "light" }) {
  const [theme, setTheme] = useState<"dark" | "light">(current);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setLoading(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: next }),
      });
      if (!res.ok) throw new Error("Erreur");
      setTheme(next);
      toast.success(`Mode ${next === "light" ? "clair" : "sombre"} activé`);
      setTimeout(() => window.location.reload(), 400);
    } catch {
      toast.error("Impossible de changer le thème");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="tap flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-60"
      aria-label="Changer de thème"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {theme === "dark" ? "Mode clair" : "Mode sombre"}
    </button>
  );
}
