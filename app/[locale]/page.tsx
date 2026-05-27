import { getTranslations } from "@/lib/i18n";
import Image from "next/image";
import DiagnosticRequest from "@/components/DiagnosticRequest";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", paddingTop: 100,
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <span className="badge">⚡ {t.hero.badge}</span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontSize: "clamp(40px, 7vw, 84px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 28,
          }}>
            <span style={{ color: "#fff" }}>{t.hero.h1}<br /></span>
            <span className="gradient-text">{t.hero.h1accent}</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--gray-light)",
            maxWidth: 560,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              {t.hero.cta1} →
            </a>
            <a href={`/${locale}#offer`} className="btn-outline" style={{ fontSize: 16, padding: "14px 32px" }}>
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ marginBottom: 20 }}><span className="badge">⚡ {t.pain.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 48, lineHeight: 1.2 }}>
              {t.pain.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }} className="two-col">
              {t.pain.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "16px 20px", background: "var(--dark)", borderRadius: 12,
                  border: "1px solid var(--dark-border)",
                }}>
                  <span style={{ color: "#ef4444", fontSize: 16, flexShrink: 0, marginTop: 2 }}>✕</span>
                  <span style={{ color: "var(--gray-light)", fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "20px 24px", background: "rgba(0,212,200,0.06)",
              border: "1px solid rgba(0,212,200,0.25)", borderRadius: 12,
            }}>
              <p style={{ color: "var(--cyan)", fontSize: 15, fontWeight: 600, margin: 0 }}>
                ✦ {t.pain.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="offer" className="section">
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">◈ {t.offer.badge}</span></div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16 }}>
              <span style={{ color: "#fff" }}>{t.offer.title} </span>
              <span className="gradient-text">{t.offer.titleAccent}</span>
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              {t.offer.subtitle}
            </p>
          </div>

          {/* Price banner */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 48,
            background: "var(--dark-card)", border: "1px solid var(--dark-border)",
            borderRadius: 20, padding: "32px 48px", marginBottom: 48, flexWrap: "wrap",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.03em" }}>
                {t.offer.price}
              </div>
              <div style={{ color: "var(--gray-light)", fontSize: 14, marginTop: 4 }}>{t.offer.priceLabel}</div>
            </div>
            <div style={{ width: 1, height: 60, background: "var(--dark-border)", flexShrink: 0 }} className="price-divider" />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, color: "var(--gold)", letterSpacing: "-0.03em" }}>
                {t.offer.duration}
              </div>
              <div style={{ color: "var(--gray-light)", fontSize: 14, marginTop: 4 }}>{t.offer.durationLabel}</div>
            </div>
          </div>

          {/* Deliverables grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }} className="three-col">
            {t.offer.deliverables.map((d, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{d.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{d.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA + guarantee */}
          <div style={{ textAlign: "center" }}>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", display: "inline-block", marginBottom: 20 }}>
              {t.offer.cta} →
            </a>
            <p style={{ color: "var(--gray)", fontSize: 13, margin: 0 }}>
              🛡️ {t.offer.guarantee}
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">📊 {t.results.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {t.results.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }} className="three-col">
            {t.results.items.map((item, i) => (
              <div key={i} style={{
                padding: "32px 24px", textAlign: "center",
                background: "var(--dark)", borderRadius: 16, border: "1px solid var(--dark-border)",
              }}>
                <div style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {item.value}
                </div>
                <div style={{ color: "var(--gray-light)", fontSize: 14 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700,
              color: "var(--gold)", maxWidth: 600, margin: "0 auto",
            }}>
              ✦ {t.results.promise}
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">💬 {t.social.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {t.social.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="three-col">
            {t.social.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 4 }}>
                  {[...Array(5)].map((_, s) => (
                    <span key={s} style={{ color: "var(--gold)", fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic", flexGrow: 1 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                  <div style={{ color: "var(--gray)", fontSize: 13, marginTop: 4 }}>{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC REQUEST */}
      <DiagnosticRequest t={t.diagnostic} />

      {/* VALUES */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">◆ {t.values.badge}</span></div>
            <h2 style={{ fontSize: "clamp(56px, 10vw, 120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: 16 }}>
              <span className="gradient-text">{t.values.title}</span>
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>
              {t.values.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="two-col">
            {t.values.items.map((v, i) => (
              <div key={i} className="card" style={{ padding: "32px 36px", display: "flex", gap: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: "var(--cyan-dim)", border: "1px solid var(--cyan)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 18, color: "var(--cyan)",
                }}>
                  {v.letter}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ALEXANDRE */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 24 }}><span className="badge">👤 {t.about.badge}</span></div>

            <div style={{ margin: "0 auto 24px", width: 120, height: 120, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--cyan)" }}>
              <Image src="/alexandre.jpg" alt="Alexandre Gagliano" width={120} height={120} style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>

            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
              {t.about.name}
            </h2>
            <p style={{ color: "var(--cyan)", fontSize: 15, fontWeight: 600, marginBottom: 32 }}>
              {t.about.role}
            </p>

            <blockquote style={{
              fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700,
              color: "var(--gold)", lineHeight: 1.5, marginBottom: 24,
              fontStyle: "italic", padding: "0 24px",
            }}>
              &ldquo;{t.about.bhag}&rdquo;
            </blockquote>

            <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>
              {t.about.purpose}
            </p>

            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              {t.about.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{
            textAlign: "center", padding: "64px 40px",
            background: "var(--dark)", borderRadius: 24,
            border: "1px solid var(--dark-border)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: 400, height: 400, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16, position: "relative" }}>
              {t.finalcta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 40, position: "relative" }}>
              {t.finalcta.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", position: "relative" }}>
              {t.finalcta.cta} →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .price-divider { display: none !important; }
        }
        @media (max-width: 1024px) {
          .three-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
