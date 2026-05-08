import type { Translations } from "./types";

const fr: Translations = {
  nav: {
    home: "Accueil",
    audit: "Audit IA",
    coaching: "Coaching IA",
    contact: "Contact",
    cta: "Réserver une démo",
  },
  hero: {
    badge: "L'entreprise augmentée",
    title1: "Révélez la puissance",
    title2: "de l'IA pour votre",
    title3: "entreprise.",
    subtitle: "Parce qu'attendre n'est plus une option. Vos équipes, vos clients et votre marché évoluent trop vite.",
    cta1: "Réserver une démo",
    cta2: "Découvrir nos offres",
    stat1: { value: "+20%", label: "d'efficacité en 90 jours" },
    stat2: { value: "+15h", label: "libérées par semaine" },
    stat3: { value: "-25%", label: "de coûts opérationnels" },
  },
  problem: {
    badge: "Le constat",
    title: "90% des PME veulent scaler. Peu y arrivent sans l'IA.",
    items: [
      "Trop de complexité, pas assez de clarté",
      "Trop de tâches répétitives qui épuisent vos équipes",
      "Trop de dépendance à l'humain pour tout",
      "Zéro temps pour penser stratégique",
      "Des données non exploitées qui dorment",
      "Un retard concurrentiel qui coûte cher chaque mois",
    ],
    conclusion: "L'IA est mal comprise, mal utilisée ou totalement absente. Et ce retard se paie.",
  },
  pillars: {
    badge: "Nos deux piliers",
    title: "Audit IA + Coaching IA.",
    subtitle: "Deux approches complémentaires pour transformer votre entreprise avec l'IA.",
    audit: {
      title: "Audit & Implémentation IA",
      desc: "Votre roadmap IA complète : opportunités, ROI, quick wins, automatisations, architecture. On ne promet pas, on livre.",
      cta: "Voir l'offre Audit",
    },
    coaching: {
      title: "Coaching IA",
      desc: "Des coachs IA disponibles 24/7 pour accélérer votre croissance, votre performance et votre exécution.",
      cta: "Découvrir les coachs",
    },
  },
  results: {
    badge: "Résultats",
    title: "Ce qu'on livre en 90 jours.",
    items: [
      { value: "+20%", label: "d'efficacité globale" },
      { value: "+15h", label: "libérées/semaine pour le dirigeant" },
      { value: "-25%", label: "de coûts opérationnels" },
      { value: "+30%", label: "de vitesse sur le pipeline commercial" },
      { value: "0", label: "tâche répétitive non automatisée" },
      { value: "∞", label: "dashboards temps réel" },
    ],
    promise: "L'efficacité augmentée. Sans complexité, sans jargon, sans transformation douloureuse.",
  },
  values: {
    badge: "Nos valeurs",
    title: "NOW.",
    subtitle: "Not Only Widgets. Now Or Never. Le moment d'agir, c'est maintenant.",
    items: [
      {
        letter: "B",
        title: "Business First, Tech After",
        desc: "On commence par votre ROI, pas par la technologie. L'IA est un outil, pas une fin.",
      },
      {
        letter: "S",
        title: "Security",
        desc: "On sécurise ce qu'on livre. Zéro promesse sans garantie. Ce qu'on ne maîtrise pas, on ne le vend pas.",
      },
      {
        letter: "P",
        title: "Positivity Mindset",
        desc: "On avance avec énergie, même dans la complexité. Chaque problème est une opportunité.",
      },
      {
        letter: "W",
        title: "We Use What We Sell",
        desc: "On vit notre produit. On est notre meilleur client. Aumentia tourne à l'IA.",
      },
    ],
  },
  about: {
    badge: "Le fondateur",
    name: "Alexandre Gagliano",
    role: "CEO & Fondateur, Aumentia",
    bhag: "BHAG : Aider 1 million de personnes grâce à l'IA d'ici 2040.",
    purpose: "Aumentia existe pour combler le fossé entre l'IA et le ROI réel. On aide les gens à utiliser l'IA avec de vrais résultats — pas juste des démos impressionnantes.",
    cta: "Réserver un appel avec Alexandre",
  },
  footer: {
    tagline: "L'entreprise augmentée.",
    links: {
      title1: "Solutions",
      audit: "Audit IA",
      coaching: "Coaching IA",
      title2: "Contact",
    },
    rights: "Tous droits réservés.",
  },

  // Page Audit
  auditPage: {
    badge: "Offre Audit",
    title: "Votre roadmap IA,",
    title2: "livrée en 3 étapes.",
    subtitle: "Pas de jargon, pas de promesses vides. On analyse, on implémente, on fait tourner.",
    steps: [
      {
        num: "01",
        title: "Audit IA",
        duration: "2–3 semaines",
        desc: "On plonge dans vos processus, vos outils, vos données. On identifie les opportunités IA à fort ROI, les quick wins et les risques. Vous repartez avec une roadmap complète et priorisée.",
        deliverables: [
          "Cartographie de vos processus actuels",
          "Identification des opportunités IA (ROI priorisé)",
          "Quick wins actionnables immédiatement",
          "Architecture IA recommandée",
          "Roadmap 90 jours détaillée",
        ],
      },
      {
        num: "02",
        title: "Implémentation",
        duration: "8–10 semaines",
        desc: "On passe à l'action. Automatisations, intégrations, dashboards, agents IA — on construit ce qui a été défini dans l'audit. Vos équipes sont formées, vos processus transformés.",
        deliverables: [
          "Automatisations des tâches répétitives",
          "Intégrations IA dans vos outils existants",
          "Dashboards et reporting temps réel",
          "Formation de vos équipes",
          "Documentation complète",
        ],
      },
      {
        num: "03",
        title: "Run & Optimize",
        duration: "Continu",
        desc: "L'IA ne s'installe pas, elle s'entretient. On monitore, on optimise, on fait évoluer vos systèmes IA en continu pour qu'ils restent performants et alignés avec votre business.",
        deliverables: [
          "Monitoring continu des performances",
          "Optimisation mensuelle des systèmes",
          "Mises à jour et nouvelles intégrations",
          "Support prioritaire",
          "Reporting ROI mensuel",
        ],
      },
    ],
    cta: {
      title: "Prêt à passer à l'action ?",
      subtitle: "Réservez un appel de découverte gratuit de 30 minutes.",
      btn: "Réserver une démo gratuite",
    },
  },

  // Page Coaching
  coachingPage: {
    badge: "Coaching IA",
    title: "Vos coachs IA,",
    title2: "disponibles 24/7.",
    subtitle: "Des intelligences artificielles entraînées sur les meilleures méthodologies mondiales. Accessible via Telegram, quand vous en avez besoin.",
    coaches: [
      {
        id: "scaling-up",
        name: "Coach Scaling Up",
        tagline: "Croissance d'entreprise",
        desc: "Basé sur la méthode Scaling Up de Verne Harnish. Stratégie, OKR, Rocks trimestriels, réunions efficaces — ce coach connaît le playbook de croissance des entreprises qui scalent.",
        status: "active",
        cta: "Démarrer sur Telegram",
        link: "https://t.me/ScalingUpCoachBot",
        tags: ["Stratégie", "OKR", "Scaling Up", "Leadership"],
      },
      {
        id: "personal",
        name: "Coach Personnel",
        tagline: "Développement personnel & professionnel",
        desc: "Mindset, gestion du temps, habitudes de haute performance, clarté sur vos objectifs de vie. Un coach qui vous connaît et s'adapte à votre rythme.",
        status: "soon",
        cta: "Bientôt disponible",
        link: null,
        tags: ["Mindset", "Habitudes", "Performance", "Clarté"],
      },
      {
        id: "sport",
        name: "Coach Sportif & Nutrition",
        tagline: "Corps et énergie au maximum",
        desc: "Plans d'entraînement personnalisés, nutrition optimisée, récupération intelligente. Parce qu'un dirigeant performant a besoin d'un corps qui suit.",
        status: "soon",
        cta: "Bientôt disponible",
        link: null,
        tags: ["Sport", "Nutrition", "Énergie", "Récupération"],
      },
      {
        id: "execution",
        name: "Coach Exécution",
        tagline: "Exécutez comme Dan Martell",
        desc: "Inspiré de Buy Back Your Time. Délégation, systèmes, recrutement, productivité CEO. Ce coach vous aide à travailler sur votre entreprise, pas dedans.",
        status: "soon",
        cta: "Bientôt disponible",
        link: null,
        tags: ["Délégation", "Systèmes", "CEO", "Buy Back"],
      },
    ],
    why: {
      title: "Pourquoi des coachs IA ?",
      items: [
        { icon: "🕐", title: "Disponible 24/7", desc: "Posez vos questions à 23h avant une réunion importante. Votre coach est là." },
        { icon: "🧠", title: "Entraîné sur le meilleur", desc: "Chaque coach maîtrise sa méthodologie en profondeur. Pas d'approximations." },
        { icon: "💰", title: "10x moins cher", desc: "Un coach humain expert coûte des milliers par mois. Notre IA, une fraction." },
        { icon: "📱", title: "Via Telegram", desc: "Pas d'app à installer. Votre coach est dans votre téléphone, là où vous êtes." },
      ],
    },
  },

  // Page Contact
  contactPage: {
    badge: "Contact",
    title: "Parlons de votre",
    title2: "projet IA.",
    subtitle: "30 minutes suffisent pour identifier vos opportunités prioritaires.",
    form: {
      name: "Votre prénom",
      email: "Votre email professionnel",
      company: "Votre entreprise",
      message: "Décrivez votre situation (optionnel)",
      submit: "Envoyer le message",
      sending: "Envoi...",
      success: "Message envoyé ! On revient vers vous sous 24h.",
    },
    info: {
      demo: { title: "Réserver une démo", desc: "30 min pour identifier vos opportunités IA. Gratuit." },
      email: { title: "Email direct", value: "alex@aumentia.ai" },
      phone: { title: "Téléphone", value: "+32 471 662 563" },
    },
  },
};

export default fr;

