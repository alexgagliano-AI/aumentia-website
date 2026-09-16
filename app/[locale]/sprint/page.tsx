import { getTranslations } from "@/lib/i18n";

export default async function SprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.sprintPage;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,146,42,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <div style={{ marginBottom: 20 }}><span className="badge">⚡ {p.badge}</span></div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 20 }}>
            {p.title}
          </h1>
          <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* ─── TABLEAU COMPARATIF ──────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }} className="three-col">
            {p.tiers.map((tier, i) => (
              <div key={i} style={{
                background: tier.highlighted ? "linear-gradient(135deg, var(--dark-card), rgba(200,146,42,0.05))" : "var(--dark)",
                border: tier.highlighted ? "2px solid var(--gold)" : "1px solid var(--dark-border)",
                borderRadius: 20, padding: "36px 28px",
                position: "relative",
              }}>
                {tier.highlighted && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: "var(--gold)", color: "#000", fontSize: 11, fontWeight: 800,
                    padding: "4px 14px", borderRadius: 20, letterSpacing: "0.08em", whiteSpace: "nowrap",
                  }}>
                    ✦ RECOMMANDÉ
                  </div>
                )}

                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.01em" }}>
                  {tier.name}
                </h2>
                <div style={{ marginBottom: 6 }}>
                  <span style={{
                    fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 900,
                    color: tier.highlighted ? "var(--gold)" : "var(--cyan)",
                    letterSpacing: "-0.04em", lineHeight: 1,
                  }}>{tier.price}</span>
                </div>
                <p style={{ color: "var(--gray)", fontSize: 12, marginBottom: 20 }}>{tier.priceLabel}</p>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, marginBottom: 28, minHeight: 60 }}>
                  {tier.desc}
                </p>

                <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {tier.features.map((feat, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{
                        color: tier.highlighted ? "var(--gold)" : "var(--cyan)",
                        fontSize: 12, flexShrink: 0, marginTop: 3, fontWeight: 700,
                      }}>✓</span>
                      <span style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.5 }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
                  className={tier.highlighted ? "btn-primary" : "btn-outline"}
                  style={{ display: "block", textAlign: "center", fontSize: 13, padding: "12px 20px" }}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Garantie */}
          <div style={{
            marginTop: 32, padding: "16px 24px",
            background: "rgba(0,212,200,0.05)", border: "1px solid rgba(0,212,200,0.15)",
            borderRadius: 12, textAlign: "center",
          }}>
            <p style={{ color: "var(--gray-light)", fontSize: 14, margin: 0 }}>{p.guarantee}</p>
          </div>
        </div>
      </section>

      {/* ─── PROCESSUS 4 SEMAINES ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">📅 {p.process.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {p.process.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="four-col">
            {p.process.steps.map((step, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: i < 2
                    ? "linear-gradient(90deg, var(--cyan), transparent)"
                    : "linear-gradient(90deg, var(--gold), transparent)",
                }} />
                <div style={{
                  fontSize: 40, fontWeight: 900, letterSpacing: "-0.04em",
                  color: i < 2 ? "var(--cyan)" : "var(--gold)", lineHeight: 1,
                  marginBottom: 12,
                }}>{step.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "64px 40px", background: "var(--dark)", borderRadius: 24, border: "1px solid var(--dark-border)" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em" }}>
              {p.cta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              {p.cta.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 15, padding: "14px 32px", display: "inline-block" }}>
              {p.cta.btn}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .three-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 1024px) {
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
