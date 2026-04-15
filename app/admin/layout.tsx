import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/components/admin/SessionProvider";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthSessionProvider>
      {session?.user?.role === "admin" ? (
        <div className="flex min-h-screen bg-bg">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      ) : (
        <div className="min-h-screen bg-bg">{children}</div>
      )}
    </AuthSessionProvider>
  );
}

