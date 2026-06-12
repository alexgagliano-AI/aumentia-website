import Anthropic from "@anthropic-ai/sdk";
import { PILLAR_LABELS, BENCHMARKS, type DiagnosticScores } from "./scoring";
import { ROLE_LABELS, type Role } from "./questions";
import type { Lang } from "./i18n-diagnostic";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface RespondentData {
  name: string;
  role: Role;
  responses: { question_id: string; answer: string | null; score: number | null }[];
}

interface ReportInput {
  company: {
    name: string;
    industry?: string;
    size?: string;
    country?: string;
  };
  scores: DiagnosticScores;
  respondents: RespondentData[];
  respondentCount: number;
  totalInvited: number;
  language?: Lang;
}

// ─── Localised prompt templates ────────────────────────────────────────────
const PROMPT_TEMPLATES: Record<Lang, (
  companyName: string,
  industry: string,
  size: string,
  country: string,
  respondentCount: number,
  totalInvited: number,
  pct: number,
  pillarSection: string,
  overall: number,
  aiReadiness: number,
  responseSummary: string,
) => string> = {
  fr: (cn, industry, size, country, rc, ti, pct, pillars, overall, air, verbatims) => `
Tu es un expert en stratégie IA pour les entreprises, travaillant pour Aumentia (cabinet de conseil IA + Scaling Up).
Rédige le rapport ENTIÈREMENT EN FRANÇAIS. Tous les titres, sections et contenus doivent être en français.
Le rapport concerne la société "${cn}".

DONNÉES DE L'ENTREPRISE :
- Secteur : ${industry}
- Taille : ${size}
- Pays : ${country}
- Répondants : ${rc}/${ti} (${pct}% de participation)

SCORES PAR PILIER :
${pillars}
- Score global de maturité IA : ${overall}/100
- Score de préparation IA : ${air}/100

VERBATIMS ET RÉPONSES :
${verbatims}

---

Génère un rapport structuré. Structure EXACTE à respecter (tous les titres en français) :

# Diagnostic IA Stratégique — ${cn}
*Rapport confidentiel — Aumentia*

## 1. Résumé Exécutif
[3-4 paragraphes synthétisant les constats clés, le niveau de maturité, et les 3 opportunités majeures]

## 2. Diagnostic Global
### 2.1 Leadership & Vision (score : X/100)
[Forces, faiblesses, risques, opportunités IA]
### 2.2 Stratégie (score : X/100)
[Analyse]
### 2.3 Exécution (score : X/100)
[Focus processus, temps perdus, frictions]
### 2.4 Vente & Marketing (score : X/100)
[Focus CRM, prospection, automatisation commerciale]
### 2.5 RH & Talents (score : X/100)
[Recrutement, onboarding, performance]
### 2.6 Finance & Data (score : X/100)
[Reporting, prévisionnel, automatisation financière]

## 3. Carte des Opportunités IA
[10 opportunités IA concrètes classées par ROI potentiel — description, impact estimé, effort, timeline, outils]

## 4. Quick Wins — 30 jours
[5-7 actions concrètes exécutables immédiatement sans budget majeur]

## 5. Plan IA 90 jours
[3 sprints avec objectifs, actions et responsables]

## 6. Vision IA 12 mois
[Transformation attendue, KPIs cibles, architecture IA recommandée]

## 7. Budget & ROI Estimé
[3 scénarios : Lean / Standard / Ambition avec investissement estimé et ROI 12 mois]

## 8. Prochaines Étapes
[Recommandations concrètes pour démarrer avec Aumentia]

---
Ton stratégique et humain. Cite des verbatims concrets. Sois précis sur les montants, délais et gains. Lisible par un CODIR.`,

  en: (cn, industry, size, country, rc, ti, pct, pillars, overall, air, verbatims) => `
You are an AI strategy expert working for Aumentia (AI consulting + Scaling Up firm).
Write the ENTIRE report IN ENGLISH. All titles, sections and content must be in English.
The report is about the company "${cn}".

COMPANY DATA:
- Industry: ${industry}
- Size: ${size}
- Country: ${country}
- Respondents: ${rc}/${ti} (${pct}% participation rate)

SCORES BY PILLAR:
${pillars}
- Overall AI maturity score: ${overall}/100
- AI readiness score: ${air}/100

VERBATIMS AND RESPONSES:
${verbatims}

---

Generate a structured report. EXACT structure to follow (all headings in English):

# Strategic AI Diagnostic — ${cn}
*Confidential Report — Aumentia*

## 1. Executive Summary
[3-4 paragraphs summarizing key findings, maturity level, and the 3 major opportunities]

## 2. Global Diagnostic
### 2.1 Leadership & Vision (score: X/100)
[Strengths, weaknesses, risks, AI-specific opportunities]
### 2.2 Strategy (score: X/100)
[Analysis]
### 2.3 Execution (score: X/100)
[Focus on processes, time losses, identified frictions]
### 2.4 Sales & Marketing (score: X/100)
[Focus on CRM, prospecting, sales automation]
### 2.5 HR & Talent (score: X/100)
[Recruitment, onboarding, performance]
### 2.6 Finance & Data (score: X/100)
[Reporting, forecasting, financial automation]

## 3. AI Opportunity Map
[10 concrete AI opportunities ranked by ROI potential — description, estimated impact, effort, timeline, suggested tools]

## 4. Quick Wins — 30 Days
[5-7 concrete actions executable immediately with no major budget]

## 5. 90-Day AI Plan
[3 sprints with objectives, actions and suggested owners]

## 6. 12-Month AI Vision
[Expected transformation, target KPIs, recommended AI architecture]

## 7. Budget & Estimated ROI
[3 scenarios: Lean / Standard / Ambition with estimated investment and 12-month ROI]

## 8. Next Steps
[Concrete recommendations for getting started with Aumentia]

---
Strategic yet human tone. Quote concrete verbatims. Be precise about amounts, timelines and gains. Must be readable by a leadership team.`,

  it: (cn, industry, size, country, rc, ti, pct, pillars, overall, air, verbatims) => `
Sei un esperto di strategia IA per le aziende, che lavora per Aumentia (società di consulenza IA + Scaling Up).
Scrivi l'INTERO report IN ITALIANO. Tutti i titoli, le sezioni e i contenuti devono essere in italiano.
Il report riguarda la società "${cn}".

DATI AZIENDALI:
- Settore: ${industry}
- Dimensione: ${size}
- Paese: ${country}
- Rispondenti: ${rc}/${ti} (${pct}% di partecipazione)

PUNTEGGI PER PILASTRO:
${pillars}
- Punteggio globale di maturità IA: ${overall}/100
- Punteggio di readiness IA: ${air}/100

VERBATIM E RISPOSTE:
${verbatims}

---

Genera un report strutturato. Struttura ESATTA da rispettare (tutti i titoli in italiano):

# Diagnostico IA Strategico — ${cn}
*Report Riservato — Aumentia*

## 1. Sintesi Esecutiva
[3-4 paragrafi che sintetizzano i risultati chiave, il livello di maturità e le 3 opportunità principali]

## 2. Diagnostico Globale
### 2.1 Leadership & Visione (punteggio: X/100)
[Punti di forza, debolezze, rischi, opportunità IA specifiche]
### 2.2 Strategia (punteggio: X/100)
[Analisi]
### 2.3 Esecuzione (punteggio: X/100)
[Focus su processi, tempi persi, frizioni identificate]
### 2.4 Vendite & Marketing (punteggio: X/100)
[Focus su CRM, prospecting, automazione commerciale]
### 2.5 HR & Talenti (punteggio: X/100)
[Reclutamento, onboarding, performance]
### 2.6 Finanza & Dati (punteggio: X/100)
[Reporting, previsionale, automazione finanziaria]

## 3. Mappa delle Opportunità IA
[10 opportunità IA concrete classificate per ROI potenziale — descrizione, impatto stimato, sforzo, timeline, strumenti suggeriti]

## 4. Quick Wins — 30 giorni
[5-7 azioni concrete eseguibili immediatamente senza budget significativo]

## 5. Piano IA 90 giorni
[3 sprint con obiettivi, azioni e responsabili suggeriti]

## 6. Visione IA 12 mesi
[Trasformazione attesa, KPI target, architettura IA raccomandata]

## 7. Budget & ROI Stimato
[3 scenari: Lean / Standard / Ambizione con investimento stimato e ROI a 12 mesi]

## 8. Prossimi Passi
[Raccomandazioni concrete per iniziare con Aumentia]

---
Tono strategico e umano. Cita verbatim concreti. Sii preciso su importi, tempi e guadagni. Leggibile da un comitato di direzione.`,
};

export async function generateReport(input: ReportInput): Promise<string> {
  const { company, scores, respondents, respondentCount, totalInvited, language = "fr" } = input;

  const responseSummary = respondents.map((r) => {
    const textAnswers = r.responses
      .filter((res) => res.answer && !res.score)
      .map((res) => `  Q[${res.question_id}]: ${res.answer}`)
      .join("\n");
    const scaleAnswers = r.responses
      .filter((res) => res.score !== null)
      .map((res) => `  Q[${res.question_id}]: ${res.score}/5`)
      .join("\n");
    return `### ${r.name} — ${ROLE_LABELS[r.role]}\n${textAnswers}\n${scaleAnswers}`;
  }).join("\n\n");

  const pillarSection = scores.pillars
    .map((p) => `- ${p.label}: ${p.score}/100 (benchmark: ${BENCHMARKS[p.pillar]}/100)`)
    .join("\n");

  const pct = totalInvited > 0 ? Math.round((respondentCount / totalInvited) * 100) : 0;
  const industry = company.industry || (language === "en" ? "Not specified" : language === "it" ? "Non specificato" : "Non précisé");
  const size = company.size || (language === "en" ? "Not specified" : language === "it" ? "Non specificata" : "Non précisée");
  const country = company.country || "Belgique";

  const template = PROMPT_TEMPLATES[language] ?? PROMPT_TEMPLATES.fr;
  const prompt = template(
    company.name, industry, size, country,
    respondentCount, totalInvited, pct,
    pillarSection, scores.overall, scores.aiReadiness,
    responseSummary,
  );

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type from Claude");
  return content.text;
}
