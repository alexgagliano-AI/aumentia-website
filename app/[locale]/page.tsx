import { getTranslations } from "@/lib/i18n";
import Image from "next/image";
import DiagnosticRequest from "@/components/DiagnosticRequest";

function buildJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://aumentia.ai/${locale}`,
    url: `https://aumentia.ai/${locale}`,
    name: locale === "fr"
      ? "Aumentia — Conseil IA pour PME. ROI réel."
      : locale === "en"
      ? "Aumentia — AI Consulting for SMEs. Real ROI."
      : "Aumentia — Consulenza IA per PMI. ROI Reale.",
    description: locale === "fr"
      ? "Audit IA, coaching IA et automatisation pour PME. +20% d'efficacité en 90 jours. Alexandre Gagliano, Bruxelles."
      : locale === "en"
      ? "AI audit, coaching and automation for SMEs. +20% efficiency in 90 days. Alexandre Gagliano, Brussels."
      : "Audit IA, coaching IA e automazione per PMI. +20% efficienza in 90 giorni. Alexandre Gagliano, Bruxelles.",
    inLanguage: locale,
    isPartOf: { "@id": "https://aumentia.ai/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Aumentia", item: "https://aumentia.ai" },
        { "@type": "ListItem", position: 2, name: locale.toUpperCase(), item: `https://aumentia.ai/${locale}` },
      ],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
      />
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", paddingTop: 100, paddingBottom: 80,
      }}>
        <div style={{
          position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative", maxWidth: 860 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span className="badge">⚡ {t.hero.badge}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5.5vw, 72px)",
            fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-0.03em", marginBottom: 28,
          }}>
            <span className="gradient-text">{t.hero.h1}</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--gray-light)", maxWidth: 620,
            margin: "0 auto 48px", lineHeight: 1.7,
          }}>
            {t.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              {t.hero.cta1} →
            </a>
            <a href={`/${locale}#process`} className="btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROBLÈME ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ marginBottom: 16 }}><span className="badge">⚠️ {t.problem.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 48, lineHeight: 1.15 }}>
              {t.problem.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }} className="two-col">
              {t.problem.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "16px 20px", background: "var(--dark)", borderRadius: 12,
                  border: "1px solid var(--dark-border)",
                }}>
                  <span style={{ color: "#ef4444", fontSize: 14, flexShrink: 0, marginTop: 3, fontWeight: 700 }}>✕</span>
                  <span style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "18px 24px", background: "rgba(0,212,200,0.06)",
              border: "1px solid rgba(0,212,200,0.2)", borderRadius: 12,
            }}>
              <p style={{ color: "var(--cyan)", fontSize: 15, fontWeight: 600, margin: 0 }}>
                ✦ {t.problem.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONSÉQUENCES ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">💸 {t.consequences.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {t.consequences.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
            {t.consequences.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                  fontSize: 14, fontWeight: 900, color: "#ef4444", marginBottom: 16,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">◈ {t.solution.badge}</span></div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16 }}>
              <span style={{ color: "#fff" }}>{t.solution.title} </span>
              <span className="gradient-text">{t.solution.titleAccent}</span>
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, maxWidth: 580, margin: "0 auto" }}>
              {t.solution.subtitle}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="two-col">
            {t.solution.pillars.map((p, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px", display: "flex", gap: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: "var(--cyan-dim)", border: "1px solid rgba(0,212,200,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">📅 {t.process.badge}</span></div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
              {t.process.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 17 }}>{t.process.subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="two-col">
            {t.process.weeks.map((w, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: i < 2
                    ? "linear-gradient(90deg, var(--cyan), transparent)"
                    : "linear-gradient(90deg, var(--gold), transparent)",
                }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                  <span style={{
                    fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em",
                    color: i < 2 ? "var(--cyan)" : "var(--gold)", lineHeight: 1,
                  }}>{w.num}</span>
                  <span style={{ color: "var(--gray)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {w.label}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, letterSpacing: "-0.01em" }}>{w.title}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {w.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "var(--cyan)", fontSize: 12, flexShrink: 0, marginTop: 4 }}>✓</span>
                      <span style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFRE ────────────────────────────────────────────────────────── */}
      <section id="offer" className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">◈ {t.offer.badge}</span></div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
              <span style={{ color: "#fff" }}>{t.offer.title} </span>
              <span className="gradient-text">{t.offer.titleAccent}</span>
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18 }}>{t.offer.subtitle}</p>
          </div>

          {/* Price banner */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 48, flexWrap: "wrap",
            background: "var(--dark)", border: "1px solid var(--dark-border)",
            borderRadius: 20, padding: "32px 48px", marginBottom: 40,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 900, color: "var(--cyan)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                {t.offer.price}
              </div>
              <div style={{ color: "var(--gray-light)", fontSize: 13, marginTop: 6 }}>{t.offer.priceLabel}</div>
            </div>
            <div style={{ width: 1, height: 56, background: "var(--dark-border)" }} className="price-divider" />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 900, color: "var(--gold)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                {t.offer.duration}
              </div>
              <div style={{ color: "var(--gray-light)", fontSize: 13, marginTop: 6 }}>{t.offer.durationLabel}</div>
            </div>
          </div>

          {/* Deliverables */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }} className="three-col">
            {t.offer.deliverables.map((d, i) => (
              <div key={i} className="card" style={{ padding: "24px 20px" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{d.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{d.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 44px", marginBottom: 16, display: "inline-block" }}>
              {t.offer.cta} →
            </a>
            <p style={{ color: "var(--gray)", fontSize: 13, margin: 0 }}>🛡️ {t.offer.guarantee}</p>
          </div>
        </div>
      </section>

      {/* ─── PREUVE / CRÉDIBILITÉ ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">✦ {t.proof.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {t.proof.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="two-col">
            {t.proof.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", gap: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: "var(--gold-dim)", border: "1px solid rgba(200,146,42,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">💬 {t.social.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {t.social.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="three-col">
            {t.social.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[...Array(5)].map((_, s) => (
                    <span key={s} style={{ color: "var(--gold)", fontSize: 13 }}>★</span>
                  ))}
                </div>
                <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic", flexGrow: 1 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                  <div style={{ color: "var(--gray)", fontSize: 13, marginTop: 3 }}>{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIAGNOSTIC REQUEST ───────────────────────────────────────────── */}
      <DiagnosticRequest t={t.diagnostic} />

      {/* ─── ABOUT ALEXANDRE ──────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 24 }}><span className="badge">👤 {t.about.badge}</span></div>
            <div style={{ margin: "0 auto 24px", width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--cyan)" }}>
              <Image src="/alexandre.jpg" alt="Alexandre Gagliano" width={100} height={100} style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>
              {t.about.name}
            </h2>
            <p style={{ color: "var(--cyan)", fontSize: 14, fontWeight: 600, marginBottom: 28 }}>{t.about.role}</p>
            <blockquote style={{
              fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700,
              color: "var(--gold)", lineHeight: 1.5, marginBottom: 20,
              fontStyle: "italic", padding: "0 16px",
            }}>
              &ldquo;{t.about.bhag}&rdquo;
            </blockquote>
            <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              {t.about.purpose}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
              {t.about.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA FINALE ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{
            textAlign: "center", padding: "72px 40px",
            background: "var(--dark-card)", borderRadius: 24,
            border: "1px solid var(--dark-border)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: 500, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,200,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16, position: "relative" }}>
              {t.finalcta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 40, position: "relative", maxWidth: 520, margin: "0 auto 40px" }}>
              {t.finalcta.subtitle}
            </p>
            <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ fontSize: 16, padding: "16px 44px", position: "relative" }}>
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
