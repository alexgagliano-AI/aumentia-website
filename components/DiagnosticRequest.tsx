"use client";

import { useState } from "react";

interface DiagnosticRequestProps {
  t: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      role: string;
      rolePlaceholder: string;
      roles: { ceo: string; coo: string; cfo: string; other: string };
      employees: string;
      employeesPlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      successSub: string;
    };
  };
}

export default function DiagnosticRequest({ t }: DiagnosticRequestProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", employees: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/diagnostic-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--dark)",
    border: "1px solid var(--dark-border)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    color: "var(--gray-light)",
    marginBottom: 6,
    fontWeight: 500,
  };

  if (status === "success") {
    return (
      <section className="section" style={{ background: "var(--dark-card)" }}>
        <div className="container">
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(0,212,200,0.15)", border: "1px solid var(--cyan)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 24px",
            }}>✓</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
              {t.form.success}
            </h3>
            <p style={{ color: "var(--gray-light)", fontSize: 16 }}>{t.form.successSub}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ background: "var(--dark-card)" }}>
      <div className="container">
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ marginBottom: 16 }}><span className="badge">🔬 {t.badge}</span></div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
              <span style={{ color: "#fff" }}>{t.title} </span>
              <span className="gradient-text">{t.titleAccent}</span>
            </h2>
            <p style={{ color: "var(--gray-light)", fontSize: 17, lineHeight: 1.7 }}>
              {t.subtitle}
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: "var(--dark)", border: "1px solid var(--dark-border)",
            borderRadius: 20, padding: "40px 36px",
          }}>
            <form onSubmit={handleSubmit}>
              {/* Row 1: name + email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-two-col">
                <div>
                  <label style={labelStyle}>{t.form.name} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    placeholder="Alexandre Gagliano"
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t.form.email} *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    placeholder="alex@entreprise.com"
                  />
                </div>
              </div>

              {/* Row 2: company + employees */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-two-col">
                <div>
                  <label style={labelStyle}>{t.form.company} *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    style={inputStyle}
                    placeholder="Acme SAS"
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t.form.employees}</label>
                  <select
                    value={form.employees}
                    onChange={e => setForm(f => ({ ...f, employees: e.target.value }))}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  >
                    <option value="">{t.form.employeesPlaceholder}</option>
                    <option value="1-10">1 – 10</option>
                    <option value="11-30">11 – 30</option>
                    <option value="31-100">31 – 100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
              </div>

              {/* Row 3: role */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>{t.form.role} *</label>
                <select
                  required
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                >
                  <option value="">{t.form.rolePlaceholder}</option>
                  <option value="ceo">{t.form.roles.ceo}</option>
                  <option value="coo">{t.form.roles.coo}</option>
                  <option value="cfo">{t.form.roles.cfo}</option>
                  <option value="other">{t.form.roles.other}</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 24px", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? t.form.sending : t.form.submit}
              </button>

              {status === "error" && (
                <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginTop: 12, margin: "12px 0 0" }}>
                  Une erreur est survenue. Réessayez ou contactez alex@aumentia.ai
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
