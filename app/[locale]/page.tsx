import { getTranslations } from "@/lib/i18n";
import Link from "next/link";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const p = t.homePage;

  const accentColor = (accent: string) =>
    accent === "cyan" ? "var(--cyan)" : accent === "gold" ? "var(--gold)" : "var(--gray)";

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", paddingTop: 100, paddingBottom: 80,
      }}>
        <div style={{
          position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: 900, height: 900, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,200,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative", maxWidth: 880 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span className="badge">⚡ {p.hero.badge}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5.5vw, 68px)",
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: "-0.03em", marginBottom: 28,
          }}>
            <span className="gradient-text">{p.hero.h1}</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--gray-light)", maxWidth: 640,
            margin: "0 auto 64px", lineHeight: 1.7,
          }}>
            {p.hero.subtitle}
          </p>

          {/* 3 Doors */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, textAlign: "left" }} className="three-col">
            {p.doors.items.map((door) => (
              <Link key={door.number} href={`/${locale}${door.href}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{
                  padding: "32px 28px",
                  border: `1px solid ${accentColor(door.accent)}30`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em" }}>{door.number}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: accentColor(door.accent),
                      textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>{door.label}</span>
                  </div>
                  <div style={{
                    fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900,
                    letterSpacing: "-0.02em", color: accentColor(door.accent),
                    marginBottom: 12, lineHeight: 1.1,
                  }}>
                    {door.price}
                  </div>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px", flexGrow: 1 }}>
                    {door.desc}
                  </p>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: accentColor(door.accent),
                  }}>
                    {door.cta}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI AUMENTIA ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">✦ {p.why.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {p.why.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="two-col">
            {p.why.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", display: "flex", gap: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: "var(--cyan-dim)", border: "1px solid rgba(0,212,200,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900,
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

      {/* ─── TÉMOIGNAGES ──────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">💬 {p.testimonials.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {p.testimonials.title}
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

      {/* ─── CTA FINALE ───────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{
            textAlign: "center", padding: "72px 40px",
            background: "var(--dark)", borderRadius: 24,
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
              {p.finalcta.title}
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 18, marginBottom: 40, position: "relative", maxWidth: 520, margin: "0 auto 40px" }}>
              {p.finalcta.subtitle}
            </p>
            <Link href={`/${locale}/agents`} className="btn-primary"
              style={{ fontSize: 16, padding: "16px 44px", position: "relative", display: "inline-block" }}>
              {p.finalcta.cta}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          .three-col { grid-template-columns: 1fr 1fr !important; }
        }
        .card:hover { border-color: rgba(0,212,200,0.3) !important; transform: translateY(-2px); }
      `}</style>
    </>
  );
}
