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

export async function generateReport(input: ReportInput): Promise<string> {
  const { company, scores, respondents, respondentCount, totalInvited, language = "fr" } = input;

  // Build a structured summary of all responses for the prompt
  const responseSummary = respondents.map((r) => {
    const textAnswers = r.responses
      .filter((res) => res.answer && !res.score)
      .map((res) => `  Q[${res.question_id}]: ${res.answer}`)
      .join("\n");
    const scaleAnswers = r.responses
      .filter((res) => res.score !== null)
      .map((res) => `  Q[${res.question_id}]: ${res.score}/5`)
      .join("\n");
    return `### ${r.name} — ${ROLE_LABELS[r.role]}\nText answers:\n${textAnswers}\nScores:\n${scaleAnswers}`;
  }).join("\n\n");

  const pillarSection = scores.pillars
    .map((p) => `- ${p.label}: ${p.score}/100 (benchmark belge: ${BENCHMARKS[p.pillar]}/100)`)
    .join("\n");

  const langInstruction = language === "en"
    ? "You must write the entire report in English."
    : language === "it"
    ? "Devi scrivere l'intero report in italiano."
    : "Tu dois rédiger le rapport entièrement en français.";

  const prompt = `Tu es un expert en stratégie IA pour les entreprises, travaillant pour Aumentia (cabinet de conseil IA + Scaling Up). ${langInstruction} Le rapport concerne la société "${company.name}".

DONNÉES DE L'ENTREPRISE:
- Secteur: ${company.industry || "Non précisé"}
- Taille: ${company.size || "Non précisée"}
- Pays: ${company.country || "Belgique"}
- Répondants: ${respondentCount}/${totalInvited} (${Math.round((respondentCount / totalInvited) * 100)}% de participation)

SCORES PAR PILIER (calculés à partir des réponses):
${pillarSection}
- Score global de maturité IA: ${scores.overall}/100
- Score de préparation IA: ${scores.aiReadiness}/100

VERBATIMS ET RÉPONSES DES COLLABORATEURS:
${responseSummary}

---

Génère un rapport structuré de diagnostic IA en français. Le rapport doit être professionnel, actionnable et inspirer confiance. Structure exacte à respecter:

# Diagnostic IA Stratégique — ${company.name}
*Rapport confidentiel — Aumentia*

## 1. Résumé Exécutif
[3-4 paragraphes synthétisant les constats clés, le niveau de maturité, et les 3 opportunités majeures]

## 2. Diagnostic Global
[Tableau des scores par pilier avec commentaire sur chaque]

### 2.1 Leadership & Vision (score: X/100)
[Analyse avec forces, faiblesses, risques, opportunités IA spécifiques]

### 2.2 Stratégie (score: X/100)
[Analyse]

### 2.3 Exécution (score: X/100)
[Analyse — focus sur les processus, temps perdus, frictions identifiés]

### 2.4 Vente & Marketing (score: X/100)
[Analyse — focus CRM, prospection, automatisation commerciale]

### 2.5 RH & Talents (score: X/100)
[Analyse — recrutement, onboarding, performance]

### 2.6 Finance & Data (score: X/100)
[Analyse — reporting, prévisionnel, automatisation financière]

## 3. Carte des Opportunités IA
[10 opportunités IA concrètes classées par ROI potentiel, avec pour chacune: description, impact estimé, effort, timeline, outils suggérés]

## 4. Quick Wins — 30 jours
[5-7 actions concrètes exécutables immédiatement sans budget majeur]

## 5. Plan IA 90 jours
[3 sprints avec objectifs, actions et responsables suggérés]

## 6. Vision IA 12 mois
[Transformation attendue, KPIs cibles, architecture IA recommandée]

## 7. Budget & ROI Estimé
[3 scénarios: Lean / Standard / Ambition avec investissement estimé et ROI 12 mois]

## 8. Prochaines Étapes
[Recommandations concrètes pour démarrer avec Aumentia]

---
Adopte un ton à la fois stratégique et humain. Cite des exemples concrets tirés des verbatims. Sois précis sur les montants, délais et gains estimés. Le rapport doit être lisible par un CODIR.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type from Claude");
  return content.text;
}
