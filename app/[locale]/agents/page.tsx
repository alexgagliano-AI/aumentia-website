import { getTranslations } from "@/lib/i18n";
import BundleCalculator from "./BundleCalculator";
import WaitlistForm from "./WaitlistForm";

export default async function AgentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.agentsPage;

  const bundleAgents = p.agents.map(a => {
    const m = a.price.match(/\d+/);
    return { id: a.id, name: a.name, price: a.price, priceNum: m ? parseInt(m[0]) : 0, status: a.status };
  });

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,200,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <div style={{ marginBottom: 20 }}><span className="badge">🤖 {p.badge}</span></div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16 }}>
            {p.title}<br />
            <span className="gradient-text">un par fonction.</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* ─── AGENTS ───────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.6)",
            }} />
            <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
              {p.active_section}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="three-col">
            {p.agents.map(agent => (
              <div key={agent.id} className="card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                  {agent.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                      background: "var(--cyan-dim)", color: "var(--cyan)",
                      border: "1px solid rgba(0,212,200,0.2)",
                    }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                  {agent.name}
                </h3>
                <p style={{ color: "var(--cyan)", fontSize: 12, fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {agent.tagline}
                </p>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px", flexGrow: 1 }}>
                  {agent.desc}
                </p>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {agent.price}
                  </span>
                  <span style={{ color: "var(--gray)", fontSize: 13, marginLeft: 6 }}>{agent.priceLabel}</span>
                </div>

                {agent.cta === "trial" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <a href="https://t.me/ScalingUpCoachBot" target="_blank" rel="noopener noreferrer"
                      className="btn-primary" style={{ textAlign: "center", fontSize: 13, padding: "10px 20px" }}>
                      {p.trial_cta} →
                    </a>
                    <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
                      className="btn-outline" style={{ textAlign: "center", fontSize: 13, padding: "10px 20px" }}>
                      {p.demo_cta}
                    </a>
                  </div>
                ) : (
                  <WaitlistForm t={p.waitlist_form} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUNDLE CALCULATOR ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <BundleCalculator agents={bundleAgents} t={p.bundle} />
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
