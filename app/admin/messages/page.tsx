import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import MessagesList from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  let messages: {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[] = [];
  let dbError: string | null = null;

  if (isDbConfigured()) {
    try {
      await connectDB();
      const docs = await Message.find({}).sort({ createdAt: -1 }).lean();
      messages = docs.map((d) => ({
        _id: String(d._id),
        name: d.name,
        email: d.email,
        subject: d.subject,
        message: d.message,
        read: d.read,
        createdAt: new Date(d.createdAt).toISOString(),
      }));
    } catch (e) {
      console.error("[admin messages list]", e);
      dbError = (e as Error).message || "Erreur de connexion à la base";
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Messages</h1>
      <p className="mt-1 mb-6 text-sm text-white/50">
        {messages.length} message(s) reçu(s)
      </p>
      {dbError && (
        <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <strong>Erreur MongoDB.</strong>{" "}
          <span className="opacity-80">{dbError}</span>
        </div>
      )}
      <MessagesList initial={messages} />
    </div>
  );
}
