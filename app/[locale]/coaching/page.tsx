import { getTranslations } from "@/lib/i18n";

export default async function CoachingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.coachingPage;

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,146,42,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 20 }}><span className="badge">🤖 {p.badge}</span></div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24 }}>
            {p.title}<br />
            <span className="gradient-text">{p.title2}</span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* COACHES GRID */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {p.coaches.map((coach) => {
              const isActive = coach.status === "active";
              return (
                <div key={coach.id} className="card" style={{
                  padding: 36, position: "relative", overflow: "hidden",
                  opacity: isActive ? 1 : 0.7,
                  borderColor: isActive ? "var(--cyan)" : "var(--dark-border)",
                  boxShadow: isActive ? "0 0 30px rgba(0,212,200,0.1)" : "none",
                }}>
                  {/* Top accent */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: isActive
                      ? "linear-gradient(90deg, var(--cyan), transparent)"
                      : "linear-gradient(90deg, #333, transparent)",
                  }} />

                  {/* Status badge */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100,
                      background: isActive ? "var(--cyan-dim)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "var(--cyan)" : "var(--gray)",
                      border: `1px solid ${isActive ? "var(--cyan)" : "var(--dark-border)"}`,
                      textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {isActive ? (locale === "fr" ? "Disponible" : locale === "it" ? "Disponibile" : "Available") : (locale === "fr" ? "Bientôt" : locale === "it" ? "Presto" : "Coming soon")}
                    </span>
                  </div>

                  <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 4 }}>
                    {coach.name}
                  </h2>
                  <p style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                    {coach.tagline}
                  </p>
                  <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                    {coach.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                    {coach.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 12, padding: "3px 10px", borderRadius: 100,
                        background: "var(--dark)", border: "1px solid var(--dark-border)",
                        color: "var(--gray-light)",
                      }}>{tag}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  {isActive && coach.link ? (
                    <a href={coach.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      {coach.cta} →
                    </a>
                  ) : (
                    <button disabled style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 24px", borderRadius: 8,
                      background: "var(--dark)", border: "1px solid var(--dark-border)",
                      color: "var(--gray)", fontSize: 14, fontWeight: 600, cursor: "not-allowed",
                    }}>
                      🔒 {coach.cta}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY AI COACHES */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 56 }}>
            {p.why.title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {p.why.items.map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Telegram */}
      <section className="section">
        <div className="container">
          <div style={{
            display: "flex", alignItems: "center", gap: 40,
            background: "var(--dark-card)", borderRadius: 20, padding: "48px 48px",
            border: "1px solid var(--cyan)", boxShadow: "0 0 40px rgba(0,212,200,0.08)",
          }}>
            <div style={{ fontSize: 64 }}>📱</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>
                {locale === "fr" ? "Commencez maintenant sur Telegram" :
                 locale === "en" ? "Start now on Telegram" :
                 "Inizia ora su Telegram"}
              </h2>
              <p style={{ color: "var(--gray-light)", fontSize: 16, marginBottom: 0 }}>
                {locale === "fr" ? "Le Coach Scaling Up est disponible dès maintenant. Essai gratuit 15 jours." :
                 locale === "en" ? "The Scaling Up Coach is available right now. Free 15-day trial." :
                 "Il Coach Scaling Up è disponibile subito. Prova gratuita 15 giorni."}
              </p>
            </div>
            <a href="https://t.me/ScalingUpCoachBot" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px", flexShrink: 0 }}>
              {locale === "fr" ? "Démarrer gratuitement" :
               locale === "en" ? "Start for free" :
               "Inizia gratuitamente"} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
