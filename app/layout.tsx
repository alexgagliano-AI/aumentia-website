import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aumentia — L'Entreprise Augmentée",
  description: "Audit IA, Coaching IA et automatisation pour PME. +20% d'efficacité en 90 jours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
