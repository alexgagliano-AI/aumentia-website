import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  locale: string;
  t: {
    tagline: string;
    links: {
      title1: string; agents: string; sprint: string; scale: string;
      title2: string; cases: string; about: string;
      title3: string;
    };
    rights: string;
  };
}

export default function Footer({ locale, t }: FooterProps) {
  return (
    <footer style={{ background: "var(--dark-card)", borderTop: "1px solid var(--dark-border)" }}>
      <div className="container" style={{ padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Image src="/logo.png" alt="Aumentia" width={52} height={52} style={{ objectFit: "contain" }} />
            </div>
            <p style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              {t.tagline}
            </p>
            <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Agents IA, Scale Sprint, Plateforme Multi-Agents — des solutions concrètes à ROI mesurable pour les PME.
            </p>
          </div>

          {/* Produits */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              {t.links.title1}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href={`/${locale}/agents`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>{t.links.agents}</Link>
              <Link href={`/${locale}/sprint`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>{t.links.sprint}</Link>
              <Link href={`/${locale}/scale`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>{t.links.scale}</Link>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              {t.links.title2}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href={`/${locale}/cases`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>{t.links.cases}</Link>
              <Link href={`/${locale}/a-propos`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>{t.links.about}</Link>
              <Link href={`/${locale}/investors`} style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>Investisseurs</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              {t.links.title3}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:alex@aumentia.ai" style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>alex@aumentia.ai</a>
              <a href="tel:+32471662563" style={{ color: "var(--gray-light)", fontSize: 14, textDecoration: "none" }}>+32 471 662 563</a>
              <a href="https://t.me/ScalingUpCoachBot" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--cyan)", fontSize: 14, textDecoration: "none" }}>@ScalingUpCoachBot →</a>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "var(--gray)" }}>© 2025 Aumentia. {t.rights}</p>
          <p style={{ fontSize: 13, color: "var(--gray)" }}>
            Made with <span style={{ color: "var(--cyan)" }}>AI</span> in Belgium 🇧🇪
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
