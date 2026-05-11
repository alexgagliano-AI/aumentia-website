"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROLE_LABELS, type Role } from "@/lib/questions";
import { LANG_LABELS, type Lang } from "@/lib/i18n-diagnostic";

const ROLES: Role[] = ["ceo", "cfo", "coo", "sales", "ops", "hr", "employee"];

interface Respondent {
  name: string;
  email: string;
  role: Role;
}

export default function NewAudit() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState({
    name: "", industry: "", size: "11-50", country: "Belgique", region: "",
  });
  const [language, setLanguage] = useState<Lang>("fr");

  const [respondents, setRespondents] = useState<Respondent[]>([
    { name: "", email: "", role: "ceo" },
  ]);

  function addRespondent() {
    setRespondents((prev) => [...prev, { name: "", email: "", role: "employee" }]);
  }

  function removeRespondent(i: number) {
    setRespondents((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateRespondent(i: number, field: keyof Respondent, value: string) {
    setRespondents((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    );
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, respondents, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur");
      router.push(`/admin/audits/${data.auditId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "10px 12px", background: "var(--dark)",
    border: "1px solid var(--dark-border)", borderRadius: 8,
    color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" as const,
  };
  const labelStyle = {
    display: "block" as const, fontSize: 11, fontWeight: 600 as const,
    color: "var(--gray-light)", textTransform: "uppercase" as const,
    letterSpacing: "0.05em", marginBottom: 6,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      <div style={{
        background: "var(--dark-card)", borderBottom: "1px solid var(--dark-border)",
        padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16,
      }}>
        <Link href="/admin/dashboard" style={{ color: "var(--gray)", fontSize: 13, textDecoration: "none" }}>
          ← Diagnostics
        </Link>
        <span style={{ color: "var(--dark-border)" }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Nouveau diagnostic</span>
      </div>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          {["Entreprise", "Répondants", "Lancement"].map((label, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                height: 3, borderRadius: 2,
                background: i + 1 <= step ? "var(--cyan)" : "var(--dark-border)",
                marginBottom: 6,
              }} />
              <span style={{ fontSize: 11, color: i + 1 <= step ? "var(--cyan)" : "var(--gray)", fontWeight: 600 }}>
                {i + 1}. {label}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Informations de l&apos;entreprise</h2>
            <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 28 }}>
              Ces informations apparaîtront dans le rapport final.
            </p>
            <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Nom de l&apos;entreprise *</label>
                <input style={inputStyle} value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  placeholder="Ex: Acme SA" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Secteur d&apos;activité</label>
                  <input style={inputStyle} value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                    placeholder="Ex: Industrie, Services, Retail…" />
                </div>
                <div>
                  <label style={labelStyle}>Taille de l&apos;entreprise</label>
                  <select style={inputStyle} value={company.size} onChange={(e) => setCompany({ ...company, size: e.target.value })}>
                    {["1-10", "11-50", "51-200", "201-500", "500+"].map((s) => (
                      <option key={s} value={s}>{s} employés</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Pays</label>
                  <input style={inputStyle} value={company.country} onChange={(e) => setCompany({ ...company, country: e.target.value })}
                    placeholder="Ex: Belgique" />
                </div>
                <div>
                  <label style={labelStyle}>Région</label>
                  <input style={inputStyle} value={company.region} onChange={(e) => setCompany({ ...company, region: e.target.value })}
                    placeholder="Ex: Bruxelles, Liège, Namur…" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Langue du questionnaire</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([code, label]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      style={{
                        padding: "8px 16px", borderRadius: 8, fontSize: 14, cursor: "pointer",
                        border: language === code ? "1px solid var(--cyan)" : "1px solid var(--dark-border)",
                        background: language === code ? "var(--cyan-dim)" : "var(--dark)",
                        color: language === code ? "var(--cyan)" : "var(--gray-light)",
                        fontWeight: language === code ? 700 : 400,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <button
                onClick={() => company.name.trim() && setStep(2)}
                disabled={!company.name.trim()}
                style={{
                  padding: "11px 28px", background: company.name.trim() ? "var(--cyan)" : "var(--dark-border)",
                  color: company.name.trim() ? "var(--dark)" : "var(--gray)",
                  border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: company.name.trim() ? "pointer" : "not-allowed",
                }}
              >
                Suivant — Répondants →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Répondants</h2>
            <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 28 }}>
              Ajoutez les personnes qui recevront le questionnaire. Chaque rôle reçoit des questions adaptées.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {respondents.map((r, i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                    <div>
                      <label style={labelStyle}>Prénom & Nom</label>
                      <input style={inputStyle} value={r.name} onChange={(e) => updateRespondent(i, "name", e.target.value)}
                        placeholder="Ex: Marie Dupont" />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input style={inputStyle} type="email" value={r.email} onChange={(e) => updateRespondent(i, "email", e.target.value)}
                        placeholder="marie@entreprise.com" />
                    </div>
                    <div>
                      <label style={labelStyle}>Rôle</label>
                      <select style={inputStyle} value={r.role} onChange={(e) => updateRespondent(i, "role", e.target.value as Role)}>
                        {ROLES.map((role) => (
                          <option key={role} value={role}>{ROLE_LABELS[role]}</option>
                        ))}
                      </select>
                    </div>
                    {respondents.length > 1 && (
                      <button onClick={() => removeRespondent(i)}
                        style={{ padding: "10px", background: "transparent", border: "1px solid #333", borderRadius: 8, color: "#EF4444", cursor: "pointer", fontSize: 16 }}>
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addRespondent}
              style={{
                marginTop: 12, padding: "10px 20px", background: "transparent",
                border: "1px dashed var(--dark-border)", borderRadius: 8,
                color: "var(--cyan)", fontSize: 14, cursor: "pointer", width: "100%",
              }}
            >
              + Ajouter un répondant
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button onClick={() => setStep(1)} style={{ padding: "11px 24px", background: "transparent", border: "1px solid var(--dark-border)", borderRadius: 8, color: "var(--gray-light)", fontSize: 14, cursor: "pointer" }}>
                ← Retour
              </button>
              <button
                onClick={() => respondents.every((r) => r.name && r.email) && setStep(3)}
                disabled={!respondents.every((r) => r.name && r.email)}
                style={{
                  padding: "11px 28px",
                  background: respondents.every((r) => r.name && r.email) ? "var(--cyan)" : "var(--dark-border)",
                  color: respondents.every((r) => r.name && r.email) ? "var(--dark)" : "var(--gray)",
                  border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14,
                  cursor: respondents.every((r) => r.name && r.email) ? "pointer" : "not-allowed",
                }}
              >
                Suivant — Récapitulatif →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Récapitulatif & Lancement</h2>
            <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 28 }}>
              Vérifiez les informations avant d&apos;envoyer les invitations.
            </p>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Entreprise
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{company.name}</p>
              <p style={{ color: "var(--gray-light)", fontSize: 13 }}>
                {[company.industry, company.size + " employés", company.country].filter(Boolean).join(" · ")}
                {" · "}{LANG_LABELS[language]}
              </p>
            </div>
            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                {respondents.length} répondant{respondents.length > 1 ? "s" : ""}
              </p>
              {respondents.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < respondents.length - 1 ? "1px solid var(--dark-border)" : "none" }}>
                  <span style={{ fontSize: 14 }}>{r.name}</span>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--gray-light)" }}>{r.email}</span>
                    <span style={{ fontSize: 11, color: "var(--cyan)", background: "var(--cyan-dim)", padding: "2px 8px", borderRadius: 100 }}>
                      {ROLE_LABELS[r.role].split(" ")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {error && (
              <p style={{ color: "#EF4444", fontSize: 14, padding: "10px 14px", background: "rgba(239,68,68,0.1)", borderRadius: 8, marginBottom: 16 }}>
                {error}
              </p>
            )}
            <div style={{ background: "var(--cyan-dim)", border: "1px solid var(--cyan)", borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <p style={{ color: "var(--cyan)", fontSize: 13, margin: 0 }}>
                📧 Les invitations seront envoyées immédiatement après la création. Chaque répondant recevra un lien unique et personnalisé.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={{ padding: "11px 24px", background: "transparent", border: "1px solid var(--dark-border)", borderRadius: 8, color: "var(--gray-light)", fontSize: 14, cursor: "pointer" }}>
                ← Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  padding: "11px 28px",
                  background: loading ? "var(--dark-border)" : "var(--cyan)",
                  color: loading ? "var(--gray)" : "var(--dark)",
                  border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Création en cours…" : "Créer & envoyer les invitations →"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
