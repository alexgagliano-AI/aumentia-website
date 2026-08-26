"use client";

import { useEffect } from "react";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
const CYAN = "var(--cyan)";
const GOLD = "var(--gold)";

export default function MerciPage() {
  useEffect(() => {
    // Meta Pixel — Purchase (objectif principal de la campagne)
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", { value: 490, currency: "EUR" });
    }
  }, []);

  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-geist-sans, system-ui)" }}>

      {/* Logo minimal */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: CYAN, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, color: "var(--dark)",
          }}>A</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: CYAN, letterSpacing: "0.15em" }}>AUMENTIA</span>
        </div>
      </div>

      {/* Header confirmation */}
      <section style={{ padding: "48px 24px 40px", textAlign: "center", borderBottom: "1px solid var(--dark-border)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{
            width: 64, height: 64, background: GOLD, borderRadius: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 28, color: "var(--dark)",
            margin: "0 auto 24px",
          }}>✓</div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Paiement confirmé. Dernière étape.
          </h1>
          <p style={{ fontSize: 17, color: "var(--gray-light)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Réserve maintenant ton créneau de Scale Scan (120 min). Tu recevras
            l'assessment en ligne à remplir juste après, par email.
          </p>
        </div>
      </section>

      {/* Calendly embed */}
      <section style={{ padding: "40px 24px 64px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {CALENDLY_URL ? (
            <div style={{
              borderRadius: 20, overflow: "hidden",
              border: `1px solid ${CYAN}`,
              boxShadow: "0 0 40px rgba(0,212,200,0.08)",
            }}>
              <iframe
                title="Réserver mon Scale Scan"
                src={CALENDLY_URL}
                style={{ display: "block", width: "100%", height: 720, border: "none" }}
              />
            </div>
          ) : (
            <div style={{
              background: "var(--dark-card)", border: "1px solid rgba(200,146,42,0.3)",
              borderRadius: 16, padding: "28px 24px",
              fontFamily: "monospace", fontSize: 13, color: "#f59e0b",
            }}>
              [Config manquante] Renseigne NEXT_PUBLIC_CALENDLY_URL dans .env.local
            </div>
          )}
        </div>
      </section>

      {/* Footer minimal */}
      <div style={{ padding: "24px", textAlign: "center", borderTop: "1px solid var(--dark-border)" }}>
        <p style={{ fontSize: 12, color: "var(--gray)", fontFamily: "monospace", margin: 0 }}>
          Aumentia · Bruxelles · alex@aumentia.ai
        </p>
      </div>

    </main>
  );
}
