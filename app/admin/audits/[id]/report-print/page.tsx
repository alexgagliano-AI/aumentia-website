import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { calculateScores, getMaturityLevelI18n, BENCHMARKS, PILLAR_LABELS_I18N } from "@/lib/scoring";
import type { Pillar } from "@/lib/scoring";
import PrintButton from "@/components/PrintButton";
import type { ReactNode } from "react";

// ─── Inline markdown parser ───────────────────────────────────────────────────
function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const m = match[0];
    if (m.startsWith("**")) parts.push(<strong key={idx++}>{m.slice(2, -2)}</strong>);
    else parts.push(<em key={idx++}>{m.slice(1, -1)}</em>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Block markdown renderer ──────────────────────────────────────────────────
function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split("\n");
  const result: ReactNode[] = [];
  let i = 0;
  let listBuffer: string[] = [];
  let k = 0;
  const nextKey = () => k++;

  function flushList() {
    if (listBuffer.length === 0) return;
    result.push(
      <ul key={nextKey()} style={{ paddingLeft: 20, margin: "8px 0 16px" }}>
        {listBuffer.map((item, j) => (
          <li key={j} style={{ fontSize: 13, lineHeight: 1.8, color: "#333", marginBottom: 4 }}>
            {parseInline(item)}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.trimStart().startsWith("|")) {
      flushList();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const isSeparator = (l: string) => /^\|[\s\-|:]+\|$/.test(l.trim());
      const contentLines = tableLines.filter((l) => !isSeparator(l));
      if (contentLines.length >= 1) {
        const headers = contentLines[0].split("|").map((c) => c.trim()).filter(Boolean);
        const rows = contentLines.slice(1).map((row) =>
          row.split("|").map((c) => c.trim()).filter(Boolean)
        );
        result.push(
          <div key={nextKey()} style={{ overflowX: "auto", margin: "20px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {headers.map((h, j) => (
                    <th key={j} style={{
                      background: "#0a0f1e", color: "#fff",
                      padding: "10px 14px", textAlign: "left",
                      fontWeight: 700, fontSize: 12,
                      borderRight: "1px solid #1e293b",
                    }}>
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, j) => (
                  <tr key={j} style={{ background: j % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    {row.map((cell, kk) => (
                      <td key={kk} style={{
                        padding: "9px 14px",
                        borderBottom: "1px solid #e5e7eb",
                        borderRight: "1px solid #e5e7eb",
                        color: "#333", verticalAlign: "top",
                      }}>
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // List item
    if (line.startsWith("- ") || line.startsWith("• ")) {
      listBuffer.push(line.slice(2));
      i++;
      continue;
    }

    flushList();

    if (line.startsWith("# ")) {
      result.push(
        <h1 key={nextKey()} style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", color: "#0a0f1e", margin: "36px 0 10px", borderBottom: "3px solid #00d4c8", paddingBottom: 8 }}>
          {parseInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      result.push(
        <h2 key={nextKey()} style={{ fontSize: 17, fontWeight: 800, color: "#0a0f1e", margin: "32px 0 8px", paddingTop: 8 }}>
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      result.push(
        <h3 key={nextKey()} style={{ fontSize: 11, fontWeight: 800, color: "#00d4c8", margin: "20px 0 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line === "---") {
      result.push(<hr key={nextKey()} style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "28px 0" }} />);
    } else if (line.startsWith("> ")) {
      result.push(
        <blockquote key={nextKey()} style={{ borderLeft: "3px solid #00d4c8", margin: "16px 0", padding: "10px 18px", background: "#f0fffe", color: "#555", fontSize: 13, lineHeight: 1.7 }}>
          {parseInline(line.slice(2))}
        </blockquote>
      );
    } else if (line === "") {
      result.push(<div key={nextKey()} style={{ height: 10 }} />);
    } else {
      result.push(
        <p key={nextKey()} style={{ fontSize: 13, lineHeight: 1.85, color: "#333", margin: "3px 0" }}>
          {parseInline(line)}
        </p>
      );
    }
    i++;
  }
  flushList();
  return result;
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function ReportPrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: audit } = await supabase
    .from("audits")
    .select("*, companies (*)")
    .eq("id", id)
    .single();

  if (!audit || !audit.report_content) notFound();

  const company = audit.companies as { name: string; industry?: string; size?: string; country?: string } | null;

  const { data: allResponses } = await supabase
    .from("responses")
    .select("question_id, answer, score")
    .eq("audit_id", id);

  const { data: allRespondents } = await supabase
    .from("respondents")
    .select("status")
    .eq("audit_id", id);

  const lang = ((audit as { language?: string }).language ?? "fr") as string;
  const PILLAR_LABELS = PILLAR_LABELS_I18N[lang] ?? PILLAR_LABELS_I18N.fr;
  const scores = calculateScores(allResponses ?? []);
  const maturity = getMaturityLevelI18n(scores.overall, lang);
  const completedCount = allRespondents?.filter((r) => r.status === "completed").length ?? 0;
  const totalCount = allRespondents?.length ?? 0;
  const dateLocale = lang === "en" ? "en-GB" : lang === "it" ? "it-IT" : "fr-BE";
  const today = new Date().toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" });

  const T = {
    fr: {
      confidential: "CONFIDENTIEL",
      coverTitle: "DIAGNOSTIC IA STRATÉGIQUE",
      scoreLabel: "Score de Maturité IA",
      generatedOn: "Rapport généré le",
      participation: "Participation",
      respondents: "répondants",
      preparedBy: "Préparé par",
      ceoSectionTitle: "MOT DU CEO",
      ceoCity: "Bruxelles",
      ceoSalutation: "Madame, Monsieur,",
      ceoPara1: "Vous avez accepté de partager avec nous le fonctionnement interne de votre entreprise. C'est un geste de confiance que nous prenons très au sérieux, et que nous honorons en vous remettant ce rapport avec toute la rigueur et la précision qu'il mérite.",
      ceoPara2: "Ce diagnostic n'est pas un rapport générique. Il est construit à partir des verbatims réels de vos équipes, analysés par notre intelligence artificielle formée aux méthodologies Aumentia et aux meilleures pratiques en transformation IA des PME européennes. Chaque recommandation est ancrée dans votre réalité opérationnelle.",
      ceoPara3: "L'IA ne transforme pas les entreprises. Ce sont les dirigeants qui le font — avec les bons outils, la bonne vision et le bon accompagnement. Ce rapport est conçu pour vous donner ces trois éléments : une vision claire de votre maturité IA actuelle, une carte précise des opportunités à saisir, et un plan d'action concret pour les 12 prochains mois.",
      ceoPara4: "Ce rapport est votre point de départ. La suite, c'est ensemble que nous l'écrirons.",
      ceoClosing: "Bonne lecture,",
      overviewLabel: "VUE D'ENSEMBLE",
      dashboardTitle: "Tableau de Bord des Scores",
      globalScore: "Score Global",
      aiScore: "Score IA",
      aiReadiness: "Préparation IA",
      participationLabel: "Participation",
      respondentsCompleted: "répondants ont complété",
      statusStrong: "Force",
      statusImprove: "A renforcer",
      statusCritical: "Priorité critique",
      benchmarkLabel: "Moy. belge",
      maturityGridTitle: "Grille de Maturité IA — Aumentia",
      maturityLevels: [
        { range: "0–40", label: "Précurseur", desc: "Transformation urgente nécessaire" },
        { range: "41–60", label: "Émergent", desc: "Bases à consolider rapidement" },
        { range: "61–75", label: "En Marche", desc: "Accélération et déploiement possible" },
        { range: "76–100", label: "Avancé", desc: "Leadership IA sectoriel" },
      ],
      benchmarkNote: "▎ Marqueur vertical = benchmark moyen des PME belges (source: Aumentia Research 2025)",
      footerTitle: "Diagnostic IA Stratégique",
      footerConfidential: "Confidentiel",
      backButton: "← Retour",
      pdfHint: "Dans la fenêtre d'impression → décochez \"En-têtes et pieds de page\"",
      pdfLabel: "Rapport PDF",
    },
    en: {
      confidential: "CONFIDENTIAL",
      coverTitle: "STRATEGIC AI DIAGNOSTIC",
      scoreLabel: "AI Maturity Score",
      generatedOn: "Report generated on",
      participation: "Participation",
      respondents: "respondents",
      preparedBy: "Prepared by",
      ceoSectionTitle: "CEO MESSAGE",
      ceoCity: "Brussels",
      ceoSalutation: "Dear Sir or Madam,",
      ceoPara1: "You have chosen to share with us the inner workings of your organization. This is a gesture of trust that we take very seriously, and that we honor by delivering this report with all the rigor and precision it deserves.",
      ceoPara2: "This diagnostic is not a generic report. It is built from the real verbatims of your teams, analyzed by our artificial intelligence trained on Aumentia methodologies and the best practices in AI transformation for European SMEs. Every recommendation is grounded in your operational reality.",
      ceoPara3: "AI does not transform companies. Leaders do — with the right tools, the right vision, and the right support. This report is designed to give you all three: a clear view of your current AI maturity, a precise map of the opportunities to seize, and a concrete action plan for the next 12 months.",
      ceoPara4: "This report is your starting point. What comes next, we will write together.",
      ceoClosing: "Yours sincerely,",
      overviewLabel: "OVERVIEW",
      dashboardTitle: "Score Dashboard",
      globalScore: "Global Score",
      aiScore: "AI Score",
      aiReadiness: "AI Readiness",
      participationLabel: "Participation",
      respondentsCompleted: "respondents completed",
      statusStrong: "Strength",
      statusImprove: "To improve",
      statusCritical: "Critical priority",
      benchmarkLabel: "EU avg.",
      maturityGridTitle: "AI Maturity Grid — Aumentia",
      maturityLevels: [
        { range: "0–40", label: "Beginner", desc: "Urgent transformation required" },
        { range: "41–60", label: "Emerging", desc: "Foundations to consolidate quickly" },
        { range: "61–75", label: "Progressing", desc: "Acceleration and deployment possible" },
        { range: "76–100", label: "Advanced", desc: "Sector AI leadership" },
      ],
      benchmarkNote: "▎ Vertical marker = average benchmark for European SMEs (source: Aumentia Research 2025)",
      footerTitle: "Strategic AI Diagnostic",
      footerConfidential: "Confidential",
      backButton: "← Back",
      pdfHint: "In the print dialog → uncheck \"Headers and footers\"",
      pdfLabel: "PDF Report",
    },
    it: {
      confidential: "RISERVATO",
      coverTitle: "DIAGNOSTICO IA STRATEGICO",
      scoreLabel: "Punteggio Maturità IA",
      generatedOn: "Report generato il",
      participation: "Partecipazione",
      respondents: "rispondenti",
      preparedBy: "Preparato da",
      ceoSectionTitle: "MESSAGGIO DEL CEO",
      ceoCity: "Bruxelles",
      ceoSalutation: "Gentili Signore e Signori,",
      ceoPara1: "Avete scelto di condividere con noi il funzionamento interno della vostra organizzazione. È un gesto di fiducia che prendiamo molto sul serio e che onoriamo consegnandovi questo rapporto con tutto il rigore e la precisione che merita.",
      ceoPara2: "Questa diagnosi non è un rapporto generico. È costruita a partire dai verbatim reali dei vostri team, analizzati dalla nostra intelligenza artificiale formata sulle metodologie Aumentia e sulle migliori pratiche nella trasformazione IA delle PMI europee. Ogni raccomandazione è radicata nella vostra realtà operativa.",
      ceoPara3: "L'IA non trasforma le aziende. Lo fanno i leader — con gli strumenti giusti, la visione giusta e il giusto supporto. Questo rapporto è progettato per darvi tutti e tre: una visione chiara della vostra maturità IA attuale, una mappa precisa delle opportunità da cogliere e un piano d'azione concreto per i prossimi 12 mesi.",
      ceoPara4: "Questo rapporto è il vostro punto di partenza. Il seguito, lo scriveremo insieme.",
      ceoClosing: "Cordiali saluti,",
      overviewLabel: "PANORAMICA",
      dashboardTitle: "Dashboard dei Punteggi",
      globalScore: "Punteggio Globale",
      aiScore: "Punteggio IA",
      aiReadiness: "Readiness IA",
      participationLabel: "Partecipazione",
      respondentsCompleted: "rispondenti hanno completato",
      statusStrong: "Punto di forza",
      statusImprove: "Da migliorare",
      statusCritical: "Priorità critica",
      benchmarkLabel: "Media EU",
      maturityGridTitle: "Griglia di Maturità IA — Aumentia",
      maturityLevels: [
        { range: "0–40", label: "Principiante", desc: "Trasformazione urgente necessaria" },
        { range: "41–60", label: "Emergente", desc: "Basi da consolidare rapidamente" },
        { range: "61–75", label: "In Progresso", desc: "Accelerazione e deployment possibile" },
        { range: "76–100", label: "Avanzato", desc: "Leadership IA settoriale" },
      ],
      benchmarkNote: "▎ Marcatore verticale = benchmark medio PMI europee (fonte: Aumentia Research 2025)",
      footerTitle: "Diagnostico IA Strategico",
      footerConfidential: "Riservato",
      backButton: "← Indietro",
      pdfHint: "Nella finestra di stampa → deseleziona \"Intestazioni e piè di pagina\"",
      pdfLabel: "Report PDF",
    },
  } as const;
  const t = T[lang as keyof typeof T] ?? T.fr;

  const CYAN = "#00d4c8";
  const DARK = "#0a0f1e";

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          background: #e8e8e8;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        @page { size: A4; margin: 0; }
        @media print {
          body { background: white; }
          .no-print { display: none !important; }
          .page { box-shadow: none !important; margin: 0 !important; width: 100% !important; }
          .report-footer {
            position: fixed; bottom: 12mm; left: 20mm; right: 20mm;
            display: flex !important; justify-content: space-between; align-items: center;
            font-size: 9px; color: #aaa; border-top: 1px solid #e5e7eb; padding-top: 6px;
          }
        }
        @media screen {
          .page { box-shadow: 0 4px 24px rgba(0,0,0,0.18); margin: 24px auto; }
          .report-footer { display: none; }
        }
        .page { width: 210mm; min-height: 297mm; background: white; position: relative; }
        .page-break { page-break-before: always; break-before: page; }
        strong { font-weight: 700; }
        em { font-style: italic; }
        table { border-spacing: 0; }
      `}</style>

      {/* ── Screen toolbar ── */}
      <div className="no-print" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: DARK, padding: "12px 24px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}>
        <a href={`/admin/audits/${id}`} style={{
          padding: "9px 16px", background: "rgba(255,255,255,0.08)",
          color: "#fff", borderRadius: 8, fontSize: 13, textDecoration: "none", fontWeight: 500,
        }}>{t.backButton}</a>
        <div style={{ flex: 1, textAlign: "center", color: "#8892b0", fontSize: 13 }}>
          {t.pdfLabel} — {company?.name}
          <span style={{ marginLeft: 12, fontSize: 11, color: "#556", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 4 }}>
            {t.pdfHint}
          </span>
        </div>
        <PrintButton />
      </div>
      <div className="no-print" style={{ height: 56 }} />

      {/* ═══════════════════════════════════════════════════════════════
          PAGE 1 — COUVERTURE
      ════════════════════════════════════════════════════════════════ */}
      <div className="page" style={{
        background: DARK, color: "#fff",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
      }}>
        {/* Logo + badge confidentiel */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 40, height: 40, background: CYAN, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 20, color: DARK, letterSpacing: "-0.02em",
            }}>A</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: CYAN, letterSpacing: "0.18em" }}>AUMENTIA</div>
              <div style={{ fontSize: 10, color: "#8892b0", letterSpacing: "0.1em", textTransform: "uppercase" }}>Intelligence Artificielle</div>
            </div>
          </div>
          <div style={{
            padding: "5px 16px", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 100, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.18em", color: "#8892b0", textTransform: "uppercase",
          }}>
            {t.confidential}
          </div>
        </div>

        {/* Titre central */}
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 28 }}>
            {t.coverTitle}
          </div>
          <div style={{
            fontSize: 54, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.02,
            marginBottom: 20,
          }}>
            {company?.name}
          </div>
          <div style={{ width: 64, height: 3, background: CYAN, margin: "0 auto 20px" }} />
          <div style={{ color: "#8892b0", fontSize: 14, lineHeight: 1.6 }}>
            {[company?.industry, company?.size, company?.country ?? "Belgium"].filter(Boolean).join(" · ")}
          </div>
        </div>

        {/* Score global */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{
            display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10,
            padding: "28px 56px",
            border: "1px solid rgba(0,212,200,0.25)", borderRadius: 20,
            background: "rgba(0,212,200,0.04)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#8892b0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {t.scoreLabel}
            </div>
            <div style={{ fontSize: 72, fontWeight: 900, color: CYAN, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {scores.overall}
              <span style={{ fontSize: 28, fontWeight: 400, color: "#8892b0" }}>/100</span>
            </div>
            <div style={{
              padding: "5px 18px",
              background: `${maturity.color}18`,
              border: `1px solid ${maturity.color}`,
              borderRadius: 100, color: maturity.color, fontSize: 13, fontWeight: 700,
            }}>
              {maturity.level}
            </div>
          </div>
        </div>

        {/* Pied de couverture */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#8892b0", marginBottom: 3 }}>{t.generatedOn}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{today}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#8892b0", marginBottom: 3 }}>{t.participation}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{completedCount}/{totalCount} {t.respondents}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#8892b0", marginBottom: 3 }}>{t.preparedBy}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Alexandre Gagliano</div>
            <div style={{ fontSize: 12, color: CYAN }}>Founder & CEO, Aumentia</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PAGE 2 — MOT DU CEO
      ════════════════════════════════════════════════════════════════ */}
      <div className="page page-break" style={{ padding: "0 0 32px" }}>
        {/* Bande couleur top */}
        <div style={{ height: 5, background: `linear-gradient(90deg, ${CYAN}, ${DARK})` }} />
        <div style={{ padding: "44px 64px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 36 }}>
            {t.ceoSectionTitle}
          </div>

          <div style={{ fontSize: 12, color: "#888", marginBottom: 32, lineHeight: 1.6 }}>
            {t.ceoCity}, {today}
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#1a1a2e", marginBottom: 24 }}>{t.ceoSalutation}</p>

          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#333", marginBottom: 20 }}>
            {t.ceoPara1}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#333", marginBottom: 20 }}>
            {t.ceoPara2}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#333", marginBottom: 20 }}>
            {t.ceoPara3}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#333", marginBottom: 40 }}>
            {t.ceoPara4}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#1a1a2e", marginBottom: 36 }}>{t.ceoClosing}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
            <div style={{
              width: 52, height: 52, background: CYAN, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 18, color: DARK, flexShrink: 0, letterSpacing: "-0.02em",
            }}>AG</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>Alexandre Gagliano</div>
              <div style={{ fontSize: 13, color: CYAN, fontWeight: 600, marginBottom: 2 }}>Founder & CEO, Aumentia</div>
              <div style={{ fontSize: 12, color: "#888" }}>alexandre@aumentia.ai · aumentia.ai</div>
            </div>
          </div>
        </div>

        <div className="report-footer">
          <span>AUMENTIA — {t.footerTitle} — {company?.name}</span>
          <span>{t.footerConfidential} · {today}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PAGE 3 — TABLEAU DE BORD DES SCORES
      ════════════════════════════════════════════════════════════════ */}
      <div className="page page-break" style={{ padding: "0 0 32px" }}>
        <div style={{ height: 5, background: `linear-gradient(90deg, ${CYAN}, ${DARK})` }} />
        <div style={{ padding: "44px 64px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: CYAN, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            {t.overviewLabel}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 36, color: "#1a1a2e" }}>
            {t.dashboardTitle}
          </h2>

          {/* Métriques globales */}
          <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
            <div style={{ flex: "0 0 180px", padding: "22px 20px", background: DARK, borderRadius: 14, textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: CYAN, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{t.globalScore}</div>
              <div style={{ fontSize: 52, fontWeight: 900, color: CYAN, lineHeight: 1, letterSpacing: "-0.03em" }}>{scores.overall}</div>
              <div style={{ fontSize: 14, color: "#8892b0", marginBottom: 10 }}>/100</div>
              <div style={{ display: "inline-block", padding: "4px 14px", background: `${maturity.color}20`, border: `1px solid ${maturity.color}`, borderRadius: 100, color: maturity.color, fontSize: 11, fontWeight: 700 }}>
                {maturity.level}
              </div>
            </div>
            <div style={{ flex: "0 0 160px", padding: "22px 20px", background: "#f8f9fa", borderRadius: 14, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{t.aiScore}</div>
              <div style={{ fontSize: 52, fontWeight: 900, color: "#1a1a2e", lineHeight: 1, letterSpacing: "-0.03em" }}>{scores.aiReadiness}</div>
              <div style={{ fontSize: 14, color: "#888", marginBottom: 10 }}>/100</div>
              <div style={{ fontSize: 12, color: "#666" }}>{t.aiReadiness}</div>
            </div>
            <div style={{ flex: 1, padding: "22px 24px", background: "#f8f9fa", borderRadius: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{t.participationLabel}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#1a1a2e", lineHeight: 1, marginBottom: 6 }}>
                {completedCount}<span style={{ fontSize: 20, fontWeight: 400, color: "#888" }}>/{totalCount}</span>
              </div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>{t.respondentsCompleted}</div>
              <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", background: CYAN, borderRadius: 4, width: `${Math.round((completedCount / totalCount) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Scores par pilier */}
          <div style={{ marginBottom: 32 }}>
            {scores.pillars.map((p) => {
              const benchmark = BENCHMARKS[p.pillar as Pillar];
              const diff = p.score - benchmark;
              const barColor = p.score >= 65 ? "#10B981" : p.score >= 45 ? "#f59e0b" : "#ef4444";
              const statusLabel = p.score >= 65 ? t.statusStrong : p.score >= 45 ? t.statusImprove : t.statusCritical;
              return (
                <div key={p.pillar} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{PILLAR_LABELS[p.pillar as Pillar]}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: 11, color: "#888" }}>{t.benchmarkLabel}: {benchmark}</span>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", minWidth: 48, textAlign: "right" }}>{p.score}/100</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: diff >= 0 ? "#10B981" : "#ef4444", minWidth: 36, textAlign: "right" }}>
                        {diff >= 0 ? "+" : ""}{diff}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, minWidth: 100, textAlign: "center",
                        background: `${barColor}15`, color: barColor, border: `1px solid ${barColor}40`,
                      }}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                  <div style={{ position: "relative", height: 10, background: "#e5e7eb", borderRadius: 5, overflow: "visible" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 5, width: `${p.score}%`, background: barColor, transition: "width 0.5s" }} />
                    <div style={{ position: "absolute", top: -3, height: 16, width: 2, background: "#999", borderRadius: 1, left: `${benchmark}%` }} />
                  </div>
                </div>
              );
            })}
            <div style={{ fontSize: 10, color: "#aaa", marginTop: 8 }}>
              {t.benchmarkNote}
            </div>
          </div>

          {/* Légende maturité */}
          <div style={{ padding: 18, background: "#f8f9fa", borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              {t.maturityGridTitle}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { ...t.maturityLevels[0], color: "#ef4444" },
                { ...t.maturityLevels[1], color: "#f59e0b" },
                { ...t.maturityLevels[2], color: "#3b82f6" },
                { ...t.maturityLevels[3], color: "#10B981" },
              ].map((m) => (
                <div key={m.range} style={{ flex: 1, padding: "10px 14px", background: "#fff", borderRadius: 8, borderLeft: `3px solid ${m.color}`, border: `1px solid ${m.color}30`, borderLeftWidth: 3, borderLeftColor: m.color }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: m.color }}>{m.range}/100</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: "#888", lineHeight: 1.4 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="report-footer">
          <span>AUMENTIA — {t.footerTitle} — {company?.name}</span>
          <span>{t.footerConfidential} · {today}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PAGES 4+ — CONTENU DU RAPPORT
      ════════════════════════════════════════════════════════════════ */}
      <div className="page page-break" style={{ padding: "0 0 48px" }}>
        <div style={{ height: 5, background: `linear-gradient(90deg, ${CYAN}, ${DARK})` }} />
        <div style={{ padding: "44px 64px 0", fontFamily: "-apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
          {renderMarkdown(audit.report_content)}
        </div>

        <div className="report-footer">
          <span>AUMENTIA — {t.footerTitle} — {company?.name}</span>
          <span>{t.footerConfidential} · {today}</span>
        </div>
      </div>
    </>
  );
}
