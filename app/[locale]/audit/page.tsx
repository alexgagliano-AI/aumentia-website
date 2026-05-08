import { getTranslations } from "@/lib/i18n";
import Link from "next/link";

export default async function AuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.auditPage;

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container">
          <div style={{ maxWidth: 800 }}>
            <div style={{ marginBottom: 20 }}><span className="badge">🔍 {p.badge}</span></div>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24 }}>
              {p.title}<br />
              <span className="gradient-text">{p.title2}</span>
            </h1>
            <p style={{ fontSize: 20, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
              {p.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              {p.cta.btn} →
            </a>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {p.steps.map((step, i) => (
              <div key={i}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
                  alignItems: "start", padding: "64px 0",
                }}>
                  {/* Left: number + title */}
                  <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                    <div style={{
                      fontSize: "clamp(80px, 12vw, 140px)", fontWeight: 900,
                      color: "var(--cyan-dim)", letterSpacing: "-0.04em", lineHeight: 1,
                      marginBottom: -20, userSelect: "none",
                    }}>
                      {step.num}
                    </div>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
                      {step.title}
                    </h2>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 12px", background: "var(--gold-dim)",
                      border: "1px solid rgba(200,146,42,0.3)", borderRadius: 100,
                      fontSize: 13, color: "var(--gold)", fontWeight: 600, marginBottom: 24,
                    }}>
                      ⏱ {step.duration}
                    </div>
                    <p style={{ fontSize: 16, color: "var(--gray-light)", lineHeight: 1.8 }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Right: deliverables */}
                  <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                    <div className="card" style={{ padding: 32 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
                        Livrables
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {step.deliverables.map((d, j) => (
                          <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <span style={{ color: "var(--cyan)", fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</span>
                            <span style={{ color: "var(--gray-light)", fontSize: 15 }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider between steps */}
                {i < p.steps.length - 1 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "8px 0",
                  }}>
                    <div style={{ flex: 1, height: 1, background: "var(--dark-border)" }} />
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      border: "1px solid var(--cyan)", background: "var(--cyan-dim)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--cyan)", fontSize: 14,
                    }}>↓</div>
                    <div style={{ flex: 1, height: 1, background: "var(--dark-border)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-sm" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{
            textAlign: "center", padding: "56px 40px",
            background: "var(--dark)", borderRadius: 20, border: "1px solid var(--dark-border)",
          }}>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
              {p.cta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 36 }}>
              {p.cta.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
              {p.cta.btn} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
