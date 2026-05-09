export type QuestionType = "text" | "scale" | "choice";
export type Role = "ceo" | "cfo" | "coo" | "sales" | "ops" | "hr" | "employee";
export type Pillar =
  | "leadership"
  | "strategy"
  | "execution"
  | "sales"
  | "hr"
  | "finance";

export interface Question {
  id: string;
  section: string;
  roles: Role[] | "all"; // which roles see this question
  type: QuestionType;
  text: string;
  placeholder?: string;
  options?: { value: string; label: string; score?: number }[];
  pillar?: Pillar;
  weight?: number; // for scoring
  inverted?: boolean; // higher raw score = lower pillar score
}

export const SECTIONS = [
  { id: "general", label: "Informations générales" },
  { id: "tasks", label: "Tâches & Efficacité" },
  { id: "data", label: "Information & Décisions" },
  { id: "tools", label: "Outils" },
  { id: "ai", label: "Vision IA" },
  { id: "role", label: "Questions spécifiques" },
];

export const QUESTIONS: Question[] = [
  // ─── SECTION 1: GENERAL ───────────────────────────────────────────
  {
    id: "g1",
    section: "general",
    roles: "all",
    type: "text",
    text: "Décrivez brièvement vos 3 principales responsabilités.",
    placeholder: "Ex: gestion de l'équipe commerciale, reporting mensuel, suivi des KPIs...",
  },
  {
    id: "g2",
    section: "general",
    roles: "all",
    type: "choice",
    text: "Combien de personnes composent votre équipe directe ?",
    options: [
      { value: "0", label: "Je travaille seul(e)" },
      { value: "1-3", label: "1 à 3 personnes" },
      { value: "4-10", label: "4 à 10 personnes" },
      { value: "11-30", label: "11 à 30 personnes" },
      { value: "30+", label: "Plus de 30 personnes" },
    ],
  },

  // ─── SECTION 2: TASKS ──────────────────────────────────────────────
  {
    id: "t1",
    section: "tasks",
    roles: "all",
    type: "text",
    text: "Quelles tâches vous prennent le plus de temps chaque semaine ?",
    placeholder: "Décrivez les 2-3 tâches les plus chronophages...",
    pillar: "execution",
    weight: 1,
  },
  {
    id: "t2",
    section: "tasks",
    roles: "all",
    type: "text",
    text: "Parmi ces tâches, lesquelles sont répétitives et pourraient être automatisées ?",
    placeholder: "Ex: saisie de données, envoi d'emails type, génération de rapports...",
    pillar: "execution",
    weight: 1,
  },
  {
    id: "t3",
    section: "tasks",
    roles: "all",
    type: "scale",
    text: "Quel est votre niveau de frustration face aux tâches répétitives à faible valeur ajoutée ?",
    options: [
      { value: "1", label: "Très faible", score: 1 },
      { value: "2", label: "Faible", score: 2 },
      { value: "3", label: "Modéré", score: 3 },
      { value: "4", label: "Élevé", score: 4 },
      { value: "5", label: "Très élevé", score: 5 },
    ],
    pillar: "execution",
    weight: 2,
    inverted: true,
  },
  {
    id: "t4",
    section: "tasks",
    roles: "all",
    type: "choice",
    text: "Estimez le temps perdu chaque semaine sur des tâches à faible valeur ajoutée.",
    options: [
      { value: "<2h", label: "Moins de 2 heures", score: 5 },
      { value: "2-5h", label: "2 à 5 heures", score: 3 },
      { value: "5-10h", label: "5 à 10 heures", score: 2 },
      { value: ">10h", label: "Plus de 10 heures", score: 1 },
    ],
    pillar: "execution",
    weight: 2,
  },
  {
    id: "t5",
    section: "tasks",
    roles: "all",
    type: "text",
    text: "Quels processus dans votre travail vous semblent les plus lents ou inefficaces ?",
    placeholder: "Décrivez les goulots d'étranglement que vous vivez au quotidien...",
    pillar: "execution",
    weight: 1,
  },

  // ─── SECTION 3: DATA ──────────────────────────────────────────────
  {
    id: "d1",
    section: "data",
    roles: "all",
    type: "text",
    text: "Quand vous devez prendre une décision importante, quelles informations vous manquent souvent ?",
    placeholder: "Ex: données financières en temps réel, performance commerciale, indicateurs RH...",
    pillar: "finance",
    weight: 1,
  },
  {
    id: "d2",
    section: "data",
    roles: "all",
    type: "scale",
    text: "Avez-vous un accès facile et rapide aux données dont vous avez besoin pour travailler ?",
    options: [
      { value: "1", label: "Rarement", score: 1 },
      { value: "2", label: "Parfois", score: 2 },
      { value: "3", label: "La moitié du temps", score: 3 },
      { value: "4", label: "Souvent", score: 4 },
      { value: "5", label: "Toujours", score: 5 },
    ],
    pillar: "execution",
    weight: 2,
  },
  {
    id: "d3",
    section: "data",
    roles: "all",
    type: "choice",
    text: "Combien de temps consacrez-vous chaque semaine à préparer ou consolider des reportings ?",
    options: [
      { value: "<1h", label: "Moins d'1 heure", score: 5 },
      { value: "1-3h", label: "1 à 3 heures", score: 3 },
      { value: "3-5h", label: "3 à 5 heures", score: 2 },
      { value: ">5h", label: "Plus de 5 heures", score: 1 },
    ],
    pillar: "finance",
    weight: 2,
    inverted: false,
  },

  // ─── SECTION 4: TOOLS ─────────────────────────────────────────────
  {
    id: "o1",
    section: "tools",
    roles: "all",
    type: "text",
    text: "Quels outils utilisez-vous au quotidien ? (ERP, CRM, Excel, outils de communication…)",
    placeholder: "Ex: SAP, Salesforce, Excel, Teams, Notion, HubSpot...",
  },
  {
    id: "o2",
    section: "tools",
    roles: "all",
    type: "text",
    text: "Qu'est-ce qui ne fonctionne pas bien dans ces outils ? Quelles frictions vivez-vous ?",
    placeholder: "Ex: saisies doubles, manque d'intégration entre outils, interfaces complexes...",
    pillar: "execution",
    weight: 1,
  },
  {
    id: "o3",
    section: "tools",
    roles: "all",
    type: "scale",
    text: "Comment évaluez-vous la maturité digitale de votre équipe ?",
    options: [
      { value: "1", label: "Débutant", score: 1 },
      { value: "2", label: "En développement", score: 2 },
      { value: "3", label: "Intermédiaire", score: 3 },
      { value: "4", label: "Avancé", score: 4 },
      { value: "5", label: "Expert", score: 5 },
    ],
    pillar: "strategy",
    weight: 2,
  },

  // ─── SECTION 5: AI VISION ─────────────────────────────────────────
  {
    id: "ai1",
    section: "ai",
    roles: "all",
    type: "text",
    text: "Quelles tâches l'IA pourrait-elle améliorer immédiatement selon vous ?",
    placeholder: "Listez 2-3 cas d'usage concrets dans votre quotidien...",
  },
  {
    id: "ai2",
    section: "ai",
    roles: "all",
    type: "text",
    text: "Si vous aviez un assistant IA parfait, que ferait-il pour vous chaque jour ?",
    placeholder: "Décrivez votre idéal sans contrainte technique...",
  },
  {
    id: "ai3",
    section: "ai",
    roles: "all",
    type: "scale",
    text: "Quel est votre niveau de familiarité avec les outils IA actuels ? (ChatGPT, Copilot, etc.)",
    options: [
      { value: "1", label: "Débutant — je n'en utilise pas", score: 1 },
      { value: "2", label: "Curieux — j'ai testé quelques fois", score: 2 },
      { value: "3", label: "Utilisateur — j'utilise parfois", score: 3 },
      { value: "4", label: "Régulier — plusieurs fois par semaine", score: 4 },
      { value: "5", label: "Expert — je l'intègre dans mes process", score: 5 },
    ],
    pillar: "leadership",
    weight: 2,
  },
  {
    id: "ai4",
    section: "ai",
    roles: "all",
    type: "text",
    text: "Y a-t-il des tâches que vous aimeriez déléguer intégralement à l'IA ou à une automatisation ?",
    placeholder: "Soyez précis — plus c'est concret, plus l'audit sera utile...",
  },

  // ─── SECTION 6: CEO SPECIFIC ──────────────────────────────────────
  {
    id: "ceo1",
    section: "role",
    roles: ["ceo"],
    type: "text",
    text: "Quels sont vos 3 objectifs stratégiques prioritaires pour les 12 prochains mois ?",
    placeholder: "Ex: croissance chiffre d'affaires, expansion internationale, amélioration marges...",
    pillar: "strategy",
    weight: 3,
  },
  {
    id: "ceo2",
    section: "role",
    roles: ["ceo"],
    type: "text",
    text: "Quels sont les plus grands freins à la croissance de votre entreprise aujourd'hui ?",
    placeholder: "Ex: ressources humaines, systèmes d'information, processus, financement...",
    pillar: "strategy",
    weight: 3,
  },
  {
    id: "ceo3",
    section: "role",
    roles: ["ceo"],
    type: "scale",
    text: "Évaluez la clarté de votre vision stratégique pour vos équipes.",
    options: [
      { value: "1", label: "Très floue", score: 1 },
      { value: "2", label: "Partiellement claire", score: 2 },
      { value: "3", label: "Assez claire", score: 3 },
      { value: "4", label: "Claire", score: 4 },
      { value: "5", label: "Cristalline", score: 5 },
    ],
    pillar: "leadership",
    weight: 3,
  },
  {
    id: "ceo4",
    section: "role",
    roles: ["ceo"],
    type: "scale",
    text: "Dans quelle mesure vos équipes exécutent-elles avec discipline et rigueur ?",
    options: [
      { value: "1", label: "Peu de discipline", score: 1 },
      { value: "2", label: "Irrégulier", score: 2 },
      { value: "3", label: "Moyen", score: 3 },
      { value: "4", label: "Bon", score: 4 },
      { value: "5", label: "Excellent", score: 5 },
    ],
    pillar: "execution",
    weight: 3,
  },
  {
    id: "ceo5",
    section: "role",
    roles: ["ceo"],
    type: "scale",
    text: "Disposez-vous d'indicateurs clés de performance (KPIs) clairement définis et suivis régulièrement ?",
    options: [
      { value: "1", label: "Inexistants", score: 1 },
      { value: "2", label: "Partiels", score: 2 },
      { value: "3", label: "Définis mais peu suivis", score: 3 },
      { value: "4", label: "Bien définis et suivis", score: 4 },
      { value: "5", label: "Très structurés et actionnables", score: 5 },
    ],
    pillar: "leadership",
    weight: 3,
  },
  {
    id: "ceo6",
    section: "role",
    roles: ["ceo"],
    type: "choice",
    text: "Quelle est la capacité d'investissement envisagée pour une transformation IA sur 12 mois ?",
    options: [
      { value: "<5k", label: "Moins de 5 000 €" },
      { value: "5-15k", label: "5 000 € à 15 000 €" },
      { value: "15-30k", label: "15 000 € à 30 000 €" },
      { value: ">30k", label: "Plus de 30 000 €" },
      { value: "unknown", label: "Pas encore défini" },
    ],
  },

  // ─── CFO SPECIFIC ─────────────────────────────────────────────────
  {
    id: "cfo1",
    section: "role",
    roles: ["cfo"],
    type: "text",
    text: "Quels sont vos processus financiers les plus chronophages ?",
    placeholder: "Ex: clôture mensuelle, consolidation, reporting groupe, gestion de trésorerie...",
    pillar: "finance",
    weight: 3,
  },
  {
    id: "cfo2",
    section: "role",
    roles: ["cfo"],
    type: "choice",
    text: "Combien de temps vous faut-il pour clôturer vos comptes mensuels ?",
    options: [
      { value: "<1j", label: "Moins d'1 jour", score: 5 },
      { value: "1-3j", label: "1 à 3 jours", score: 4 },
      { value: "3-7j", label: "3 à 7 jours", score: 2 },
      { value: ">7j", label: "Plus de 7 jours", score: 1 },
    ],
    pillar: "finance",
    weight: 3,
  },
  {
    id: "cfo3",
    section: "role",
    roles: ["cfo"],
    type: "scale",
    text: "Disposez-vous d'un prévisionnel de trésorerie automatisé et fiable ?",
    options: [
      { value: "1", label: "Inexistant", score: 1 },
      { value: "2", label: "Manuel et peu fiable", score: 2 },
      { value: "3", label: "Partiellement automatisé", score: 3 },
      { value: "4", label: "Bien automatisé", score: 4 },
      { value: "5", label: "Temps réel et fiable", score: 5 },
    ],
    pillar: "finance",
    weight: 3,
  },
  {
    id: "cfo4",
    section: "role",
    roles: ["cfo"],
    type: "scale",
    text: "Évaluez la fiabilité et la disponibilité de vos données financières en temps réel.",
    options: [
      { value: "1", label: "Très faible", score: 1 },
      { value: "2", label: "Faible", score: 2 },
      { value: "3", label: "Moyenne", score: 3 },
      { value: "4", label: "Bonne", score: 4 },
      { value: "5", label: "Excellente", score: 5 },
    ],
    pillar: "finance",
    weight: 3,
  },

  // ─── COO SPECIFIC ─────────────────────────────────────────────────
  {
    id: "coo1",
    section: "role",
    roles: ["coo"],
    type: "text",
    text: "Quels sont les principaux goulots d'étranglement dans vos opérations ?",
    placeholder: "Décrivez où les processus ralentissent ou génèrent le plus d'erreurs...",
    pillar: "execution",
    weight: 3,
  },
  {
    id: "coo2",
    section: "role",
    roles: ["coo"],
    type: "scale",
    text: "Évaluez la standardisation de vos processus opérationnels.",
    options: [
      { value: "1", label: "Aucune — chacun fait à sa façon", score: 1 },
      { value: "2", label: "Peu standardisé", score: 2 },
      { value: "3", label: "Partiellement standardisé", score: 3 },
      { value: "4", label: "Bien standardisé", score: 4 },
      { value: "5", label: "Totalement standardisé et documenté", score: 5 },
    ],
    pillar: "execution",
    weight: 3,
  },
  {
    id: "coo3",
    section: "role",
    roles: ["coo"],
    type: "choice",
    text: "Combien d'erreurs manuelles votre équipe génère-t-elle approximativement par semaine ?",
    options: [
      { value: "0-5", label: "0 à 5 erreurs", score: 5 },
      { value: "5-20", label: "5 à 20 erreurs", score: 3 },
      { value: "20-50", label: "20 à 50 erreurs", score: 2 },
      { value: ">50", label: "Plus de 50 erreurs", score: 1 },
    ],
    pillar: "execution",
    weight: 3,
  },

  // ─── SALES SPECIFIC ───────────────────────────────────────────────
  {
    id: "s1",
    section: "role",
    roles: ["sales"],
    type: "text",
    text: "Décrivez votre processus de prospection actuel, de l'identification à la qualification.",
    placeholder: "Qui fait quoi, quels outils, quels délais...",
    pillar: "sales",
    weight: 3,
  },
  {
    id: "s2",
    section: "role",
    roles: ["sales"],
    type: "choice",
    text: "Quelle proportion de votre temps commercial est consacrée à des tâches administratives ?",
    options: [
      { value: "<10%", label: "Moins de 10%", score: 5 },
      { value: "10-25%", label: "10 à 25%", score: 3 },
      { value: "25-40%", label: "25 à 40%", score: 2 },
      { value: ">40%", label: "Plus de 40%", score: 1 },
    ],
    pillar: "sales",
    weight: 3,
    inverted: false,
  },
  {
    id: "s3",
    section: "role",
    roles: ["sales"],
    type: "scale",
    text: "Évaluez la qualité de votre CRM et son taux d'utilisation réel par l'équipe.",
    options: [
      { value: "1", label: "Inexistant ou jamais utilisé", score: 1 },
      { value: "2", label: "Utilisé irrégulièrement", score: 2 },
      { value: "3", label: "Utilisé partiellement", score: 3 },
      { value: "4", label: "Bien utilisé", score: 4 },
      { value: "5", label: "Optimal — données fiables et complètes", score: 5 },
    ],
    pillar: "sales",
    weight: 3,
  },
  {
    id: "s4",
    section: "role",
    roles: ["sales"],
    type: "text",
    text: "Quels sont vos plus grands défis commerciaux aujourd'hui ?",
    placeholder: "Ex: qualification des leads, temps de cycle de vente, fidélisation, taux de conversion...",
    pillar: "sales",
    weight: 2,
  },

  // ─── OPS SPECIFIC ─────────────────────────────────────────────────
  {
    id: "ops1",
    section: "role",
    roles: ["ops"],
    type: "text",
    text: "Quels sont les processus opérationnels qui génèrent le plus de friction ou d'erreurs ?",
    placeholder: "Décrivez les étapes problématiques de vos workflows clés...",
    pillar: "execution",
    weight: 3,
  },
  {
    id: "ops2",
    section: "role",
    roles: ["ops"],
    type: "scale",
    text: "Évaluez la standardisation et la documentation de vos processus.",
    options: [
      { value: "1", label: "Aucune documentation", score: 1 },
      { value: "2", label: "Peu documenté", score: 2 },
      { value: "3", label: "Partiellement documenté", score: 3 },
      { value: "4", label: "Bien documenté", score: 4 },
      { value: "5", label: "Totalement documenté et mis à jour", score: 5 },
    ],
    pillar: "execution",
    weight: 3,
  },

  // ─── HR SPECIFIC ──────────────────────────────────────────────────
  {
    id: "hr1",
    section: "role",
    roles: ["hr"],
    type: "text",
    text: "Quels sont vos plus grands défis en recrutement et rétention des talents actuellement ?",
    placeholder: "Ex: délai de recrutement, qualité des candidats, fidélisation, onboarding...",
    pillar: "hr",
    weight: 3,
  },
  {
    id: "hr2",
    section: "role",
    roles: ["hr"],
    type: "choice",
    text: "Combien de temps dure votre processus d'onboarding pour un nouvel employé ?",
    options: [
      { value: "<1w", label: "Moins d'1 semaine", score: 2 },
      { value: "1-2w", label: "1 à 2 semaines", score: 3 },
      { value: "2-4w", label: "2 à 4 semaines", score: 4 },
      { value: ">1m", label: "Plus d'1 mois (structuré)", score: 5 },
      { value: "none", label: "Pas de process formalisé", score: 1 },
    ],
    pillar: "hr",
    weight: 3,
  },
  {
    id: "hr3",
    section: "role",
    roles: ["hr"],
    type: "scale",
    text: "Évaluez la qualité de votre processus d'évaluation de performance.",
    options: [
      { value: "1", label: "Inexistant", score: 1 },
      { value: "2", label: "Informel", score: 2 },
      { value: "3", label: "Annuel standard", score: 3 },
      { value: "4", label: "Structuré et régulier", score: 4 },
      { value: "5", label: "Continu et basé sur des données", score: 5 },
    ],
    pillar: "hr",
    weight: 3,
  },
];

export function getQuestionsForRole(role: Role): Question[] {
  return QUESTIONS.filter(
    (q) => q.roles === "all" || q.roles.includes(role)
  );
}

export function getQuestionsBySection(role: Role): Record<string, Question[]> {
  const questions = getQuestionsForRole(role);
  const bySection: Record<string, Question[]> = {};
  for (const section of SECTIONS) {
    const sectionQs = questions.filter((q) => q.section === section.id);
    if (sectionQs.length > 0) {
      bySection[section.id] = sectionQs;
    }
  }
  return bySection;
}

export const ROLE_LABELS: Record<Role, string> = {
  ceo: "CEO / Directeur Général",
  cfo: "CFO / Directeur Financier",
  coo: "COO / Directeur des Opérations",
  sales: "Responsable Commercial / Sales",
  ops: "Responsable Opérations",
  hr: "Responsable RH",
  employee: "Collaborateur Clé",
};
