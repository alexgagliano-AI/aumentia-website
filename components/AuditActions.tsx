"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  auditId: string;
  status: string;
  respondentCount: number;
  completedCount: number;
  hasReport: boolean;
}

export default function AuditActions({ auditId, status, respondentCount, completedCount, hasReport }: Props) {
  const [generating, setGenerating] = useState(false);
  const [sendingAll, setSendingAll] = useState(false);
  const router = useRouter();

  async function generateReport() {
    if (!confirm(`Générer le rapport avec ${completedCount}/${respondentCount} répondants ? (L'opération prend ~30 secondes)`)) return;
    setGenerating(true);
    const res = await fetch(`/api/admin/audits/${auditId}/report`, { method: "POST" });
    setGenerating(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Erreur lors de la génération du rapport.");
    }
  }

  async function sendAllReminders() {
    if (!confirm("Envoyer un rappel à tous les répondants en attente ?")) return;
    setSendingAll(true);
    const res = await fetch(`/api/admin/audits/${auditId}/remind`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    setSendingAll(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Erreur lors de l'envoi des rappels.");
    }
  }

  function printReport() {
    window.print();
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      {completedCount < respondentCount && respondentCount > 0 && (
        <button
          onClick={sendAllReminders}
          disabled={sendingAll}
          style={{
            padding: "9px 18px", background: "transparent",
            border: "1px solid var(--gold)", borderRadius: 8,
            color: "var(--gold)", fontSize: 13, fontWeight: 600,
            cursor: sendingAll ? "not-allowed" : "pointer",
          }}
        >
          {sendingAll ? "Envoi…" : "📧 Relancer tous"}
        </button>
      )}
      <button
        onClick={generateReport}
        disabled={generating || completedCount === 0}
        style={{
          padding: "9px 18px",
          background: generating || completedCount === 0 ? "var(--dark-border)" : "var(--cyan)",
          color: generating || completedCount === 0 ? "var(--gray)" : "var(--dark)",
          border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
          cursor: generating || completedCount === 0 ? "not-allowed" : "pointer",
        }}
      >
        {generating ? "Génération IA…" : hasReport ? "♻ Regénérer rapport" : "✨ Générer rapport IA"}
      </button>
      {hasReport && (
        <button
          onClick={printReport}
          style={{
            padding: "9px 18px", background: "transparent",
            border: "1px solid var(--dark-border)", borderRadius: 8,
            color: "var(--gray-light)", fontSize: 13, cursor: "pointer",
          }}
        >
          🖨 Imprimer / PDF
        </button>
      )}
    </div>
  );
}
