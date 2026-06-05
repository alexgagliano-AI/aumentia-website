import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import { PitchDeckButton } from "./PitchDeckModal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.investorPage.meta.title,
    description: t.investorPage.meta.description,
    robots: { index: false, follow: false }, // page discrète
  };
}

export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.investorPage;

  // Bar chart max value for projections
  const maxRevenue = 3;
  const revenueValues = [0.3, 1, 3];
  const barPcts = revenueValues.map(v => Math.round((v / maxRevenue) * 100));

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: -100, right: -200,
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,200,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: 20 }}>
            <span className="badge">{p.hero.badge}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 16,
          }}>
            {p.hero.h1}
          </h1>
          <h2 style={{
            fontSize: "clamp(22px, 3.5vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 28,
            color: "var(--cyan)",
          }}>
            {p.hero.h1accent}
          </h2>
          <p style={{
            fontSize: 20,
            color: "var(--gray-light)",
            lineHeight: 1.7,
            maxWidth: 680,
            marginBottom: 40,
            fontStyle: "italic",
          }}>
            {p.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PitchDeckButton
              label={p.hero.cta_primary}
              t={p.modal}
              className="btn-primary"
              // @ts-expect-error style passthrough
              style={{ fontSize: 16, padding: "14px 32px" }}
            />
            <a
              href="#projections"
              className="btn-outline"
              style={{ fontSize: 16, padding: "14px 32px" }}
            >
              {p.hero.cta_secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ── MÉTRIQUES ── */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}>
            {p.metrics.map((m, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", textAlign: "center" }}>
                <div style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 900,
                  color: i < 3 ? "var(--cyan)" : "var(--gold)",
                  letterSpacing: "-0.02em",
                  marginBottom: 6,
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--gray)", lineHeight: 1.5 }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI INVESTIR ── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">{p.why.badge}</span></div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}>
              {p.why.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Problème */}
            <div style={{
              background: "var(--dark)",
              border: "1px solid var(--dark-border)",
              borderRadius: 16,
              padding: "32px 28px",
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                {p.why.problem_title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {p.why.problem_items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--gold)", fontSize: 16, flexShrink: 0, marginTop: 2 }}>▸</span>
                    <span style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avantage concurrentiel */}
            <div style={{
              background: "var(--dark)",
              border: "1px solid var(--cyan)",
              borderRadius: 16,
              padding: "32px 28px",
              boxShadow: "0 0 30px rgba(0,212,200,0.06)",
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                {p.why.advantage_title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {p.why.advantage_items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--cyan)", fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">{p.model.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {p.model.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {p.model.steps.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                {/* Arrow between cards */}
                {i < p.model.steps.length - 1 && (
                  <div style={{
                    position: "absolute", right: -16, top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10, fontSize: 24, color: "var(--cyan)",
                  }}>→</div>
                )}
                <div
                  className="card"
                  style={{
                    padding: "36px 28px",
                    borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : "0",
                    borderRight: i < 2 ? "none" : undefined,
                    borderColor: i === 1 ? "var(--cyan)" : undefined,
                    background: i === 1 ? "rgba(0,212,200,0.04)" : undefined,
                    height: "100%",
                  }}
                >
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: "var(--gray)",
                    letterSpacing: "0.08em", marginBottom: 16,
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    fontSize: 20, fontWeight: 800,
                    color: i === 1 ? "var(--cyan)" : "#fff",
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}>
                    {step.name}
                  </div>
                  <div style={{
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 900,
                    color: "var(--gold)",
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                  }}>
                    {step.price}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.6 }}>
                    {step.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTIONS ── */}
      <section id="projections" className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">{p.projections.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {p.projections.title}
            </h2>
            <p style={{ color: "var(--gray-light)", marginTop: 12, fontSize: 16 }}>
              {p.projections.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Table */}
            <div style={{
              background: "var(--dark)",
              border: "1px solid var(--dark-border)",
              borderRadius: 16,
              overflow: "hidden",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 2fr",
                padding: "16px 24px",
                background: "rgba(0,212,200,0.06)",
                borderBottom: "1px solid var(--dark-border)",
              }}>
                {[p.projections.col_year, p.projections.col_revenue, p.projections.col_hypothesis].map((col, i) => (
                  <div key={i} style={{ fontSize: 12, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {col}
                  </div>
                ))}
              </div>
              {p.projections.rows.map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 2fr",
                  padding: "20px 24px",
                  borderBottom: i < p.projections.rows.length - 1 ? "1px solid var(--dark-border)" : "none",
                  background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "none",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-light)" }}>{row.year}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "var(--gold)" }}>{row.revenue}</div>
                  <div style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.5 }}>{row.hypothesis}</div>
                </div>
              ))}
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--dark-border)" }}>
                <p style={{ fontSize: 12, color: "var(--gray)", fontStyle: "italic", margin: 0 }}>
                  {p.projections.note}
                </p>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ padding: "8px 0" }}>
              {p.projections.rows.map((row, i) => (
                <div key={i} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-light)" }}>{row.year}</span>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "var(--gold)" }}>{row.revenue}</span>
                  </div>
                  <div style={{
                    height: 12, background: "var(--dark-border)", borderRadius: 100, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${barPcts[i]}%`,
                      background: `linear-gradient(90deg, var(--cyan), ${i === 2 ? "var(--gold)" : "var(--cyan)"})`,
                      borderRadius: 100,
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE OF FUNDS ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">{p.funds.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {p.funds.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {p.funds.items.map((item, i) => {
              const colors = ["var(--cyan)", "var(--gold)", "#a78bfa", "#6ee7b7"];
              return (
                <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{
                    flexShrink: 0,
                    fontSize: "clamp(28px, 3vw, 36px)",
                    fontWeight: 900,
                    color: colors[i],
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    minWidth: 72,
                  }}>
                    {item.pct}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--gray-light)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">{p.team.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {p.team.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {p.team.members.map((member, i) => (
              <div key={i} className="card" style={{ padding: "32px 24px" }}>
                {/* Avatar */}
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: i === 0 ? "var(--cyan)" : "var(--dark-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 900,
                  color: i === 0 ? "#000" : "var(--gray-light)",
                  marginBottom: 16,
                  border: i === 0 ? "none" : "1px solid var(--dark-border)",
                }}>
                  {member.name.charAt(0)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                  {member.role}
                </div>
                <p style={{ fontSize: 14, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
          <div style={{
            background: "var(--dark-card)",
            border: "1px solid var(--cyan)",
            borderRadius: 24,
            padding: "60px 48px",
            boxShadow: "0 0 60px rgba(0,212,200,0.08)",
          }}>
            <h2 style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              {p.cta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
              {p.cta.subtitle}
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <PitchDeckButton
                label={p.cta.btn}
                t={p.modal}
                className="btn-primary"
                // @ts-expect-error style passthrough
                style={{ fontSize: 16, padding: "16px 36px" }}
              />
              <p style={{ fontSize: 14, color: "var(--gray)", margin: 0 }}>{p.cta.contact}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .investors-grid-3 { grid-template-columns: 1fr !important; }
          .investors-grid-2 { grid-template-columns: 1fr !important; }
          .investors-model { grid-template-columns: 1fr !important; }
          .investors-hero-btns { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}
