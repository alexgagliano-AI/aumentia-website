import { QUESTIONS, type Pillar, type Role } from "./questions";
export type { Pillar };

export interface PillarScore {
  pillar: Pillar;
  label: string;
  score: number; // 0–100
  dataPoints: number;
}

export interface DiagnosticScores {
  pillars: PillarScore[];
  overall: number;
  aiReadiness: number;
}

export const PILLAR_LABELS: Record<Pillar, string> = {
  leadership: "Leadership & Vision",
  strategy: "Stratégie",
  execution: "Exécution",
  sales: "Vente & Marketing",
  hr: "RH & Talents",
  finance: "Finance & Data",
};

// Belgian/European SME benchmarks (0–100 scale)
export const BENCHMARKS: Record<Pillar, number> = {
  leadership: 58,
  strategy: 52,
  execution: 48,
  sales: 55,
  hr: 50,
  finance: 45,
};

export const OVERALL_BENCHMARK = 38; // Overall AI readiness

interface ResponseData {
  question_id: string;
  answer: string | null;
  score: number | null;
}

function getNumericScore(response: ResponseData): number | null {
  if (response.score !== null) return response.score;
  // For choice questions with embedded scores
  const q = QUESTIONS.find((q) => q.id === response.question_id);
  if (!q || !q.options || !response.answer) return null;
  const opt = q.options.find((o) => o.value === response.answer);
  return opt?.score ?? null;
}

export function calculateScores(responses: ResponseData[]): DiagnosticScores {
  const pillarAccum: Record<Pillar, { total: number; weight: number; count: number }> = {
    leadership: { total: 0, weight: 0, count: 0 },
    strategy: { total: 0, weight: 0, count: 0 },
    execution: { total: 0, weight: 0, count: 0 },
    sales: { total: 0, weight: 0, count: 0 },
    hr: { total: 0, weight: 0, count: 0 },
    finance: { total: 0, weight: 0, count: 0 },
  };

  for (const response of responses) {
    const q = QUESTIONS.find((qq) => qq.id === response.question_id);
    if (!q?.pillar || !q.weight) continue;

    const raw = getNumericScore(response);
    if (raw === null) continue;

    // Normalize: invert if needed, scale to 0–100
    const normalized = q.inverted ? (6 - raw) * 20 : raw * 20;
    const pillar = q.pillar as Pillar;
    pillarAccum[pillar].total += normalized * q.weight;
    pillarAccum[pillar].weight += q.weight;
    pillarAccum[pillar].count += 1;
  }

  const pillars: PillarScore[] = (Object.keys(pillarAccum) as Pillar[]).map((p) => {
    const acc = pillarAccum[p];
    const score = acc.weight > 0 ? Math.round(acc.total / acc.weight) : 0;
    return { pillar: p, label: PILLAR_LABELS[p], score, dataPoints: acc.count };
  });

  const activePillars = pillars.filter((p) => p.dataPoints > 0);
  const overall =
    activePillars.length > 0
      ? Math.round(activePillars.reduce((s, p) => s + p.score, 0) / activePillars.length)
      : 0;

  // AI readiness: blend of digital maturity (o3), AI familiarity (ai3), data access (d2)
  const aiQuestions = ["o3", "ai3", "d2"];
  const aiScores = responses
    .filter((r) => aiQuestions.includes(r.question_id))
    .map((r) => getNumericScore(r))
    .filter((s): s is number => s !== null);
  const aiReadiness =
    aiScores.length > 0
      ? Math.round((aiScores.reduce((a, b) => a + b, 0) / aiScores.length) * 20)
      : 0;

  return { pillars, overall, aiReadiness };
}

export function getMaturityLevel(score: number): {
  level: string;
  color: string;
  description: string;
} {
  if (score >= 75) return { level: "Avancé", color: "#00D4C8", description: "Vous êtes prêt pour une transformation IA ambitieuse." };
  if (score >= 55) return { level: "Intermédiaire", color: "#C8922A", description: "De bonnes bases — des opportunités rapides à saisir." };
  if (score >= 35) return { level: "En développement", color: "#F59E0B", description: "Un potentiel IA significatif encore inexploité." };
  return { level: "Initial", color: "#EF4444", description: "L'IA peut transformer votre organisation en profondeur." };
}

// ─── i18n variants for PDF export ────────────────────────────────────────────
export const PILLAR_LABELS_I18N: Record<string, Record<Pillar, string>> = {
  fr: { leadership: "Leadership & Vision", strategy: "Stratégie", execution: "Exécution", sales: "Vente & Marketing", hr: "RH & Talents", finance: "Finance & Data" },
  en: { leadership: "Leadership & Vision", strategy: "Strategy", execution: "Execution", sales: "Sales & Marketing", hr: "HR & Talent", finance: "Finance & Data" },
  it: { leadership: "Leadership & Visione", strategy: "Strategia", execution: "Esecuzione", sales: "Vendite & Marketing", hr: "HR & Talenti", finance: "Finanza & Dati" },
};

export function getMaturityLevelI18n(score: number, lang = "fr"): { level: string; color: string; description: string } {
  const sets: Record<string, { min: number; level: string; color: string; description: string }[]> = {
    fr: [
      { min: 75, level: "Avancé", color: "#00D4C8", description: "Vous êtes prêt pour une transformation IA ambitieuse." },
      { min: 55, level: "Intermédiaire", color: "#C8922A", description: "De bonnes bases — des opportunités rapides à saisir." },
      { min: 35, level: "En développement", color: "#F59E0B", description: "Un potentiel IA significatif encore inexploité." },
      { min: 0, level: "Initial", color: "#EF4444", description: "L'IA peut transformer votre organisation en profondeur." },
    ],
    en: [
      { min: 75, level: "Advanced", color: "#00D4C8", description: "You are ready for an ambitious AI transformation." },
      { min: 55, level: "Intermediate", color: "#C8922A", description: "Good foundations — quick opportunities to seize." },
      { min: 35, level: "Developing", color: "#F59E0B", description: "Significant untapped AI potential." },
      { min: 0, level: "Initial", color: "#EF4444", description: "AI can deeply transform your organization." },
    ],
    it: [
      { min: 75, level: "Avanzato", color: "#00D4C8", description: "Siete pronti per una trasformazione IA ambiziosa." },
      { min: 55, level: "Intermedio", color: "#C8922A", description: "Buone basi — opportunità rapide da cogliere." },
      { min: 35, level: "In sviluppo", color: "#F59E0B", description: "Un potenziale IA significativo ancora inesplorato." },
      { min: 0, level: "Iniziale", color: "#EF4444", description: "L'IA può trasformare profondamente la vostra organizzazione." },
    ],
  };
  const set = sets[lang] ?? sets.fr;
  return set.find(l => score >= l.min) ?? set[set.length - 1];
}
