"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getTranslations } from "@/lib/i18n";

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const t = getTranslations(locale);
  const p = t.contactPage;

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simple mailto fallback
    const body = `Nom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\nMessage: ${form.message}`;
    window.open(`mailto:alex@aumentia.ai?subject=Contact Aumentia&body=${encodeURIComponent(body)}`);
    setStatus("done");
  }

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div style={{ marginBottom: 20 }}><span className="badge">✉️ {p.badge}</span></div>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20 }}>
              {p.title}<br />
              <span className="gradient-text">{p.title2}</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--gray-light)", lineHeight: 1.7 }}>
              {p.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            {/* Form */}
            <div className="card" style={{ padding: 40 }}>
              {status === "done" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "var(--cyan)" }}>{p.form.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { key: "name", label: p.form.name, type: "text" },
                    { key: "email", label: p.form.email, type: "email" },
                    { key: "company", label: p.form.company, type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-light)", marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        required={field.key !== "company"}
                        style={{
                          width: "100%", padding: "12px 16px",
                          background: "var(--dark)", border: "1px solid var(--dark-border)",
                          borderRadius: 8, color: "#fff", fontSize: 15, outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "var(--cyan)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--dark-border)"}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-light)", marginBottom: 8 }}>
                      {p.form.message}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: "var(--dark)", border: "1px solid var(--dark-border)",
                        borderRadius: 8, color: "#fff", fontSize: 15, outline: "none",
                        resize: "vertical", transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--cyan)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--dark-border)"}
                    />
                  </div>
                  <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ fontSize: 15, padding: "14px", justifyContent: "center" }}>
                    {status === "sending" ? p.form.sending : p.form.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Calendly CTA */}
              <div className="card" style={{ padding: 32, borderColor: "var(--cyan)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.info.demo.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 20 }}>{p.info.demo.desc}</p>
                <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  📅 Calendly →
                </a>
              </div>

              {/* Email */}
              <div className="card" style={{ padding: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  {p.info.email.title}
                </p>
                <a href="mailto:alex@aumentia.ai" style={{ color: "var(--cyan)", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
                  {p.info.email.value}
                </a>
              </div>

              {/* Phone */}
              <div className="card" style={{ padding: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  {p.info.phone.title}
                </p>
                <a href="tel:+32471662563" style={{ color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
                  {p.info.phone.value}
                </a>
              </div>

              {/* Telegram */}
              <div className="card" style={{ padding: 28, borderColor: "rgba(0,136,204,0.4)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Telegram
                </p>
                <a href="https://t.me/ScalingUpCoachBot" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#0088cc", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
                  @ScalingUpCoachBot →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
