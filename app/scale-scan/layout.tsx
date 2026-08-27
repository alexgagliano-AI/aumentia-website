import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Scale Scan — Aumentia",
  description: "Identifiez vos 3 automatisations IA prioritaires en 120 minutes. Rentable ou remboursé.",
  robots: { index: false, follow: false },
};

// Le Meta Pixel (ID 1881259625725017) est initialisé dans app/layout.tsx (root).
// InitiateCheckout → page.tsx, Purchase → merci/page.tsx.
export default function ScaleScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head />
      <body style={{ margin: 0, background: "var(--dark)", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
