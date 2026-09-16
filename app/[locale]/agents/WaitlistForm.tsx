"use client";

import { useState } from "react";

export default function WaitlistForm({ t }: { t: { title: string; placeholder: string; submit: string; success: string } }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "12px 0", color: "var(--cyan)", fontWeight: 600, fontSize: 14 }}>
        ✓ {t.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t.placeholder}
        required
        style={{
          flex: 1, padding: "10px 14px", borderRadius: 10,
          background: "var(--dark)", border: "1px solid var(--dark-border)",
          color: "#fff", fontSize: 13, outline: "none",
        }}
      />
      <button type="submit" className="btn-primary" style={{ padding: "10px 16px", fontSize: 13, whiteSpace: "nowrap" }}>
        {t.submit}
      </button>
    </form>
  );
}
