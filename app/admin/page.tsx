import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderKanban, Inbox, Eye, AlertTriangle } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { Message } from "@/lib/models/Message";

export const dynamic = "force-dynamic";

async function getStats() {
  if (!isDbConfigured()) {
    return {
      projects: 0,
      messages: 0,
      unread: 0,
      configured: false,
      error: null as string | null,
    };
  }
  try {
    await connectDB();
    const [projects, messages, unread] = await Promise.all([
      Project.countDocuments({}),
      Message.countDocuments({}),
      Message.countDocuments({ read: false }),
    ]);
    return { projects, messages, unread, configured: true, error: null };
  } catch (e) {
    console.error("[admin stats]", e);
    return {
      projects: 0,
      messages: 0,
      unread: 0,
      configured: true,
      error: (e as Error).message || "Erreur de connexion à la base",
    };
  }
}

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  const stats = await getStats();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">
        Bienvenue, {session.user?.email}
      </p>

      {!stats.configured && (
        <div className="mt-6 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
          <strong>MongoDB non configuré.</strong> Ajoutez <code>MONGODB_URI</code>{" "}
          dans vos variables d&apos;environnement.
        </div>
      )}

      {stats.error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div>
            <strong>Connexion à MongoDB impossible.</strong>
            <div className="mt-1 text-xs opacity-80">{stats.error}</div>
            <div className="mt-2 text-xs opacity-70">
              Vérifiez : MONGODB_URI correct sur Vercel · Network Access Atlas →
              0.0.0.0/0 · utilisateur DB valide.
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={FolderKanban}
          label="Projets"
          value={stats.projects}
          href="/admin/projects"
        />
        <StatCard
          icon={Inbox}
          label="Messages"
          value={stats.messages}
          href="/admin/messages"
        />
        <StatCard
          icon={Eye}
          label="Non lus"
          value={stats.unread}
          href="/admin/messages"
          accent
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href="/admin/projects/new"
          className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/20 to-brand/5 p-6 transition hover:from-brand/30"
        >
          <div className="text-sm font-semibold text-white">
            + Nouveau projet
          </div>
          <div className="mt-1 text-xs text-white/50">
            Publier un projet sur le portfolio
          </div>
        </Link>
        <Link
          href="/admin/messages"
          className="rounded-2xl border border-white/10 bg-bg-card p-6 transition hover:bg-bg-card/80"
        >
          <div className="text-sm font-semibold text-white">
            Consulter les messages
          </div>
          <div className="mt-1 text-xs text-white/50">
            Messages reçus via le formulaire de contact
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl border p-5 transition ${
        accent
          ? "border-accent/40 bg-accent/10 hover:bg-accent/20"
          : "border-white/10 bg-bg-card hover:bg-bg-card/80"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </div>
        <Icon className="h-4 w-4 text-white/40" />
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
    </Link>
  );
}
