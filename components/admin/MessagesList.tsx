"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2, Loader2 } from "lucide-react";

interface Msg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesList({ initial }: { initial: Msg[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const toggleRead = async (m: Msg) => {
    setLoading(m._id);
    const res = await fetch(`/api/messages/${m._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    setLoading(null);
    if (res.ok) {
      setMessages((xs) =>
        xs.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x))
      );
      router.refresh();
    } else {
      toast.error("Erreur");
    }
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    setLoading(id);
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setLoading(null);
    if (res.ok) {
      setMessages((xs) => xs.filter((x) => x._id !== id));
      toast.success("Supprimé");
      router.refresh();
    } else {
      toast.error("Erreur");
    }
  };

  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-bg-card p-10 text-center text-sm text-white/50">
        Aucun message pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((m) => {
        const isOpen = open === m._id;
        return (
          <div
            key={m._id}
            className={`rounded-2xl border transition-colors ${
              m.read
                ? "border-white/10 bg-bg-card"
                : "border-brand/30 bg-brand/5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : m._id)}
              className="flex w-full items-center gap-3 p-3 text-left sm:gap-4 sm:p-4"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  m.read ? "bg-white/5 text-white/40" : "bg-brand/20 text-brand-soft"
                }`}
              >
                {m.read ? (
                  <MailOpen className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="truncate text-sm font-semibold text-white">
                    {m.name}
                  </span>
                  <span className="truncate text-[11px] text-white/40">
                    {m.email}
                  </span>
                </div>
                <div className="truncate text-xs text-white/60">
                  {m.subject}
                </div>
              </div>
              <span className="shrink-0 text-[10px] text-white/40">
                {new Date(m.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-white/10 px-3 py-4 sm:px-4">
                <p className="whitespace-pre-wrap break-words text-sm text-white/80">
                  {m.message}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleRead(m)}
                    disabled={loading === m._id}
                    className="tap rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80"
                  >
                    {m.read ? "Marquer non lu" : "Marquer lu"}
                  </button>
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    className="tap rounded-xl bg-gradient-to-r from-brand to-brand-glow px-3 py-2 text-xs font-semibold text-white"
                  >
                    Répondre
                  </a>
                  <button
                    onClick={() => del(m._id)}
                    disabled={loading === m._id}
                    className="tap ml-auto rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"
                    aria-label="Supprimer"
                  >
                    {loading === m._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
