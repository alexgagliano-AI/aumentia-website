import { getTranslations } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Diagnostic Opérationnel PME — Growth OS Sprint | Aumentia",
    en: "SMB Operational Diagnosis — Growth OS Sprint | Aumentia",
    it: "Diagnosi Operativa PMI — Growth OS Sprint | Aumentia",
  };
  const descs: Record<string, string> = {
    fr: "Diagnostiquez le chaos opérationnel de votre PME en 48h. Méthodologie Growth OS Sprint : 30 jours pour structurer, automatiser et stabiliser votre entreprise.",
    en: "Diagnose your SMB's operational chaos in 48h. Growth OS Sprint methodology: 30 days to structure, automate and stabilize your business.",
    it: "Diagnosticate il caos operativo della vostra PMI in 48h. Metodologia Growth OS Sprint: 30 giorni per strutturare, automatizzare e stabilizzare la vostra azienda.",
  };
  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
  };
}

export default async function AuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.auditPage;

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 20 }}>
              <span className="badge">🔍 {p.badge}</span>
            </div>
            <h1 style={{
              fontSize: "clamp(32px, 5.5vw, 68px)", fontWeight: 900,
              letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24,
            }}>
              {p.title}<br />
              <span className="gradient-text">{p.title2}</span>
            </h1>
            <p style={{ fontSize: 20, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
              {p.subtitle}
            </p>
            <a
              href="https://calendly.com/alex-aumentia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 16, padding: "14px 32px" }}
            >
              {p.cta_hero} →
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS OPERATIONAL CHAOS ─── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}>
              <span className="badge">⚠️ {p.chaos_badge}</span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
              letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20,
            }}>
              {p.chaos_title}
            </h2>
            <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7 }}>
              {p.chaos_subtitle}
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16,
            marginBottom: 48,
          }}>
            {p.chaos_items.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                background: "var(--dark)", borderRadius: 12,
                padding: "18px 20px", border: "1px solid var(--dark-border)",
              }}>
                <span style={{ color: "var(--gold)", fontSize: 18, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 24px", borderRadius: 12,
            background: "rgba(0,212,200,0.06)", border: "1px solid rgba(0,212,200,0.2)",
          }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <p style={{ color: "var(--cyan)", fontWeight: 600, fontSize: 16, margin: 0 }}>
              {p.chaos_conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* ─── GROWTH OS SPRINT METHODOLOGY ─── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
            <div style={{ marginBottom: 16 }}>
              <span className="badge">⚙️ {p.method_badge}</span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
              letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20,
            }}>
              {p.method_title}
            </h2>
            <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7 }}>
              {p.method_subtitle}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {p.phases.map((phase, i) => (
              <div key={i}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
                  alignItems: "start", padding: "56px 0",
                }}>
                  {/* Left: number + content */}
                  <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                    <div style={{
                      fontSize: "clamp(72px, 10vw, 120px)", fontWeight: 900,
                      color: i < 2 ? "var(--cyan-dim)" : "rgba(200,146,42,0.15)",
                      letterSpacing: "-0.04em", lineHeight: 1,
                      marginBottom: -16, userSelect: "none",
                    }}>
                      {phase.num}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700, color: "var(--gray)",
                        textTransform: "uppercase", letterSpacing: "0.1em",
                      }}>
                        {phase.label}
                      </span>
                    </div>
                    <h3 style={{
                      fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800,
                      letterSpacing: "-0.02em", marginBottom: 12,
                    }}>
                      {phase.title}
                    </h3>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 12px", background: "var(--gold-dim)",
                      border: "1px solid rgba(200,146,42,0.3)", borderRadius: 100,
                      fontSize: 13, color: "var(--gold)", fontWeight: 600, marginBottom: 20,
                    }}>
                      ⏱ {phase.duration}
                    </div>
                    <p style={{ fontSize: 16, color: "var(--gray-light)", lineHeight: 1.8 }}>
                      {phase.desc}
                    </p>
                  </div>

                  {/* Right: deliverables */}
                  <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                    <div className="card" style={{ padding: 32 }}>
                      <p style={{
                        fontSize: 12, fontWeight: 700, color: "var(--cyan)",
                        textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20,
                      }}>
                        Livrables
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {phase.deliverables.map((d, j) => (
                          <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <span style={{ color: "var(--cyan)", fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</span>
                            <span style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.5 }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {i < p.phases.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "4px 0" }}>
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

      {/* ─── WHY DIAGNOSIS FIRST ─── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <div style={{ marginBottom: 16 }}>
              <span className="badge">🔬 {p.why_badge}</span>
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900,
              letterSpacing: "-0.02em", marginBottom: 16,
            }}>
              {p.why_title}
            </h2>
            <p style={{ fontSize: 17, color: "var(--gray-light)", lineHeight: 1.7 }}>
              {p.why_subtitle}
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20,
          }}>
            {p.why_items.map((item, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <div style={{ marginBottom: 16 }}>
              <span className="badge">❓ {p.faq_badge}</span>
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900,
              letterSpacing: "-0.02em",
            }}>
              {p.faq_title}
            </h2>
          </div>

          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
            {p.faq_items.map((item, i) => (
              <div key={i} style={{
                borderBottom: "1px solid var(--dark-border)",
                padding: "28px 0",
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: "#fff" }}>
                  {item.q}
                </h3>
                <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-sm" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{
            textAlign: "center", padding: "64px 40px",
            background: "var(--dark)", borderRadius: 20,
            border: "1px solid var(--cyan)",
            boxShadow: "0 0 60px rgba(0,212,200,0.05)",
          }}>
            <h2 style={{
              fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900,
              letterSpacing: "-0.02em", marginBottom: 16,
            }}>
              {p.cta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 36, lineHeight: 1.6 }}>
              {p.cta.subtitle}
            </p>
            <a
              href="https://calendly.com/alex-aumentia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 16, padding: "16px 40px" }}
            >
              {p.cta.btn} →
            </a>
            <p style={{ marginTop: 20, fontSize: 13, color: "var(--gray)" }}>
              Gratuit · Sans engagement · 30 minutes
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .audit-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
