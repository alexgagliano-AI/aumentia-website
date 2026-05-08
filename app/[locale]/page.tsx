import { getTranslations } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

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
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <span className="badge">✦ {t.hero.badge}</span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 28,
          }}>
            <span style={{ color: "#fff" }}>{t.hero.title1}<br />{t.hero.title2}<br /></span>
            <span className="gradient-text">{t.hero.title3}</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--gray-light)",
            maxWidth: 580,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              {t.hero.cta1} →
            </a>
            <Link href={`/${locale}/audit`} className="btn-outline" style={{ fontSize: 16, padding: "14px 32px" }}>
              {t.hero.cta2}
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1, maxWidth: 720, margin: "0 auto",
            background: "var(--dark-border)", borderRadius: 16, overflow: "hidden",
            border: "1px solid var(--dark-border)",
          }}>
            {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((stat, i) => (
              <div key={i} style={{
                background: "var(--dark-card)", padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--gray-light)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ marginBottom: 20 }}><span className="badge">⚡ {t.problem.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 48, lineHeight: 1.2 }}>
              {t.problem.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              {t.problem.items.map((item, i) => (
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
              padding: "20px 24px", background: "rgba(200,146,42,0.08)",
              border: "1px solid rgba(200,146,42,0.3)", borderRadius: 12,
            }}>
              <p style={{ color: "var(--gold)", fontSize: 15, fontWeight: 500, margin: 0 }}>
                ⚠️ {t.problem.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PILLARS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">◈ {t.pillars.badge}</span></div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16 }}>
              {t.pillars.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, maxWidth: 520, margin: "0 auto" }}>
              {t.pillars.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Audit pillar */}
            <div className="card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, var(--cyan), transparent)",
              }} />
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: "var(--cyan-dim)", border: "1px solid var(--cyan)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 24,
              }}>🔍</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
                {t.pillars.audit.title}
              </h3>
              <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                {t.pillars.audit.desc}
              </p>
              <Link href={`/${locale}/audit`} className="btn-primary">
                {t.pillars.audit.cta} →
              </Link>
            </div>

            {/* Coaching pillar */}
            <div className="card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, var(--gold), transparent)",
              }} />
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: "var(--gold-dim)", border: "1px solid rgba(200,146,42,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 24,
              }}>🤖</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
                {t.pillars.coaching.title}
              </h3>
              <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                {t.pillars.coaching.desc}
              </p>
              <Link href={`/${locale}/coaching`} className="btn-outline">
                {t.pillars.coaching.cta} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">📊 {t.results.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {t.results.title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
            {t.results.items.map((item, i) => (
              <div key={i} style={{
                padding: "32px 24px", textAlign: "center",
                background: "var(--dark)", borderRadius: 16, border: "1px solid var(--dark-border)",
              }}>
                <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {item.value}
                </div>
                <div style={{ color: "var(--gray-light)", fontSize: 14 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 600,
              color: "var(--gold)", maxWidth: 600, margin: "0 auto",
            }}>
              ✦ {t.results.promise}
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
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
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 24 }}><span className="badge">👤 {t.about.badge}</span></div>

            <div style={{ margin: "0 auto 24px", width: 80, height: 80 }}>
              <Image src="/logo.png" alt="Aumentia" width={80} height={80} style={{ objectFit: "contain" }} />
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
              "{t.about.bhag}"
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
      <section className="section">
        <div className="container">
          <div style={{
            textAlign: "center", padding: "64px 40px",
            background: "var(--dark-card)", borderRadius: 24,
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
              {locale === "fr" ? "Prêt à passer à l'action ?" :
               locale === "en" ? "Ready to take action?" :
               "Pronti ad agire?"}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 40, position: "relative" }}>
              {locale === "fr" ? "30 minutes pour identifier vos opportunités IA. Gratuit." :
               locale === "en" ? "30 minutes to identify your AI opportunities. Free." :
               "30 minuti per identificare le tue opportunità IA. Gratuito."}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", position: "relative" }}>
              {t.nav.cta} →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
