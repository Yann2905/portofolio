"use client";

import { useState } from "react";
import { Moon, Sun, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ThemeToggle({ current }: { current: "dark" | "light" }) {
  const [theme, setTheme] = useState<"dark" | "light">(current);
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";

  async function setNext(next: "dark" | "light") {
    if (loading || next === theme) return;
    setLoading(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Erreur ${res.status}`);
      }
      setTheme(next);
      toast.success(`Mode ${next === "light" ? "clair" : "sombre"} activé`);
      setTimeout(() => window.location.reload(), 350);
    } catch (e) {
      toast.error((e as Error).message || "Impossible de changer le thème");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2 text-white/70">
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="font-medium">Mode sombre</span>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isDark}
          disabled={loading}
          onChange={(e) => setNext(e.target.checked ? "dark" : "light")}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full border border-white/15 bg-white/10 transition-colors peer-checked:border-brand/50 peer-checked:bg-brand/40 peer-disabled:opacity-50" />
        <div className="pointer-events-none absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5">
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin text-brand" />
          ) : null}
        </div>
      </label>
    </div>
  );
}
