import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { getTheme } from "@/lib/data-service";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yann Aristide Telessie — Développeur & DG DALNOVA",
  description:
    "Portfolio interactif de Yann Aristide Telessie, développeur web & mobile, entrepreneur et Directeur Général de DALNOVA. Solutions digitales modernes depuis Daloa, Côte d'Ivoire.",
  keywords: [
    "Yann Telessie",
    "DALNOVA",
    "développeur web",
    "développeur mobile",
    "Côte d'Ivoire",
    "Daloa",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Yann Aristide Telessie" }],
  openGraph: {
    title: "Yann Aristide Telessie — Portfolio",
    description:
      "Développeur web & mobile, DG de DALNOVA. Création d'applications performantes et immersives.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();
  const isLight = theme === "light";

  return (
    <html lang="fr" className={`scroll-smooth ${isLight ? "light" : ""}`}>
      <body className="ambient-bg min-h-screen">
        {children}
        <Toaster
          position="top-center"
          theme={isLight ? "light" : "dark"}
          duration={1800}
          toastOptions={{
            style: isLight
              ? {
                  background: "#ffffff",
                  border: "1px solid rgba(16,185,129,0.35)",
                  color: "#0a1f14",
                }
              : {
                  background: "#15151f",
                  border: "1px solid rgba(124,92,255,0.35)",
                  color: "#f5f5f7",
                },
          }}
        />
      </body>
    </html>
  );
}
