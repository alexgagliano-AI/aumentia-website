import { getTranslations } from "@/lib/i18n";

const CALENDAR_URL = "https://calendly.com/alex-aumentia/scale-scan";

const DEMO_NUMBERS = [
  { sector: "Hôtel", desc: "Réservation et informations pratiques", number: "+32 71 15 54 90" },
  { sector: "Vétérinaire", desc: "Triage et orientation selon l'urgence", number: "+32 71 15 54 91" },
  { sector: "Notaire", desc: "Information générale et orientation humaine", number: "+32 71 15 54 92" },
  { sector: "Administration", desc: "Démarches, horaires et bon service", number: "+32 71 15 54 93" },
  { sector: "Agent vocal IA", desc: "Questions sur le produit et ses possibilités", number: "+32 71 15 54 94" },
  { sector: "Immobilier", desc: "Qualification d'un projet et visite", number: "+32 71 15 54 95" },
  { sector: "Chauffagiste", desc: "Panne, urgence, devis et suivi", number: "+32 71 15 54 96" },
  { sector: "Restaurant", desc: "Menu, préférences et prise de commande", number: "+32 71 15 54 97" },
];

export default async function AgentVocalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.agentVocalPage;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, var(--dark) 60%, rgba(0,212,200,0.04) 100%)",
      }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,200,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
            <div>
              <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
                📞 {p.badge}
              </span>
              <h1 style={{
                fontSize: "clamp(34px, 5vw, 60px)",
                fontWeight: 900, lineHeight: 1.08,
                letterSpacing: "-0.03em", marginBottom: 20,
              }}>
                {p.h1_line1}{" "}
                <span className="gradient-text">{p.h1_accent}</span>
              </h1>
              <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
                {p.subtitle}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {p.cta_primary} →
                </a>
                <a href="#demo" className="btn-outline">
                  {p.cta_demo}
                </a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 8 }}>
                {p.hero_badges.map((b: string) => (
                  <span key={b} style={{ fontSize: 13, color: "var(--gray-light)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", boxShadow: "0 0 6px var(--cyan)" }} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{
                width: 280, height: 280,
                borderRadius: "50%",
                border: "1px solid rgba(0,212,200,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                boxShadow: "0 0 60px rgba(0,212,200,0.08)",
              }}>
                <div style={{
                  position: "absolute", inset: 20,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,212,200,0.1)",
                }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 72 }}>📞</div>
                  <div style={{
                    marginTop: 12, fontSize: 12, fontWeight: 700,
                    color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>
                    {p.hero_visual_label}
                  </div>
                  <div style={{
                    marginTop: 6, width: 8, height: 8, borderRadius: "50%",
                    background: "#22c55e", margin: "6px auto 0",
                    boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                  }} />
                </div>
                {/* Pulse rings */}
                <div style={{
                  position: "absolute", inset: -20,
                  borderRadius: "50%", border: "1px solid rgba(0,212,200,0.08)",
                  animation: "pulse 2s ease-out infinite",
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLÈME ─────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>⚠️ {p.problem_badge}</span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>
              {p.problem_title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7 }}>{p.problem_subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 48 }} className="three-col">
            {p.problem_items.map((item: { title: string; desc: string }) => (
              <div key={item.title} className="card" style={{ padding: "28px 24px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "var(--cyan)" }}>{item.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>{p.how_badge}</span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {p.how_title}
            </h2>
            <p style={{ color: "var(--gray-light)", maxWidth: 560, margin: "0 auto", fontSize: 16 }}>{p.how_subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="four-col">
            {p.steps.map((step: { num: string; title: string; desc: string }, i: number) => (
              <div key={step.num} style={{ position: "relative" }}>
                {i < p.steps.length - 1 && (
                  <div style={{
                    position: "absolute", top: 20, left: "calc(50% + 28px)",
                    width: "calc(100% - 20px)", height: 1,
                    background: "linear-gradient(90deg, rgba(0,212,200,0.3), transparent)",
                  }} className="step-connector" />
                )}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "var(--cyan-dim)", border: "1px solid rgba(0,212,200,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 18, fontWeight: 900, color: "var(--cyan)",
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: "var(--gray-light)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BÉNÉFICES ────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>{p.benefits_badge}</span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {p.benefits_title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="three-col">
            {p.benefits.map((b: { icon: string; title: string; desc: string }) => (
              <div key={b.title} className="card" style={{ padding: "32px 28px" }}>
                <div style={{
                  fontSize: 28, marginBottom: 16,
                  width: 52, height: 52, borderRadius: 14,
                  background: "var(--cyan-dim)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTEURS ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>{p.sectors_badge}</span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {p.sectors_title}
            </h2>
            <p style={{ color: "var(--gray-light)", maxWidth: 560, margin: "0 auto" }}>{p.sectors_subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="four-col">
            {p.sectors.map((s: { icon: string; name: string }) => (
              <div key={s.name} className="card" style={{ padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DÉMOS ────────────────────────────────────────────────────────────── */}
      <section className="section" id="demo" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>🎧 {p.demo_badge}</span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {p.demo_title}
            </h2>
            <p style={{ color: "var(--gray-light)", maxWidth: 600, margin: "0 auto", fontSize: 15, lineHeight: 1.7 }}>
              {p.demo_subtitle}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="four-col">
            {DEMO_NUMBERS.map((d) => (
              <div key={d.number} className="card" style={{ padding: "20px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  {d.sector}
                </div>
                <p style={{ fontSize: 13, color: "var(--gray-light)", marginBottom: 14, lineHeight: 1.5 }}>{d.desc}</p>
                <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
                  {d.number}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--gray)" }}>
            {p.demo_note}
          </p>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>{p.faq_badge}</span>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                {p.faq_title}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {p.faq.map((item: { q: string; a: string }) => (
                <details key={item.q} style={{
                  background: "var(--dark-card)", border: "1px solid var(--dark-border)",
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <summary style={{
                    padding: "18px 24px", cursor: "pointer",
                    fontWeight: 600, fontSize: 15, listStyle: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    {item.q}
                    <span style={{ color: "var(--cyan)", fontSize: 20, lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ padding: "0 24px 18px", color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="section" style={{
        background: "linear-gradient(135deg, rgba(0,212,200,0.08) 0%, var(--dark) 50%)",
        borderTop: "1px solid rgba(0,212,200,0.15)",
      }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 680 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>📞</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
            {p.cta_title}
          </h2>
          <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            {p.cta_subtitle}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
              {p.cta_btn} →
            </a>
            <a href={`mailto:alex@aumentia.ai?subject=Agent%20Vocal%20IA`} className="btn-outline" style={{ padding: "14px 32px", fontSize: 16 }}>
              {p.cta_email}
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "var(--gray)" }}>{p.cta_note}</p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .step-connector { display: none !important; }
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
        }
        details[open] summary span { transform: rotate(45deg); display: inline-block; }
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.3); }
        }
      `}</style>
    </>
  );
}
