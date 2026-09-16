"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  status: string;
}

interface BundleProps {
  agents: Agent[];
  t: {
    badge: string; title: string; desc: string; discount: string;
    select_label: string; total_label: string; bundle_label: string;
    saving_label: string; cta: string;
  };
}

function parsePrice(price: string): number {
  const m = price.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}

export default function BundleCalculator({ agents, t }: BundleProps) {
  const activeAgents = agents.filter(a => a.status === "active");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedAgents = activeAgents.filter(a => selected.has(a.id));
  const total = selectedAgents.reduce((sum, a) => sum + a.priceNum, 0);
  const isBundleActive = selectedAgents.length >= 3;
  const bundlePrice = isBundleActive ? Math.round(total * 0.85) : total;
  const saving = total - bundlePrice;

  return (
    <div style={{
      background: "var(--dark-card)", border: "1px solid rgba(0,212,200,0.2)",
      borderRadius: 24, padding: "40px 36px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ marginBottom: 8 }}><span className="badge">📦 {t.badge}</span></div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em", margin: 0 }}>
            {t.title}
          </h2>
        </div>
        <div style={{
          fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900,
          color: "var(--cyan)", letterSpacing: "-0.04em", lineHeight: 1,
        }}>
          {t.discount}
        </div>
      </div>
      <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>{t.desc}</p>

      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
        {t.select_label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {activeAgents.map(agent => {
          const isSelected = selected.has(agent.id);
          return (
            <button key={agent.id} onClick={() => toggle(agent.id)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 18px", borderRadius: 12, cursor: "pointer",
              background: isSelected ? "rgba(0,212,200,0.08)" : "var(--dark)",
              border: `1px solid ${isSelected ? "rgba(0,212,200,0.4)" : "var(--dark-border)"}`,
              transition: "all 0.15s", textAlign: "left",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, border: `2px solid ${isSelected ? "var(--cyan)" : "var(--gray)"}`,
                  background: isSelected ? "var(--cyan)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {isSelected && <span style={{ color: "#000", fontSize: 12, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ color: isSelected ? "#fff" : "var(--gray-light)", fontSize: 14, fontWeight: 500 }}>
                  {agent.name}
                </span>
              </div>
              <span style={{ color: isSelected ? "var(--cyan)" : "var(--gray)", fontSize: 14, fontWeight: 700 }}>
                {agent.price}€/mois
              </span>
            </button>
          );
        })}
      </div>

      {selected.size > 0 && (
        <div style={{
          background: "var(--dark)", border: "1px solid var(--dark-border)",
          borderRadius: 16, padding: "24px 20px", marginBottom: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "var(--gray-light)", fontSize: 14 }}>{t.total_label}</span>
            <span style={{ color: "var(--gray-light)", fontSize: 16, fontWeight: 700, textDecoration: isBundleActive ? "line-through" : "none" }}>
              {total}€/mois
            </span>
          </div>
          {isBundleActive && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "var(--cyan)", fontSize: 14, fontWeight: 600 }}>{t.bundle_label}</span>
                <span style={{ color: "var(--cyan)", fontSize: 20, fontWeight: 900 }}>{bundlePrice}€/mois</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--gold)", fontSize: 13 }}>{t.saving_label}</span>
                <span style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700 }}>−{saving}€/mois</span>
              </div>
            </>
          )}
          {!isBundleActive && (
            <p style={{ color: "var(--gray)", fontSize: 12, margin: "8px 0 0", fontStyle: "italic" }}>
              Sélectionnez {3 - selected.size} agent{3 - selected.size > 1 ? "s" : ""} de plus pour activer le bundle −15%
            </p>
          )}
        </div>
      )}

      <a href="https://calendly.com/alex-aumentia/scale-scan" target="_blank" rel="noopener noreferrer"
        className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 24px" }}>
        {t.cta}
      </a>
    </div>
  );
}
