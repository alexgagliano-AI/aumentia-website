import { getTranslations } from "@/lib/i18n";

export default async function ScalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.scalePage;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 900, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,200,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <div style={{ marginBottom: 20 }}><span className="badge">🏗️ {p.badge}</span></div>
          <h1 style={{ fontSize: "clamp(28px, 4.5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 24, maxWidth: 800, margin: "0 auto 24px" }}>
            {p.title}
          </h1>
          <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 48px" }}>
            {p.subtitle}
          </p>

          {/* Use cases badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {p.use_cases.map((uc, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 20,
                background: "var(--dark-card)", border: "1px solid var(--dark-border)",
                fontSize: 13, color: "var(--gray-light)", fontWeight: 500,
              }}>
                {uc.icon} {uc.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FONCTIONNALITÉS ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="three-col">
            {p.features.map((feat, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                  background: "var(--cyan-dim)", border: "1px solid rgba(0,212,200,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {feat.title}
                </h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{
            maxWidth: 700, margin: "0 auto", textAlign: "center",
            padding: "72px 48px", background: "var(--dark-card)", borderRadius: 24,
            border: "1px solid var(--dark-border)", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: 500, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,200,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900, marginBottom: 20, letterSpacing: "-0.02em", position: "relative" }}>
              {p.cta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.8, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px", position: "relative" }}>
              {p.cta.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", display: "inline-block", position: "relative", marginBottom: 16 }}>
              {p.cta.btn}
            </a>
            <p style={{ color: "var(--gray)", fontSize: 13, margin: 0, position: "relative" }}>
              {p.cta.note}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .three-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          .three-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
