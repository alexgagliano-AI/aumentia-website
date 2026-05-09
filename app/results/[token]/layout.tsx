import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Vos résultats — Diagnostic IA Aumentia",
  robots: "noindex, nofollow",
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
