"use client";

import { useState } from "react";

interface Props {
  content: string;
  companyName: string;
  generatedAt: string | null;
  auditId: string;
}

export default function ReportViewer({ content, companyName, generatedAt, auditId }: Props) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Convert markdown-like text to HTML for display
  function renderContent(text: string) {
    return text
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: 26, fontWeight: 900, marginTop: 32, marginBottom: 8, color: "#fff", letterSpacing: "-0.02em" }}>{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 20, fontWeight: 800, marginTop: 28, marginBottom: 6, color: "#fff" }}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 4, color: "var(--cyan)" }}>{line.slice(4)}</h3>;
        if (line.startsWith("- ")) return <li key={i} style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, marginBottom: 4 }}>{line.slice(2)}</li>;
        if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, color: "#fff", fontSize: 14, margin: "8px 0" }}>{line.slice(2, -2)}</p>;
        if (line === "---") return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--dark-border)", margin: "24px 0" }} />;
        if (line === "") return <div key={i} style={{ height: 8 }} />;
        return <p key={i} style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7, margin: "4px 0" }}>{line}</p>;
      });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Rapport généré</h2>
          {generatedAt && (
            <p style={{ color: "var(--gray-light)", fontSize: 12, margin: 0 }}>
              Généré le {new Date(generatedAt).toLocaleDateString("fr-BE", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a
            href={`/admin/audits/${auditId}/report-print`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px", background: "var(--cyan)", color: "var(--dark)",
              borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            🖨️ Rapport PDF
          </a>
          <button
            onClick={copyToClipboard}
            style={{
              padding: "8px 16px", background: "transparent",
              border: "1px solid var(--dark-border)", borderRadius: 8,
              color: copied ? "#10B981" : "var(--gray-light)", fontSize: 12, cursor: "pointer",
            }}
          >
            {copied ? "✓ Copié !" : "📋 Copier"}
          </button>
        </div>
      </div>
      <div
        className="card"
        style={{ padding: 36, maxHeight: 600, overflowY: "auto" }}
        id="report-content"
      >
        {renderContent(content)}
      </div>

      <style>{`
        @media print {
          nav, .card:not(#report-content), button { display: none !important; }
          #report-content {
            max-height: none !important;
            border: none !important;
            padding: 0 !important;
            background: #fff !important;
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
}
