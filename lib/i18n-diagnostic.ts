export type Lang = "fr" | "en" | "it";

// ─── UI strings ────────────────────────────────────────────────────────────
export const UI: Record<Lang, {
  badge: string;
  hello: string;
  participates: string;
  asRole: string;
  yourPerspective: string;
  time: string; timeDesc: string;
  confidential: string; confidentialDesc: string;
  impact: string; impactDesc: string;
  start: string;
  saving: string;
  next: string;
  prev: string;
  submit: string;
  submitting: string;
  mustAnswer: string;
  errorOccurred: string;
  alreadyDone: string;
  alreadyDoneText: string;
  seeResults: string;
  thankYouTitle: string;
  thankYouSub: string;
  ceoMaturityLabel: string;
  myScoreLabel: string;
  scoresVsBenchmark: string;
  avg: string;
  completionLabel: string;
  respondentsCompleted: string;
  waitingRespondents: string;
  allDataAvailable: string;
  reportComingSoon: string;
  reportComingText: string;
  reportCeoNote: string;
  reportOtherNote: string;
  bookMeeting: string;
  noScoreYet: string;
  benchmarkNote: string;
  participation: string;
}> = {
  fr: {
    badge: "Diagnostic IA",
    hello: "Bonjour",
    participates: "Vous participez au",
    asRole: "En tant que",
    yourPerspective: "votre perspective est précieuse.",
    time: "20 à 30 minutes", timeDesc: "À compléter en une ou plusieurs fois",
    confidential: "Confidentiel", confidentialDesc: "Vos réponses sont traitées de manière anonyme",
    impact: "Impact direct", impactDesc: "Vos insights alimentent le plan IA stratégique",
    start: "Démarrer le questionnaire →",
    saving: "Sauvegarde…",
    next: "Section suivante →",
    prev: "← Précédent",
    submit: "Soumettre mes réponses ✓",
    submitting: "Envoi en cours…",
    mustAnswer: "Veuillez répondre à toutes les questions obligatoires",
    errorOccurred: "Une erreur est survenue. Veuillez réessayer.",
    alreadyDone: "Déjà complété !",
    alreadyDoneText: "Vous avez déjà répondu à ce questionnaire. Merci pour votre contribution.",
    seeResults: "Voir mes résultats →",
    thankYouTitle: "Merci",
    thankYouSub: "Votre contribution au Diagnostic IA de",
    ceoMaturityLabel: "Maturité IA globale de l'entreprise",
    myScoreLabel: "Score IA —",
    scoresVsBenchmark: "Scores par pilier vs. moyenne",
    avg: "Moy.",
    completionLabel: "Participation",
    respondentsCompleted: "répondants complétés",
    waitingRespondents: "répondant(s) en attente — scores provisoires",
    allDataAvailable: "Toutes les données sont disponibles",
    reportComingSoon: "Votre rapport complet arrive bientôt",
    reportComingText: "L'équipe Aumentia analyse toutes les données et génère votre rapport stratégique.",
    reportCeoNote: "Vous serez contacté(e) directement par Alexandre pour la restitution.",
    reportOtherNote: "Le rapport sera partagé avec la direction de votre entreprise.",
    bookMeeting: "Prendre rendez-vous avec Alexandre →",
    noScoreYet: "Votre score sera calculé dès que d'autres répondants auront complété le questionnaire.",
    benchmarkNote: "Ligne de référence = moyenne des PME",
    participation: "Participation",
  },
  en: {
    badge: "AI Diagnostic",
    hello: "Hello",
    participates: "You are participating in the",
    asRole: "As a",
    yourPerspective: "your perspective is invaluable.",
    time: "20 to 30 minutes", timeDesc: "Complete in one or several sessions",
    confidential: "Confidential", confidentialDesc: "Your answers are processed anonymously",
    impact: "Direct impact", impactDesc: "Your insights feed the strategic AI plan",
    start: "Start the questionnaire →",
    saving: "Saving…",
    next: "Next section →",
    prev: "← Previous",
    submit: "Submit my answers ✓",
    submitting: "Submitting…",
    mustAnswer: "Please answer all required questions",
    errorOccurred: "An error occurred. Please try again.",
    alreadyDone: "Already completed!",
    alreadyDoneText: "You have already answered this questionnaire. Thank you for your contribution.",
    seeResults: "See my results →",
    thankYouTitle: "Thank you",
    thankYouSub: "Your contribution to the AI Diagnostic of",
    ceoMaturityLabel: "Overall company AI maturity",
    myScoreLabel: "AI Score —",
    scoresVsBenchmark: "Scores by pillar vs. average",
    avg: "Avg.",
    completionLabel: "Participation",
    respondentsCompleted: "respondents completed",
    waitingRespondents: "respondent(s) pending — provisional scores",
    allDataAvailable: "All data is available",
    reportComingSoon: "Your full report is coming soon",
    reportComingText: "The Aumentia team is analyzing all data and generating your strategic report.",
    reportCeoNote: "You will be contacted directly by Alexandre for the debrief.",
    reportOtherNote: "The report will be shared with your company's leadership.",
    bookMeeting: "Schedule a meeting with Alexandre →",
    noScoreYet: "Your score will be calculated once other respondents have completed the questionnaire.",
    benchmarkNote: "Reference line = SME average",
    participation: "Participation",
  },
  it: {
    badge: "Diagnostico IA",
    hello: "Ciao",
    participates: "Stai partecipando al",
    asRole: "In qualità di",
    yourPerspective: "la tua prospettiva è preziosa.",
    time: "20-30 minuti", timeDesc: "Da completare in una o più sessioni",
    confidential: "Riservato", confidentialDesc: "Le tue risposte sono trattate in modo anonimo",
    impact: "Impatto diretto", impactDesc: "Le tue intuizioni alimentano il piano strategico IA",
    start: "Inizia il questionario →",
    saving: "Salvataggio…",
    next: "Sezione successiva →",
    prev: "← Precedente",
    submit: "Invia le mie risposte ✓",
    submitting: "Invio in corso…",
    mustAnswer: "Per favore rispondi a tutte le domande obbligatorie",
    errorOccurred: "Si è verificato un errore. Riprova.",
    alreadyDone: "Già completato!",
    alreadyDoneText: "Hai già risposto a questo questionario. Grazie per il tuo contributo.",
    seeResults: "Vedi i miei risultati →",
    thankYouTitle: "Grazie",
    thankYouSub: "Il tuo contributo al Diagnostico IA di",
    ceoMaturityLabel: "Maturità IA globale dell'azienda",
    myScoreLabel: "Score IA —",
    scoresVsBenchmark: "Punteggi per pilastro vs. media",
    avg: "Media",
    completionLabel: "Partecipazione",
    respondentsCompleted: "rispondenti completati",
    waitingRespondents: "rispondente/i in attesa — punteggi provvisori",
    allDataAvailable: "Tutti i dati sono disponibili",
    reportComingSoon: "Il tuo report completo arriverà presto",
    reportComingText: "Il team Aumentia analizza tutti i dati e genera il tuo report strategico.",
    reportCeoNote: "Sarai contattato/a direttamente da Alexandre per la restituzione.",
    reportOtherNote: "Il report sarà condiviso con la direzione della tua azienda.",
    bookMeeting: "Fissa un appuntamento con Alexandre →",
    noScoreYet: "Il tuo punteggio sarà calcolato non appena altri rispondenti avranno completato il questionario.",
    benchmarkNote: "Linea di riferimento = media delle PMI",
    participation: "Partecipazione",
  },
};

// ─── Section labels ────────────────────────────────────────────────────────
export const SECTION_LABELS: Record<Lang, Record<string, string>> = {
  fr: {
    general: "Informations générales",
    tasks: "Tâches & Efficacité",
    data: "Information & Décisions",
    tools: "Outils",
    ai: "Vision IA",
    role: "Questions spécifiques",
  },
  en: {
    general: "General Information",
    tasks: "Tasks & Efficiency",
    data: "Information & Decisions",
    tools: "Tools",
    ai: "AI Vision",
    role: "Role-specific Questions",
  },
  it: {
    general: "Informazioni generali",
    tasks: "Attività & Efficienza",
    data: "Informazioni & Decisioni",
    tools: "Strumenti",
    ai: "Visione IA",
    role: "Domande specifiche",
  },
};

// ─── Role labels ────────────────────────────────────────────────────────────
export const ROLE_LABELS_I18N: Record<Lang, Record<string, string>> = {
  fr: {
    ceo: "CEO / Directeur Général",
    cfo: "CFO / Directeur Financier",
    coo: "COO / Directeur des Opérations",
    sales: "Responsable Commercial / Sales",
    ops: "Responsable Opérations",
    hr: "Responsable RH",
    employee: "Collaborateur Clé",
  },
  en: {
    ceo: "CEO / General Manager",
    cfo: "CFO / Finance Director",
    coo: "COO / Operations Director",
    sales: "Sales Manager",
    ops: "Operations Manager",
    hr: "HR Manager",
    employee: "Key Employee",
  },
  it: {
    ceo: "CEO / Direttore Generale",
    cfo: "CFO / Direttore Finanziario",
    coo: "COO / Direttore Operativo",
    sales: "Responsabile Commerciale",
    ops: "Responsabile Operazioni",
    hr: "Responsabile HR",
    employee: "Collaboratore Chiave",
  },
};

// ─── Question translations ──────────────────────────────────────────────────
// Only text, placeholder, and option labels are translated.
// IDs, sections, roles, types, pillar, weight stay the same.
export const QUESTION_TRANSLATIONS: Record<Lang, Record<string, {
  text: string;
  placeholder?: string;
  options?: Record<string, string>; // value → label
}>> = {
  fr: {
    g1: { text: "Décrivez brièvement vos 3 principales responsabilités.", placeholder: "Ex: gestion de l'équipe commerciale, reporting mensuel, suivi des KPIs..." },
    g2: { text: "Combien de personnes composent votre équipe directe ?", options: { "0": "Je travaille seul(e)", "1-3": "1 à 3 personnes", "4-10": "4 à 10 personnes", "11-30": "11 à 30 personnes", "30+": "Plus de 30 personnes" } },
    t1: { text: "Quelles tâches vous prennent le plus de temps chaque semaine ?", placeholder: "Décrivez les 2-3 tâches les plus chronophages..." },
    t2: { text: "Parmi ces tâches, lesquelles sont répétitives et pourraient être automatisées ?", placeholder: "Ex: saisie de données, envoi d'emails type, génération de rapports..." },
    t3: { text: "Quel est votre niveau de frustration face aux tâches répétitives à faible valeur ajoutée ?", options: { "1": "Très faible", "2": "Faible", "3": "Modéré", "4": "Élevé", "5": "Très élevé" } },
    t4: { text: "Estimez le temps perdu chaque semaine sur des tâches à faible valeur ajoutée.", options: { "<2h": "Moins de 2 heures", "2-5h": "2 à 5 heures", "5-10h": "5 à 10 heures", ">10h": "Plus de 10 heures" } },
    t5: { text: "Quels processus dans votre travail vous semblent les plus lents ou inefficaces ?", placeholder: "Décrivez les goulots d'étranglement que vous vivez au quotidien..." },
    d1: { text: "Quand vous devez prendre une décision importante, quelles informations vous manquent souvent ?", placeholder: "Ex: données financières en temps réel, performance commerciale, indicateurs RH..." },
    d2: { text: "Avez-vous un accès facile et rapide aux données dont vous avez besoin pour travailler ?", options: { "1": "Rarement", "2": "Parfois", "3": "La moitié du temps", "4": "Souvent", "5": "Toujours" } },
    d3: { text: "Combien de temps consacrez-vous chaque semaine à préparer ou consolider des reportings ?", options: { "<1h": "Moins d'1 heure", "1-3h": "1 à 3 heures", "3-5h": "3 à 5 heures", ">5h": "Plus de 5 heures" } },
    o1: { text: "Quels outils utilisez-vous au quotidien ? (ERP, CRM, Excel, outils de communication…)", placeholder: "Ex: SAP, Salesforce, Excel, Teams, Notion, HubSpot..." },
    o2: { text: "Qu'est-ce qui ne fonctionne pas bien dans ces outils ? Quelles frictions vivez-vous ?", placeholder: "Ex: saisies doubles, manque d'intégration entre outils, interfaces complexes..." },
    o3: { text: "Comment évaluez-vous la maturité digitale de votre équipe ?", options: { "1": "Débutant", "2": "En développement", "3": "Intermédiaire", "4": "Avancé", "5": "Expert" } },
    ai1: { text: "Quelles tâches l'IA pourrait-elle améliorer immédiatement selon vous ?", placeholder: "Listez 2-3 cas d'usage concrets dans votre quotidien..." },
    ai2: { text: "Si vous aviez un assistant IA parfait, que ferait-il pour vous chaque jour ?", placeholder: "Décrivez votre idéal sans contrainte technique..." },
    ai3: { text: "Quel est votre niveau de familiarité avec les outils IA actuels ? (ChatGPT, Copilot, etc.)", options: { "1": "Débutant — je n'en utilise pas", "2": "Curieux — j'ai testé quelques fois", "3": "Utilisateur — j'utilise parfois", "4": "Régulier — plusieurs fois par semaine", "5": "Expert — je l'intègre dans mes process" } },
    ai4: { text: "Y a-t-il des tâches que vous aimeriez déléguer intégralement à l'IA ou à une automatisation ?", placeholder: "Soyez précis — plus c'est concret, plus l'audit sera utile..." },
    ceo1: { text: "Quels sont vos 3 objectifs stratégiques prioritaires pour les 12 prochains mois ?", placeholder: "Ex: croissance chiffre d'affaires, expansion internationale, amélioration marges..." },
    ceo2: { text: "Quels sont les plus grands freins à la croissance de votre entreprise aujourd'hui ?", placeholder: "Ex: ressources humaines, systèmes d'information, processus, financement..." },
    ceo3: { text: "Évaluez la clarté de votre vision stratégique pour vos équipes.", options: { "1": "Très floue", "2": "Partiellement claire", "3": "Assez claire", "4": "Claire", "5": "Cristalline" } },
    ceo4: { text: "Dans quelle mesure vos équipes exécutent-elles avec discipline et rigueur ?", options: { "1": "Peu de discipline", "2": "Irrégulier", "3": "Moyen", "4": "Bon", "5": "Excellent" } },
    ceo5: { text: "Disposez-vous d'indicateurs clés de performance (KPIs) clairement définis et suivis régulièrement ?", options: { "1": "Inexistants", "2": "Partiels", "3": "Définis mais peu suivis", "4": "Bien définis et suivis", "5": "Très structurés et actionnables" } },
    ceo6: { text: "Quelle est la capacité d'investissement envisagée pour une transformation IA sur 12 mois ?", options: { "<5k": "Moins de 5 000 €", "5-15k": "5 000 € à 15 000 €", "15-30k": "15 000 € à 30 000 €", ">30k": "Plus de 30 000 €", "unknown": "Pas encore défini" } },
    cfo1: { text: "Quels sont vos processus financiers les plus chronophages ?", placeholder: "Ex: clôture mensuelle, consolidation, reporting groupe, gestion de trésorerie..." },
    cfo2: { text: "Combien de temps vous faut-il pour clôturer vos comptes mensuels ?", options: { "<1j": "Moins d'1 jour", "1-3j": "1 à 3 jours", "3-7j": "3 à 7 jours", ">7j": "Plus de 7 jours" } },
    cfo3: { text: "Disposez-vous d'un prévisionnel de trésorerie automatisé et fiable ?", options: { "1": "Inexistant", "2": "Manuel et peu fiable", "3": "Partiellement automatisé", "4": "Bien automatisé", "5": "Temps réel et fiable" } },
    cfo4: { text: "Évaluez la fiabilité et la disponibilité de vos données financières en temps réel.", options: { "1": "Très faible", "2": "Faible", "3": "Moyenne", "4": "Bonne", "5": "Excellente" } },
    coo1: { text: "Quels sont les principaux goulots d'étranglement dans vos opérations ?", placeholder: "Décrivez où les processus ralentissent ou génèrent le plus d'erreurs..." },
    coo2: { text: "Évaluez la standardisation de vos processus opérationnels.", options: { "1": "Aucune — chacun fait à sa façon", "2": "Peu standardisé", "3": "Partiellement standardisé", "4": "Bien standardisé", "5": "Totalement standardisé et documenté" } },
    coo3: { text: "Combien d'erreurs manuelles votre équipe génère-t-elle approximativement par semaine ?", options: { "0-5": "0 à 5 erreurs", "5-20": "5 à 20 erreurs", "20-50": "20 à 50 erreurs", ">50": "Plus de 50 erreurs" } },
    s1: { text: "Décrivez votre processus de prospection actuel, de l'identification à la qualification.", placeholder: "Qui fait quoi, quels outils, quels délais..." },
    s2: { text: "Quelle proportion de votre temps commercial est consacrée à des tâches administratives ?", options: { "<10%": "Moins de 10%", "10-25%": "10 à 25%", "25-40%": "25 à 40%", ">40%": "Plus de 40%" } },
    s3: { text: "Évaluez la qualité de votre CRM et son taux d'utilisation réel par l'équipe.", options: { "1": "Inexistant ou jamais utilisé", "2": "Utilisé irrégulièrement", "3": "Utilisé partiellement", "4": "Bien utilisé", "5": "Optimal — données fiables et complètes" } },
    s4: { text: "Quels sont vos plus grands défis commerciaux aujourd'hui ?", placeholder: "Ex: qualification des leads, temps de cycle de vente, fidélisation, taux de conversion..." },
    ops1: { text: "Quels sont les processus opérationnels qui génèrent le plus de friction ou d'erreurs ?", placeholder: "Décrivez les étapes problématiques de vos workflows clés..." },
    ops2: { text: "Évaluez la standardisation et la documentation de vos processus.", options: { "1": "Aucune documentation", "2": "Peu documenté", "3": "Partiellement documenté", "4": "Bien documenté", "5": "Totalement documenté et mis à jour" } },
    hr1: { text: "Quels sont vos plus grands défis en recrutement et rétention des talents actuellement ?", placeholder: "Ex: délai de recrutement, qualité des candidats, fidélisation, onboarding..." },
    hr2: { text: "Combien de temps dure votre processus d'onboarding pour un nouvel employé ?", options: { "<1w": "Moins d'1 semaine", "1-2w": "1 à 2 semaines", "2-4w": "2 à 4 semaines", ">1m": "Plus d'1 mois (structuré)", "none": "Pas de process formalisé" } },
    hr3: { text: "Évaluez la qualité de votre processus d'évaluation de performance.", options: { "1": "Inexistant", "2": "Informel", "3": "Annuel standard", "4": "Structuré et régulier", "5": "Continu et basé sur des données" } },
  },

  en: {
    g1: { text: "Briefly describe your 3 main responsibilities.", placeholder: "E.g. managing the sales team, monthly reporting, tracking KPIs..." },
    g2: { text: "How many people are on your direct team?", options: { "0": "I work alone", "1-3": "1 to 3 people", "4-10": "4 to 10 people", "11-30": "11 to 30 people", "30+": "More than 30 people" } },
    t1: { text: "What tasks take up most of your time each week?", placeholder: "Describe the 2-3 most time-consuming tasks..." },
    t2: { text: "Which of these tasks are repetitive and could be automated?", placeholder: "E.g. data entry, sending template emails, generating reports..." },
    t3: { text: "What is your level of frustration with low-value repetitive tasks?", options: { "1": "Very low", "2": "Low", "3": "Moderate", "4": "High", "5": "Very high" } },
    t4: { text: "Estimate the time wasted each week on low-value tasks.", options: { "<2h": "Less than 2 hours", "2-5h": "2 to 5 hours", "5-10h": "5 to 10 hours", ">10h": "More than 10 hours" } },
    t5: { text: "What processes in your work seem slowest or most inefficient?", placeholder: "Describe the bottlenecks you experience daily..." },
    d1: { text: "When making an important decision, what information do you often lack?", placeholder: "E.g. real-time financial data, sales performance, HR indicators..." },
    d2: { text: "Do you have easy and quick access to the data you need to work?", options: { "1": "Rarely", "2": "Sometimes", "3": "Half the time", "4": "Often", "5": "Always" } },
    d3: { text: "How much time do you spend each week preparing or consolidating reports?", options: { "<1h": "Less than 1 hour", "1-3h": "1 to 3 hours", "3-5h": "3 to 5 hours", ">5h": "More than 5 hours" } },
    o1: { text: "What tools do you use daily? (ERP, CRM, Excel, communication tools…)", placeholder: "E.g. SAP, Salesforce, Excel, Teams, Notion, HubSpot..." },
    o2: { text: "What doesn't work well in these tools? What friction do you experience?", placeholder: "E.g. duplicate data entry, lack of integration, complex interfaces..." },
    o3: { text: "How do you evaluate the digital maturity of your team?", options: { "1": "Beginner", "2": "Developing", "3": "Intermediate", "4": "Advanced", "5": "Expert" } },
    ai1: { text: "What tasks could AI improve immediately in your view?", placeholder: "List 2-3 concrete use cases in your daily work..." },
    ai2: { text: "If you had a perfect AI assistant, what would it do for you every day?", placeholder: "Describe your ideal without technical constraints..." },
    ai3: { text: "What is your familiarity level with current AI tools? (ChatGPT, Copilot, etc.)", options: { "1": "Beginner — I don't use any", "2": "Curious — I've tried a few times", "3": "User — I use them occasionally", "4": "Regular — several times a week", "5": "Expert — I integrate them into my processes" } },
    ai4: { text: "Are there tasks you would like to delegate entirely to AI or automation?", placeholder: "Be specific — the more concrete, the more useful the audit..." },
    ceo1: { text: "What are your 3 priority strategic objectives for the next 12 months?", placeholder: "E.g. revenue growth, international expansion, margin improvement..." },
    ceo2: { text: "What are the biggest obstacles to your company's growth today?", placeholder: "E.g. human resources, information systems, processes, financing..." },
    ceo3: { text: "Evaluate the clarity of your strategic vision for your teams.", options: { "1": "Very unclear", "2": "Partially clear", "3": "Fairly clear", "4": "Clear", "5": "Crystal clear" } },
    ceo4: { text: "To what extent do your teams execute with discipline and rigor?", options: { "1": "Little discipline", "2": "Inconsistent", "3": "Average", "4": "Good", "5": "Excellent" } },
    ceo5: { text: "Do you have clearly defined and regularly tracked key performance indicators (KPIs)?", options: { "1": "Non-existent", "2": "Partial", "3": "Defined but rarely tracked", "4": "Well-defined and tracked", "5": "Highly structured and actionable" } },
    ceo6: { text: "What is the envisaged investment capacity for an AI transformation over 12 months?", options: { "<5k": "Less than €5,000", "5-15k": "€5,000 to €15,000", "15-30k": "€15,000 to €30,000", ">30k": "More than €30,000", "unknown": "Not yet defined" } },
    cfo1: { text: "What are your most time-consuming financial processes?", placeholder: "E.g. monthly close, consolidation, group reporting, cash management..." },
    cfo2: { text: "How long does it take you to close your monthly accounts?", options: { "<1j": "Less than 1 day", "1-3j": "1 to 3 days", "3-7j": "3 to 7 days", ">7j": "More than 7 days" } },
    cfo3: { text: "Do you have an automated and reliable cash flow forecast?", options: { "1": "Non-existent", "2": "Manual and unreliable", "3": "Partially automated", "4": "Well automated", "5": "Real-time and reliable" } },
    cfo4: { text: "Evaluate the reliability and availability of your real-time financial data.", options: { "1": "Very poor", "2": "Poor", "3": "Average", "4": "Good", "5": "Excellent" } },
    coo1: { text: "What are the main bottlenecks in your operations?", placeholder: "Describe where processes slow down or generate the most errors..." },
    coo2: { text: "Evaluate the standardization of your operational processes.", options: { "1": "None — everyone does it their own way", "2": "Poorly standardized", "3": "Partially standardized", "4": "Well standardized", "5": "Fully standardized and documented" } },
    coo3: { text: "How many manual errors does your team approximately generate per week?", options: { "0-5": "0 to 5 errors", "5-20": "5 to 20 errors", "20-50": "20 to 50 errors", ">50": "More than 50 errors" } },
    s1: { text: "Describe your current prospecting process, from identification to qualification.", placeholder: "Who does what, which tools, what timelines..." },
    s2: { text: "What proportion of your sales time is spent on administrative tasks?", options: { "<10%": "Less than 10%", "10-25%": "10 to 25%", "25-40%": "25 to 40%", ">40%": "More than 40%" } },
    s3: { text: "Evaluate the quality of your CRM and its actual usage rate by the team.", options: { "1": "Non-existent or never used", "2": "Used irregularly", "3": "Partially used", "4": "Well used", "5": "Optimal — reliable and complete data" } },
    s4: { text: "What are your biggest commercial challenges today?", placeholder: "E.g. lead qualification, sales cycle time, retention, conversion rate..." },
    ops1: { text: "What operational processes generate the most friction or errors?", placeholder: "Describe the problematic steps in your key workflows..." },
    ops2: { text: "Evaluate the standardization and documentation of your processes.", options: { "1": "No documentation", "2": "Poorly documented", "3": "Partially documented", "4": "Well documented", "5": "Fully documented and up to date" } },
    hr1: { text: "What are your biggest challenges in recruiting and retaining talent currently?", placeholder: "E.g. recruitment time, candidate quality, retention, onboarding..." },
    hr2: { text: "How long does your onboarding process last for a new employee?", options: { "<1w": "Less than 1 week", "1-2w": "1 to 2 weeks", "2-4w": "2 to 4 weeks", ">1m": "More than 1 month (structured)", "none": "No formalized process" } },
    hr3: { text: "Evaluate the quality of your performance evaluation process.", options: { "1": "Non-existent", "2": "Informal", "3": "Standard annual review", "4": "Structured and regular", "5": "Continuous and data-driven" } },
  },

  it: {
    g1: { text: "Descrivi brevemente le tue 3 principali responsabilità.", placeholder: "Es: gestione del team commerciale, reporting mensile, monitoraggio KPI..." },
    g2: { text: "Quante persone compongono il tuo team diretto?", options: { "0": "Lavoro da solo/a", "1-3": "Da 1 a 3 persone", "4-10": "Da 4 a 10 persone", "11-30": "Da 11 a 30 persone", "30+": "Più di 30 persone" } },
    t1: { text: "Quali attività richiedono più tempo ogni settimana?", placeholder: "Descrivi le 2-3 attività più dispendiose in termini di tempo..." },
    t2: { text: "Tra queste attività, quali sono ripetitive e potrebbero essere automatizzate?", placeholder: "Es: inserimento dati, invio di email tipo, generazione di report..." },
    t3: { text: "Qual è il tuo livello di frustrazione per i compiti ripetitivi a basso valore aggiunto?", options: { "1": "Molto basso", "2": "Basso", "3": "Moderato", "4": "Alto", "5": "Molto alto" } },
    t4: { text: "Stima il tempo perso ogni settimana in attività a basso valore aggiunto.", options: { "<2h": "Meno di 2 ore", "2-5h": "Da 2 a 5 ore", "5-10h": "Da 5 a 10 ore", ">10h": "Più di 10 ore" } },
    t5: { text: "Quali processi nel tuo lavoro ti sembrano più lenti o inefficienti?", placeholder: "Descrivi i colli di bottiglia che vivi quotidianamente..." },
    d1: { text: "Quando devi prendere una decisione importante, quali informazioni mancano spesso?", placeholder: "Es: dati finanziari in tempo reale, performance commerciale, indicatori HR..." },
    d2: { text: "Hai accesso facile e rapido ai dati di cui hai bisogno per lavorare?", options: { "1": "Raramente", "2": "A volte", "3": "La metà delle volte", "4": "Spesso", "5": "Sempre" } },
    d3: { text: "Quanto tempo dedichi ogni settimana alla preparazione o consolidamento dei report?", options: { "<1h": "Meno di 1 ora", "1-3h": "Da 1 a 3 ore", "3-5h": "Da 3 a 5 ore", ">5h": "Più di 5 ore" } },
    o1: { text: "Quali strumenti usi quotidianamente? (ERP, CRM, Excel, strumenti di comunicazione…)", placeholder: "Es: SAP, Salesforce, Excel, Teams, Notion, HubSpot..." },
    o2: { text: "Cosa non funziona bene in questi strumenti? Quali frizioni vivi?", placeholder: "Es: doppio inserimento dati, mancanza di integrazione, interfacce complesse..." },
    o3: { text: "Come valuti la maturità digitale del tuo team?", options: { "1": "Principiante", "2": "In sviluppo", "3": "Intermedio", "4": "Avanzato", "5": "Esperto" } },
    ai1: { text: "Quali attività potrebbe migliorare immediatamente l'IA secondo te?", placeholder: "Elenca 2-3 casi d'uso concreti nella tua quotidianità..." },
    ai2: { text: "Se avessi un assistente IA perfetto, cosa farebbe per te ogni giorno?", placeholder: "Descrivi il tuo ideale senza vincoli tecnici..." },
    ai3: { text: "Qual è il tuo livello di familiarità con gli strumenti IA attuali? (ChatGPT, Copilot, ecc.)", options: { "1": "Principiante — non ne uso", "2": "Curioso/a — ho provato qualche volta", "3": "Utente — li uso a volte", "4": "Regolare — più volte a settimana", "5": "Esperto/a — li integro nei miei processi" } },
    ai4: { text: "Ci sono attività che vorresti delegare interamente all'IA o all'automazione?", placeholder: "Sii preciso/a — più è concreto, più l'audit sarà utile..." },
    ceo1: { text: "Quali sono i tuoi 3 obiettivi strategici prioritari per i prossimi 12 mesi?", placeholder: "Es: crescita del fatturato, espansione internazionale, miglioramento dei margini..." },
    ceo2: { text: "Quali sono i principali ostacoli alla crescita della tua azienda oggi?", placeholder: "Es: risorse umane, sistemi informativi, processi, finanziamenti..." },
    ceo3: { text: "Valuta la chiarezza della tua visione strategica per i tuoi team.", options: { "1": "Molto confusa", "2": "Parzialmente chiara", "3": "Abbastanza chiara", "4": "Chiara", "5": "Cristallina" } },
    ceo4: { text: "In che misura i tuoi team eseguono con disciplina e rigore?", options: { "1": "Poca disciplina", "2": "Irregolare", "3": "Nella media", "4": "Buono", "5": "Eccellente" } },
    ceo5: { text: "Hai indicatori chiave di prestazione (KPI) chiaramente definiti e seguiti regolarmente?", options: { "1": "Inesistenti", "2": "Parziali", "3": "Definiti ma poco seguiti", "4": "Ben definiti e seguiti", "5": "Molto strutturati e actionable" } },
    ceo6: { text: "Qual è la capacità di investimento prevista per una trasformazione IA su 12 mesi?", options: { "<5k": "Meno di 5.000 €", "5-15k": "Da 5.000 € a 15.000 €", "15-30k": "Da 15.000 € a 30.000 €", ">30k": "Più di 30.000 €", "unknown": "Non ancora definito" } },
    cfo1: { text: "Quali sono i tuoi processi finanziari più dispendiosi in termini di tempo?", placeholder: "Es: chiusura mensile, consolidamento, reporting di gruppo, gestione della liquidità..." },
    cfo2: { text: "Quanto tempo ci vuole per chiudere i conti mensili?", options: { "<1j": "Meno di 1 giorno", "1-3j": "Da 1 a 3 giorni", "3-7j": "Da 3 a 7 giorni", ">7j": "Più di 7 giorni" } },
    cfo3: { text: "Disponi di una previsione di flusso di cassa automatizzata e affidabile?", options: { "1": "Inesistente", "2": "Manuale e poco affidabile", "3": "Parzialmente automatizzata", "4": "Ben automatizzata", "5": "In tempo reale e affidabile" } },
    cfo4: { text: "Valuta l'affidabilità e la disponibilità dei tuoi dati finanziari in tempo reale.", options: { "1": "Molto scarsa", "2": "Scarsa", "3": "Media", "4": "Buona", "5": "Eccellente" } },
    coo1: { text: "Quali sono i principali colli di bottiglia nelle tue operazioni?", placeholder: "Descrivi dove i processi rallentano o generano più errori..." },
    coo2: { text: "Valuta la standardizzazione dei tuoi processi operativi.", options: { "1": "Nessuna — ognuno fa a modo suo", "2": "Poco standardizzato", "3": "Parzialmente standardizzato", "4": "Ben standardizzato", "5": "Completamente standardizzato e documentato" } },
    coo3: { text: "Quanti errori manuali genera approssimativamente il tuo team ogni settimana?", options: { "0-5": "Da 0 a 5 errori", "5-20": "Da 5 a 20 errori", "20-50": "Da 20 a 50 errori", ">50": "Più di 50 errori" } },
    s1: { text: "Descrivi il tuo attuale processo di prospecting, dall'identificazione alla qualificazione.", placeholder: "Chi fa cosa, quali strumenti, quali tempi..." },
    s2: { text: "Quale proporzione del tuo tempo commerciale è dedicata ad attività amministrative?", options: { "<10%": "Meno del 10%", "10-25%": "Dal 10 al 25%", "25-40%": "Dal 25 al 40%", ">40%": "Più del 40%" } },
    s3: { text: "Valuta la qualità del tuo CRM e il suo tasso di utilizzo effettivo da parte del team.", options: { "1": "Inesistente o mai usato", "2": "Usato in modo irregolare", "3": "Usato parzialmente", "4": "Ben utilizzato", "5": "Ottimale — dati affidabili e completi" } },
    s4: { text: "Quali sono le tue maggiori sfide commerciali oggi?", placeholder: "Es: qualificazione dei lead, tempo del ciclo di vendita, fidelizzazione, tasso di conversione..." },
    ops1: { text: "Quali processi operativi generano più attrito o errori?", placeholder: "Descrivi i passaggi problematici nei tuoi workflow chiave..." },
    ops2: { text: "Valuta la standardizzazione e la documentazione dei tuoi processi.", options: { "1": "Nessuna documentazione", "2": "Poco documentato", "3": "Parzialmente documentato", "4": "Ben documentato", "5": "Completamente documentato e aggiornato" } },
    hr1: { text: "Quali sono le tue maggiori sfide nel reclutamento e nella fidelizzazione dei talenti attualmente?", placeholder: "Es: tempi di reclutamento, qualità dei candidati, fidelizzazione, onboarding..." },
    hr2: { text: "Quanto dura il tuo processo di onboarding per un nuovo dipendente?", options: { "<1w": "Meno di 1 settimana", "1-2w": "Da 1 a 2 settimane", "2-4w": "Da 2 a 4 settimane", ">1m": "Più di 1 mese (strutturato)", "none": "Nessun processo formalizzato" } },
    hr3: { text: "Valuta la qualità del tuo processo di valutazione delle prestazioni.", options: { "1": "Inesistente", "2": "Informale", "3": "Annuale standard", "4": "Strutturato e regolare", "5": "Continuo e basato sui dati" } },
  },
};

// ─── Email translations ─────────────────────────────────────────────────────
export const EMAIL_STRINGS: Record<Lang, {
  inviteSubject: (company: string) => string;
  inviteHello: (name: string) => string;
  inviteBody: (company: string, role: string) => string;
  inviteTime: string; inviteTimeDesc: string;
  inviteConfidential: string; inviteConfidentialDesc: string;
  inviteImpact: (company: string) => string;
  inviteCta: string;
  inviteLinkLabel: string;
  inviteSentBy: (sender: string) => string;
  invitePersonalLink: string;
  reminderSubject: (company: string, days: number) => string;
  reminderHello: (name: string) => string;
  reminderBody: (company: string, role: string) => string;
  reminderCta: string;
  thankYouSubject: (name: string) => string;
  thankYouTitle: (name: string) => string;
  thankYouBody: (company: string) => string;
  thankYouCta: string;
  thankYouFooter: (company: string) => string;
}> = {
  fr: {
    inviteSubject: (c) => `Votre invitation — Diagnostic IA ${c}`,
    inviteHello: (n) => `Bonjour ${n},`,
    inviteBody: (c, r) => `Vous avez été invité(e) à participer au <strong style="color:#fff;">Diagnostic IA de ${c}</strong>. En tant que <strong style="color:#00D4C8;">${r}</strong>, votre perspective est essentielle pour produire une analyse précise et actionnable.`,
    inviteTime: "20 à 30 minutes", inviteTimeDesc: "à compléter en une ou plusieurs fois",
    inviteConfidential: "Confidentiel", inviteConfidentialDesc: "vos réponses sont anonymisées dans le rapport",
    inviteImpact: (c) => `vos insights alimentent le plan IA de ${c}`,
    inviteCta: "Démarrer le diagnostic →",
    inviteLinkLabel: "Ou copiez ce lien dans votre navigateur :",
    inviteSentBy: (s) => `Envoyé par <strong style="color:#9CA3AF;">${s}</strong> via Aumentia`,
    invitePersonalLink: "Ce lien est personnel et unique — ne le partagez pas.",
    reminderSubject: (c, d) => `Rappel — Diagnostic IA ${c} (${d} jours)`,
    reminderHello: (n) => `Bonjour ${n},`,
    reminderBody: (c, r) => `Votre questionnaire pour le <strong style="color:#fff;">Diagnostic IA de ${c}</strong> est toujours en attente. Il ne reste que quelques minutes — votre avis en tant que <strong style="color:#C8922A;">${r}</strong> est précieux.`,
    reminderCta: "Compléter maintenant (20 min) →",
    thankYouSubject: (n) => `Merci ${n} — Vos résultats du Diagnostic IA`,
    thankYouTitle: (n) => `Merci ${n} !`,
    thankYouBody: (c) => `Votre contribution au <strong style="color:#fff;">Diagnostic IA de ${c}</strong> a bien été enregistrée. Consultez votre tableau de bord personnalisé ci-dessous.`,
    thankYouCta: "Voir mes résultats →",
    thankYouFooter: (c) => `Le rapport complet sera partagé avec la direction de ${c} par Alexandre de l'équipe Aumentia.`,
  },
  en: {
    inviteSubject: (c) => `Your invitation — AI Diagnostic ${c}`,
    inviteHello: (n) => `Hello ${n},`,
    inviteBody: (c, r) => `You have been invited to participate in the <strong style="color:#fff;">AI Diagnostic of ${c}</strong>. As a <strong style="color:#00D4C8;">${r}</strong>, your perspective is essential to produce a precise and actionable analysis.`,
    inviteTime: "20 to 30 minutes", inviteTimeDesc: "complete in one or several sessions",
    inviteConfidential: "Confidential", inviteConfidentialDesc: "your answers are anonymized in the report",
    inviteImpact: (c) => `your insights feed the AI plan of ${c}`,
    inviteCta: "Start the diagnostic →",
    inviteLinkLabel: "Or copy this link in your browser:",
    inviteSentBy: (s) => `Sent by <strong style="color:#9CA3AF;">${s}</strong> via Aumentia`,
    invitePersonalLink: "This link is personal and unique — do not share it.",
    reminderSubject: (c, d) => `Reminder — AI Diagnostic ${c} (${d} days)`,
    reminderHello: (n) => `Hello ${n},`,
    reminderBody: (c, r) => `Your questionnaire for the <strong style="color:#fff;">AI Diagnostic of ${c}</strong> is still pending. It only takes a few minutes — your opinion as a <strong style="color:#C8922A;">${r}</strong> is valuable.`,
    reminderCta: "Complete now (20 min) →",
    thankYouSubject: (n) => `Thank you ${n} — Your AI Diagnostic results`,
    thankYouTitle: (n) => `Thank you ${n}!`,
    thankYouBody: (c) => `Your contribution to the <strong style="color:#fff;">AI Diagnostic of ${c}</strong> has been recorded. Check your personalized dashboard below.`,
    thankYouCta: "See my results →",
    thankYouFooter: (c) => `The full report will be shared with ${c}'s leadership by Alexandre from the Aumentia team.`,
  },
  it: {
    inviteSubject: (c) => `Il tuo invito — Diagnostico IA ${c}`,
    inviteHello: (n) => `Ciao ${n},`,
    inviteBody: (c, r) => `Sei stato/a invitato/a a partecipare al <strong style="color:#fff;">Diagnostico IA di ${c}</strong>. In qualità di <strong style="color:#00D4C8;">${r}</strong>, la tua prospettiva è essenziale per produrre un'analisi precisa e actionable.`,
    inviteTime: "20-30 minuti", inviteTimeDesc: "da completare in una o più sessioni",
    inviteConfidential: "Riservato", inviteConfidentialDesc: "le tue risposte sono anonimizzate nel report",
    inviteImpact: (c) => `le tue intuizioni alimentano il piano IA di ${c}`,
    inviteCta: "Inizia il diagnostico →",
    inviteLinkLabel: "Oppure copia questo link nel tuo browser:",
    inviteSentBy: (s) => `Inviato da <strong style="color:#9CA3AF;">${s}</strong> tramite Aumentia`,
    invitePersonalLink: "Questo link è personale e unico — non condividerlo.",
    reminderSubject: (c, d) => `Promemoria — Diagnostico IA ${c} (${d} giorni)`,
    reminderHello: (n) => `Ciao ${n},`,
    reminderBody: (c, r) => `Il tuo questionario per il <strong style="color:#fff;">Diagnostico IA di ${c}</strong> è ancora in attesa. Ci vogliono solo pochi minuti — la tua opinione in qualità di <strong style="color:#C8922A;">${r}</strong> è preziosa.`,
    reminderCta: "Completa ora (20 min) →",
    thankYouSubject: (n) => `Grazie ${n} — I tuoi risultati del Diagnostico IA`,
    thankYouTitle: (n) => `Grazie ${n}!`,
    thankYouBody: (c) => `Il tuo contributo al <strong style="color:#fff;">Diagnostico IA di ${c}</strong> è stato registrato. Consulta la tua dashboard personale qui sotto.`,
    thankYouCta: "Vedi i miei risultati →",
    thankYouFooter: (c) => `Il report completo sarà condiviso con la direzione di ${c} da Alexandre del team Aumentia.`,
  },
};

export const LANG_LABELS: Record<Lang, string> = {
  fr: "🇫🇷 Français",
  en: "🇬🇧 English",
  it: "🇮🇹 Italiano",
};
