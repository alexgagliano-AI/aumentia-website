"use client";

import { useState } from "react";

export default function RemindButtonClient({ respondentId, auditId }: { respondentId: string; auditId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function sendReminder() {
    setState("loading");
    try {
      const res = await fetch(`/api/admin/audits/${auditId}/remind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respondentId }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <span style={{ fontSize: 11, color: "#10B981" }}>✓ Envoyé</span>;
  }
  if (state === "error") {
    return <span style={{ fontSize: 11, color: "#EF4444" }}>Erreur</span>;
  }

  return (
    <button
      onClick={sendReminder}
      disabled={state === "loading"}
      style={{
        padding: "4px 10px", background: "transparent",
        border: "1px solid var(--dark-border)", borderRadius: 6,
        color: "var(--gold)", fontSize: 11, cursor: state === "loading" ? "not-allowed" : "pointer",
        transition: "all 0.2s",
      }}
    >
      {state === "loading" ? "…" : "Relancer"}
    </button>
  );
}
