"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SECTIONS, type Question, type Role } from "@/lib/questions";

interface Props {
  token: string;
  respondentId: string;
  respondentName: string;
  respondentRole: Role;
  roleLabel: string;
  companyName: string;
  questions: Question[];
  savedAnswers: Record<string, string>;
}

export default function QuestionnaireClient({
  token, respondentId, respondentName, respondentRole,
  roleLabel, companyName, questions, savedAnswers,
}: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>(savedAnswers);
  const [currentSection, setCurrentSection] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  // Group questions by section (only sections with questions for this role)
  const sections = SECTIONS
    .map((s) => ({ ...s, questions: questions.filter((q) => q.section === s.id) }))
    .filter((s) => s.questions.length > 0);

  const current = sections[currentSection];
  const totalSections = sections.length;
  const pct = Math.round(((currentSection) / totalSections) * 100);

  // Auto-save current section
  async function saveSection(sectionQuestions: Question[]) {
    setSaving(true);
    try {
      await fetch(`/api/respond/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respondentId,
          answers: sectionQuestions
            .filter((q) => answers[q.id] !== undefined)
            .map((q) => ({
              question_id: q.id,
              answer: q.type === "text" || q.type === "choice" ? answers[q.id] : null,
              score: q.type === "scale" ? Number(answers[q.id]) : null,
            })),
          partial: true,
        }),
      });
    } catch { /* non-blocking */ }
    setSaving(false);
  }

  async function handleNext() {
    await saveSection(current.questions);
    setCurrentSection((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/respond/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respondentId,
          answers: questions
            .filter((q) => answers[q.id] !== undefined)
            .map((q) => ({
              question_id: q.id,
              answer: q.type === "text" || q.type === "choice" ? answers[q.id] : null,
              score: q.type === "scale" ? Number(answers[q.id]) : null,
            })),
          partial: false,
        }),
      });
      if (res.ok) {
        router.push(`/results/${token}`);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
        setSubmitting(false);
      }
    } catch {
      alert("Une erreur est survenue. Veuillez réessayer.");
      setSubmitting(false);
    }
  }

  const isSectionComplete = current?.questions.every((q) => {
    if (q.type === "text") return true; // text is optional
    return answers[q.id] !== undefined && answers[q.id] !== "";
  });

  const inputStyle = {
    width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--dark-border)", borderRadius: 10,
    color: "#fff", fontSize: 15, outline: "none",
    boxSizing: "border-box" as const, resize: "vertical" as const,
    fontFamily: "inherit", lineHeight: 1.6,
    minHeight: 100,
  };

  if (!started) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 560, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Image src="/logo.png" alt="Aumentia" width={52} height={52} style={{ objectFit: "contain" }} />
          </div>
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <div style={{ marginBottom: 8 }}>
              <span className="badge">🎯 Diagnostic IA</span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em", margin: "20px 0 12px" }}>
              Bonjour {respondentName} !
            </h1>
            <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              Vous participez au <strong style={{ color: "#fff" }}>Diagnostic IA de {companyName}</strong>.
              En tant que <strong style={{ color: "var(--cyan)" }}>{roleLabel}</strong>, votre perspective est précieuse.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, textAlign: "left" }}>
              {[
                ["⏱", "20 à 30 minutes", "À compléter en une ou plusieurs fois"],
                ["🔒", "Confidentiel", "Vos réponses sont traitées de manière anonyme"],
                ["🎯", "Impact direct", "Vos insights alimentent le plan IA stratégique"],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: 14, padding: "12px 16px", background: "var(--dark)", borderRadius: 10, border: "1px solid var(--dark-border)" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>
                    <div style={{ color: "var(--gray-light)", fontSize: 13 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStarted(true)}
              style={{
                width: "100%", padding: "14px 28px",
                background: "var(--cyan)", color: "var(--dark)",
                border: "none", borderRadius: 10, fontWeight: 700,
                fontSize: 16, cursor: "pointer",
              }}
            >
              Démarrer le questionnaire →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(5,5,5,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--dark-border)", padding: "0 24px",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
          <Image src="/logo.png" alt="" width={28} height={28} style={{ objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 3, background: "var(--dark-border)", borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, background: "var(--cyan)", width: `${pct}%`, transition: "width 0.4s" }} />
            </div>
          </div>
          <span style={{ fontSize: 12, color: "var(--gray-light)", whiteSpace: "nowrap" }}>
            {currentSection + 1} / {totalSections}
          </span>
          {saving && <span style={{ fontSize: 11, color: "var(--gray)" }}>Sauvegarde…</span>}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {current.label}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {current.questions.map((q, qi) => (
            <div key={q.id}>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5, marginBottom: 16 }}>
                <span style={{ color: "var(--cyan)", marginRight: 8, fontSize: 14 }}>{qi + 1}.</span>
                {q.text}
              </p>

              {q.type === "text" && (
                <textarea
                  style={inputStyle}
                  placeholder={q.placeholder ?? "Votre réponse…"}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  onFocus={(e) => (e.target.style.borderColor = "var(--cyan)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")}
                />
              )}

              {q.type === "scale" && q.options && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                        style={{
                          flex: 1, minWidth: 80, padding: "12px 8px",
                          background: selected ? "var(--cyan)" : "var(--dark-card)",
                          border: selected ? "1px solid var(--cyan)" : "1px solid var(--dark-border)",
                          borderRadius: 10, color: selected ? "var(--dark)" : "#fff",
                          fontSize: 13, fontWeight: selected ? 700 : 400,
                          cursor: "pointer", transition: "all 0.15s",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4, color: selected ? "var(--dark)" : "var(--cyan)" }}>
                          {opt.value}
                        </div>
                        <div style={{ fontSize: 11 }}>{opt.label}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "choice" && q.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                        style={{
                          padding: "13px 16px",
                          background: selected ? "var(--cyan-dim)" : "var(--dark-card)",
                          border: selected ? "1px solid var(--cyan)" : "1px solid var(--dark-border)",
                          borderRadius: 10, color: selected ? "var(--cyan)" : "var(--gray-light)",
                          fontSize: 14, fontWeight: selected ? 600 : 400,
                          cursor: "pointer", transition: "all 0.15s",
                          textAlign: "left", display: "flex", alignItems: "center", gap: 12,
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          border: selected ? "none" : "2px solid var(--dark-border)",
                          background: selected ? "var(--cyan)" : "transparent",
                          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--dark)" }} />}
                        </div>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
          {currentSection > 0 ? (
            <button
              onClick={() => { setCurrentSection((s) => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ padding: "12px 24px", background: "transparent", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--gray-light)", fontSize: 14, cursor: "pointer" }}
            >
              ← Précédent
            </button>
          ) : <div />}

          {currentSection < totalSections - 1 ? (
            <button
              onClick={handleNext}
              style={{
                padding: "12px 28px",
                background: "var(--cyan)", color: "var(--dark)",
                border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}
            >
              Section suivante →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                padding: "14px 32px",
                background: submitting ? "var(--dark-border)" : "var(--cyan)",
                color: submitting ? "var(--gray)" : "var(--dark)",
                border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Envoi en cours…" : "Soumettre mes réponses ✓"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
