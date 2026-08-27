"use client";

// ─── i18n prep ───────────────────────────────────────────────────────────────
// Copy FR ci-dessous. Pour EN/IT, créer app/[locale]/scale-scan/ avec un
// layout qui override la nav, ou ajouter les traductions ici dans un objet T.
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const STRIPE_URL = process.env.NEXT_PUBLIC_STRIPE_SCAN_URL ?? "https://buy.stripe.com/fZu9AV50w3p14O60dggnK02";

function trackCheckout() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", { value: 490, currency: "EUR" });
  }
}

function Cta({ label = "Réserver mon Scale Scan · 490€", large = false }: { label?: string; large?: boolean }) {
  return (
    <a
      href={STRIPE_URL}
      onClick={trackCheckout}
      className="btn-primary"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        padding: large ? "18px 40px" : "14px 28px",
        fontSize: large ? 17 : 15,
      }}
    >
      {label}
    </a>
  );
}

const CYAN = "var(--cyan)";
const GOLD = "var(--gold)";
const CARD = "var(--dark-card)";
const BORDER = "var(--dark-border)";

export default function ScaleScanPage() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-geist-sans, system-ui)" }}>

      {/* ── LOGO MINIMAL ── */}
      <div style={{ padding: "20px 24px" }}>
        <a href="https://aumentia.ai" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: CYAN, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, color: "var(--dark)",
          }}>A</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: CYAN, letterSpacing: "0.15em" }}>AUMENTIA</span>
        </a>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 72px", textAlign: "center", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="badge" style={{ marginBottom: 24, display: "inline-block" }}>
            Aumentia · Scale Scan
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900,
            letterSpacing: "-0.03em", lineHeight: 1.05,
            margin: "0 0 20px",
          }}>
            Récupère{" "}
            <span style={{ color: CYAN }}>5 à 10h par semaine</span>
            {" "}et sors du chaos —<br />
            avec un système IA installé en 30 jours.
          </h1>
          <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px" }}>
            Tout commence par un Scale Scan de 120 minutes : on identifie exactement
            les tâches à automatiser et combien tu vas gagner. Rentable ou intégralement remboursé.
          </p>
          <Cta large />
          <p style={{ marginTop: 14, fontSize: 12, color: "var(--gray)", fontFamily: "monospace" }}>
            120 min · assessment en ligne + restitution live · garantie « rentable ou remboursé »
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BARRE DE PREUVE
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: CARD, borderBottom: `1px solid ${BORDER}`, padding: "18px 24px" }}>
        <div style={{
          maxWidth: 860, margin: "0 auto",
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "8px 32px", textAlign: "center",
        }}>
          {["5 à 10h gagnées / semaine", "ROI en 1 à 2 trimestres", "Exécution structurée", "Sortie du chaos"].map((item, i) => (
            <span key={i} style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-light)" }}>{item}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LE PROBLÈME
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Le problème
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 36 }}>
            Tu te reconnais ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Tu es le goulot d'étranglement de ta propre boîte.",
              "Tu passes tes journées dans l'opérationnel au lieu de piloter.",
              "Tu vois l'IA partout mais tu ne sais pas par quoi commencer concrètement.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: CYAN,
                  flexShrink: 0, marginTop: 8,
                }} />
                <p style={{ fontSize: 17, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LA SOLUTION — 3 LIVRABLES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Ce que tu reçois
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 40 }}>
            Ce que tu reçois dans le Scale Scan
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              ["Assessment en ligne", "Un questionnaire rempli en amont pour cartographier tes tâches chronophages."],
              ["Restitution live · 60 min", "Les 3 automatisations prioritaires et le système IA à déployer."],
              ["Plan chiffré", "Combien d'heures et d'euros tu récupères, noir sur blanc."],
            ].map(([title, body]) => (
              <div key={title} style={{
                background: "var(--dark)", border: `1px solid ${BORDER}`,
                borderTop: `3px solid ${CYAN}`, borderRadius: 16, padding: "28px 24px",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: "#fff" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GARANTIE
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 24, alignItems: "flex-start",
            background: "rgba(200,146,42,0.06)", border: `1px solid rgba(200,146,42,0.3)`,
            borderRadius: 20, padding: "32px 28px",
          }}>
            <div style={{
              width: 52, height: 52, background: GOLD, borderRadius: 14, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 22, color: "var(--dark)",
            }}>✓</div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>Zéro risque : rentable ou 100% remboursé</h2>
              <p style={{ fontSize: 15, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>
                Si le Scale Scan ne t'identifie pas au minimum 490€ de gains par an,
                tu es intégralement remboursé. Tu n'as littéralement rien à perdre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PREUVES / CAS CLIENTS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Résultats concrets
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 40 }}>
            Ce que ça donne, concrètement
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              {
                metric: "+10h / semaine",
                quote: "Le CEO d'une entreprise de fitness de 40 personnes a récupéré 10 heures par semaine — après une seule session de 120 minutes.",
                color: CYAN,
              },
              {
                metric: "+150% de leads",
                quote: "Une PME de 5 personnes a automatisé tout son funnel de vente et généré 150% de leads qualifiés en plus — en gardant le contrôle humain.",
                color: GOLD,
              },
            ].map((item) => (
              <div key={item.metric} style={{
                background: "var(--dark)", border: `1px solid ${BORDER}`,
                borderRadius: 20, padding: "32px 28px",
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: item.color, fontFamily: "monospace", marginBottom: 16, letterSpacing: "-0.02em" }}>
                  {item.metric}
                </div>
                <blockquote style={{ fontSize: 15, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>
                  &laquo; {item.quote} &raquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          L'ÉTAPE D'APRÈS — UPSELL
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            L'étape d'après
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Et si tu veux qu'on l'installe pour toi ?
          </h2>
          <p style={{ fontSize: 17, color: "var(--gray-light)", lineHeight: 1.8, margin: 0 }}>
            Après le Scan, si tu veux passer à l'implémentation, le{" "}
            <strong style={{ color: "#fff" }}>Growth OS Sprint (30 jours)</strong>{" "}
            passe de{" "}
            <span style={{ color: "var(--gray)", textDecoration: "line-through" }}>7 500€</span>{" "}
            <strong style={{ color: GOLD }}>à 6 000€</strong>{" "}
            pour les clients du Scan. Un système IA opérationnel, résultats visibles en un mois.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          AUTORITÉ
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Qui te parle
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{
              width: 64, height: 64, background: CYAN, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 22, color: "var(--dark)",
            }}>AG</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Alexandre Gagliano</div>
              <div style={{ fontSize: 13, color: CYAN, fontWeight: 600, marginBottom: 14 }}>Founder & CEO, Aumentia</div>
              <p style={{ fontSize: 16, color: "var(--gray-light)", lineHeight: 1.8, margin: 0 }}>
                Coach certifié Scaling Up, auteur de <em>L'As de la Vente et du Marketing</em>.
                J'accompagne des dirigeants de PME en Belgique, en France et en Italie à sortir
                du chaos opérationnel avec des systèmes IA qui exécutent, pas des gadgets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            FAQ
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 36 }}>
            Questions fréquentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["C'est encore une formation ?", "Non. C'est un diagnostic actionnable, puis une implémentation. Tu repars avec un plan, pas des slides."],
              ["Et si ça ne sert à rien pour moi ?", "Tu es intégralement remboursé. La garantie « rentable ou remboursé » couvre 100% des 490€."],
              ["Combien de temps ça prend ?", "120 minutes pour le Scale Scan. 30 jours pour le Growth OS Sprint si tu décides de continuer."],
            ].map(([q, a]) => (
              <div key={q as string} style={{
                background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 20px",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>{q}</h3>
                <p style={{ fontSize: 14, color: "var(--gray-light)", lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Récupère tes heures.<br />
            <span style={{ color: CYAN }}>Reprends le contrôle.</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px" }}>
            120 minutes pour savoir exactement quoi déléguer à la machine —
            rentable ou remboursé.
          </p>
          <Cta large />
          <p style={{ marginTop: 24, fontSize: 12, color: "var(--gray)", fontFamily: "monospace" }}>
            Aumentia · Bruxelles · alex@aumentia.ai
          </p>
        </div>
      </section>

    </main>
  );
}
