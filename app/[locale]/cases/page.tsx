import { getTranslations } from "@/lib/i18n";

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.casesPage;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center" }}>
        <div className="container">
          <div style={{ marginBottom: 20 }}><span className="badge">📊 {p.badge}</span></div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 20 }}>
            <span className="gradient-text">{p.title}</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* ─── CAS CLIENTS ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {p.cases.map((c, i) => (
              <div key={i} className="card" style={{ padding: "40px 36px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }} className="case-grid">
                  <div>
                    <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                      {[...Array(5)].map((_, s) => (
                        <span key={s} style={{ color: "var(--gold)", fontSize: 14 }}>★</span>
                      ))}
                    </div>
                    <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#fff", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24, fontWeight: 400 }}>
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{c.name}</div>
                      <div style={{ color: "var(--gray)", fontSize: 13, marginTop: 4 }}>{c.role}</div>
                    </div>
                  </div>
                  <div style={{
                    minWidth: 200, padding: "24px 20px",
                    background: "var(--dark)", border: "1px solid var(--dark-border)",
                    borderRadius: 16, textAlign: "center",
                  }}>
                    <p style={{ color: "var(--gray)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                      {p.results_label}
                    </p>
                    <p style={{ color: "var(--cyan)", fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "64px 40px", background: "var(--dark-card)", borderRadius: 24, border: "1px solid var(--dark-border)" }}>
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
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
