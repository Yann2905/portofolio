import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTheme } from "@/lib/data-service";
import AuthSessionProvider from "@/components/admin/SessionProvider";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const theme = await getTheme();

  return (
    <AuthSessionProvider>
      {session?.user?.role === "admin" ? (
        <div className="min-h-screen bg-bg md:flex">
          <Sidebar theme={theme} />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      ) : (
        <div className="min-h-screen bg-bg">{children}</div>
      )}
    </AuthSessionProvider>
  );
}

