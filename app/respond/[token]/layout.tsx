import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Diagnostic IA — Aumentia",
  description: "Répondez au questionnaire de diagnostic IA stratégique.",
  robots: "noindex, nofollow",
};

export default function RespondLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
