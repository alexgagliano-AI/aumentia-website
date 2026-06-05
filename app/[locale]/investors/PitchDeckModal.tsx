'use client'

import { useState } from "react";

type ModalTranslations = {
  title: string;
  subtitle: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  ticket: string;
  ticket_options: string[];
  message: string;
  message_placeholder: string;
  submit: string;
  sending: string;
  success: string;
  success_sub: string;
};

export function PitchDeckButton({ label, t, className }: {
  label: string;
  t: ModalTranslations;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && <PitchDeckModal t={t} onClose={() => setOpen(false)} />}
    </>
  );
}

function PitchDeckModal({ t, onClose }: { t: ModalTranslations; onClose: () => void }) {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", company: "", ticket: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.email || !form.company || !form.ticket) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/pitch-deck-request", {
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
    fontSize: 12,
    fontWeight: 600,
    color: "var(--gray-light)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "var(--dark-card)",
        border: "1px solid var(--cyan)",
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 520,
        width: "100%",
        position: "relative",
        boxShadow: "0 0 60px rgba(0,212,200,0.15)",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 20,
            background: "none", border: "none", color: "var(--gray)",
            fontSize: 22, cursor: "pointer", lineHeight: 1,
          }}
        >×</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{t.success}</h2>
            <p style={{ color: "var(--gray-light)", fontSize: 15, lineHeight: 1.7 }}>{t.success_sub}</p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: 24 }}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ marginBottom: 8 }}><span className="badge">🤝 PITCH DECK</span></div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 6 }}>
                {t.title}
              </h2>
              <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.6 }}>{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Prénom / Nom */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>{t.firstname}</label>
                  <input
                    required value={form.firstname}
                    onChange={e => setForm(f => ({ ...f, firstname: e.target.value }))}
                    style={inputStyle}
                    placeholder="Alexandre"
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t.lastname}</label>
                  <input
                    required value={form.lastname}
                    onChange={e => setForm(f => ({ ...f, lastname: e.target.value }))}
                    style={inputStyle}
                    placeholder="Gagliano"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>{t.email}</label>
                <input
                  required type="email" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  placeholder="alex@fund.vc"
                />
              </div>

              {/* Société */}
              <div>
                <label style={labelStyle}>{t.company}</label>
                <input
                  required value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  style={inputStyle}
                  placeholder="Sequoia Capital"
                />
              </div>

              {/* Ticket */}
              <div>
                <label style={labelStyle}>{t.ticket}</label>
                <select
                  required value={form.ticket}
                  onChange={e => setForm(f => ({ ...f, ticket: e.target.value }))}
                  style={{ ...inputStyle, appearance: "none" }}
                >
                  <option value="">—</option>
                  {t.ticket_options.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>{t.message}</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder={t.message_placeholder}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#f87171", fontSize: 13 }}>
                  Une erreur s'est produite. Réessayez ou écrivez à alex@aumentia.ai
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px 24px", fontSize: 15, opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? t.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
