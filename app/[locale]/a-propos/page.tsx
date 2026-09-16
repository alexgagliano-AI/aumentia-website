import { getTranslations } from "@/lib/i18n";
import Image from "next/image";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.aboutPage;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 24 }}><span className="badge">👤 {p.badge}</span></div>
            <div style={{ margin: "0 auto 24px", width: 120, height: 120, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--cyan)" }}>
              <Image src="/alexandre.jpg" alt={p.name} width={120} height={120} style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8 }}>
              {p.name}
            </h1>
            <p style={{ color: "var(--cyan)", fontSize: 15, fontWeight: 600, marginBottom: 32, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {p.role}
            </p>
            <blockquote style={{
              fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 700,
              color: "var(--gold)", lineHeight: 1.5, marginBottom: 24,
              fontStyle: "italic", padding: "0 24px",
            }}>
              &ldquo;{p.bhag}&rdquo;
            </blockquote>
            <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              {p.bio}
            </p>
          </div>
        </div>
      </section>

      {/* ─── CRÉDIBILITÉ ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="two-col">
            {p.credentials.map((cred, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", gap: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: "var(--gold-dim)", border: "1px solid rgba(200,146,42,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {cred.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{cred.title}</h3>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{cred.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVRE ───────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="card" style={{ padding: "40px 36px", border: "1px solid rgba(200,146,42,0.3)" }}>
              <div style={{ marginBottom: 16 }}><span className="badge">📚 {p.book.badge}</span></div>
              <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em" }}>
                {p.book.title}
              </h2>
              <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                {p.book.desc}
              </p>
              <a href="https://scalingupcoach.fr" target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ display: "inline-block", fontSize: 13, padding: "10px 20px" }}>
                {p.book.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900, marginBottom: 32, letterSpacing: "-0.02em" }}>
            {p.cta.title}
          </h2>
          <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", display: "inline-block" }}>
            {p.cta.btn}
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
