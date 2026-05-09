"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--dark)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image src="/logo.png" alt="Aumentia" width={56} height={56} style={{ objectFit: "contain" }} />
          <p style={{ color: "var(--gray)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>
            Espace Admin
          </p>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Connexion</h1>
          <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 28 }}>
            Accès réservé à l&apos;équipe Aumentia.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{
                  width: "100%", padding: "12px 14px", background: "var(--dark)",
                  border: "1px solid var(--dark-border)", borderRadius: 8,
                  color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--cyan)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: "100%", padding: "12px 14px", background: "var(--dark)",
                  border: "1px solid var(--dark-border)", borderRadius: 8,
                  color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--cyan)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")}
              />
            </div>

            {error && (
              <p style={{ color: "#EF4444", fontSize: 14, marginBottom: 16, padding: "10px 14px", background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 24px",
                background: loading ? "var(--dark-border)" : "var(--cyan)",
                color: loading ? "var(--gray)" : "var(--dark)",
                border: "none", borderRadius: 8, fontWeight: 700,
                fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Connexion…" : "Se connecter →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
