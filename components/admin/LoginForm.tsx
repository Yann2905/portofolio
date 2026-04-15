"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      toast.error("Identifiants invalides");
      return;
    }
    // Full reload — plus rapide et évite le refresh/double-render
    window.location.href = "/admin";
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-bg-card/70 p-8 backdrop-blur">
        <div className="mb-6 text-center">
          <div className="font-display text-2xl font-bold">DALNOVA</div>
          <div className="text-[11px] uppercase tracking-widest text-brand-soft">
            Admin Login
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <Field
            label="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <button
            type="submit"
            disabled={loading}
            className="tap mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-5 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-bg-card/60 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
        required
      />
    </label>
  );
}
