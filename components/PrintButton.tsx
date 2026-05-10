"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        padding: "11px 24px",
        background: "#00d4c8",
        color: "#0a0f1e",
        border: "none",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      🖨️ Imprimer / Exporter PDF
    </button>
  );
}
