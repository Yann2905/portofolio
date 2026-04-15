import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
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
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="ambient-bg min-h-screen">
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
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
