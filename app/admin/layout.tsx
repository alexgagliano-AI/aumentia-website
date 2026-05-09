import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Aumentia — Admin",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
