import type { Translations } from "./types";

const fr: Translations = {
  nav: {
    home: "Accueil",
    process: "Le process",
    offer: "L'offre",
    contact: "Contact",
    cta: "Réserver un diagnostic",
  },
  hero: {
    badge: "Aumentia Growth OS Sprint",
    h1: "On élimine le chaos opérationnel dans les PME pour rendre leur croissance enfin pilotable.",
    subtitle: "Diagnostic. Structuration. IA utile. Systèmes. En 30 jours, votre entreprise passe du chaos au pilotable — et vous passez de pompier à CEO.",
    cta1: "Réserver un diagnostic gratuit",
    cta2: "Voir le Sprint 30 jours",
  },
  problem: {
    badge: "Le problème",
    title: "Votre entreprise tourne. Mais vous tournez avec elle.",
    items: [
      "Tout passe par vous — chaque décision, chaque urgence, chaque problème",
      "Vos équipes sont compétentes mais ne savent pas quoi prioriser sans vous",
      "Vous avez des outils partout mais aucune vision claire de ce qui se passe",
      "Vos KPIs sont inexistants, flous, ou jamais regardés",
      "Vous perdez 10h+ par semaine sur des sujets qui ne devraient pas vous passer par les mains",
      "La croissance est là. Le marché est là. Mais le système ne suit pas.",
    ],
    conclusion: "Ce n'est pas un problème de travail. C'est un problème de structure. Et ça se règle.",
  },
  consequences: {
    badge: "L'impact réel",
    title: "Ce que le chaos opérationnel vous coûte vraiment.",
    items: [
      {
        title: "Vous êtes le goulot d'étranglement",
        desc: "Impossible de lever la tête du guidon. Toutes les décisions remontent vers vous. Vous êtes la pierre angulaire — et le point de blocage.",
      },
      {
        title: "Vos décisions sont lentes ou mauvaises",
        desc: "Sans données claires et KPIs définis, vous pilotez à vue. Chaque décision importante prend 3x trop de temps — ou est prise trop tard.",
      },
      {
        title: "Votre équipe n'est pas à son potentiel",
        desc: "Quand les rôles ne sont pas clairs et les priorités changent chaque semaine, les meilleurs éléments se démotivent ou partent.",
      },
      {
        title: "Votre croissance est plafonnée",
        desc: "Vous avez le marché. Vous avez les clients. Mais l'opérationnel ne permet pas de scaler. Le chaos coûte de l'argent — chaque jour.",
      },
    ],
  },
  solution: {
    badge: "La solution",
    title: "Aumentia",
    titleAccent: "Growth OS Sprint",
    subtitle: "Un sprint d'exécution de 30 jours. Pas de conseil théorique — on construit votre système opérationnel de A à Z, avec vous, dans votre entreprise.",
    pillars: [
      {
        icon: "🔍",
        title: "Diagnostic du chaos",
        desc: "On cartographie exactement où sont les blocages, les pertes de temps et les dépendances qui vous empêchent de passer à l'échelle.",
      },
      {
        icon: "🏗️",
        title: "Structuration opérationnelle",
        desc: "Routines, KPIs, responsabilités claires. Les bases d'une entreprise qui tourne sans que tout remonte vers vous.",
      },
      {
        icon: "⚡",
        title: "IA & automatisation utile",
        desc: "Pas de gadgets. Uniquement les automatisations qui éliminent les tâches répétitives et libèrent du temps dès la première semaine.",
      },
      {
        icon: "🎯",
        title: "Stabilisation + plan 90J",
        desc: "Adoption par l'équipe, ajustements en temps réel, et un plan d'exécution concret pour les 90 jours suivants.",
      },
    ],
  },
  process: {
    badge: "Le process",
    title: "30 jours. 4 phases. Un système.",
    subtitle: "Un sprint structuré — pas une mission de conseil qui traîne en longueur.",
    weeks: [
      {
        num: "01",
        label: "Semaine 1",
        title: "Diagnostic du chaos",
        items: [
          "Cartographie complète de vos processus critiques",
          "Identification des 3 goulots d'étranglement majeurs",
          "Mesure de votre dépendance CEO",
          "Priorisation des actions à fort impact",
        ],
      },
      {
        num: "02",
        label: "Semaine 2",
        title: "Structuration",
        items: [
          "Définition claire des rôles et responsabilités",
          "Mise en place des KPIs clés par fonction",
          "Design du rituel de pilotage hebdomadaire",
          "Documentation des processus critiques",
        ],
      },
      {
        num: "03",
        label: "Semaine 3",
        title: "IA & automatisation",
        items: [
          "Sélection des automatisations à ROI immédiat",
          "Déploiement des copilotes et workflows",
          "Formation équipe sur les nouveaux outils",
          "Intégration dans les processus existants",
        ],
      },
      {
        num: "04",
        label: "Semaine 4",
        title: "Stabilisation",
        items: [
          "Tests et ajustements du système complet",
          "Adoption et validation par l'équipe",
          "Revue des premiers résultats mesurables",
          "Remise du plan d'exécution 90 jours",
        ],
      },
    ],
  },
  offer: {
    badge: "L'offre",
    title: "Aumentia",
    titleAccent: "Growth OS Sprint",
    subtitle: "Une seule offre. Un engagement clair. Un résultat mesurable.",
    price: "7 500 €",
    priceLabel: "HTVA · Paiement unique",
    duration: "30",
    durationLabel: "jours pour éliminer le chaos opérationnel",
    deliverables: [
      { icon: "🔍", title: "Diagnostic chaos complet", desc: "Analyse approfondie de vos opérations. Goulots d'étranglement et dépendances CEO identifiés et documentés." },
      { icon: "📊", title: "Système de pilotage KPI", desc: "Dashboard opérationnel, KPIs clés, rituel de pilotage hebdomadaire en place et fonctionnel." },
      { icon: "👥", title: "Structuration équipe", desc: "Rôles clairs, responsabilités définies, protocoles de décision sans passer par vous." },
      { icon: "⚡", title: "3 automatisations", desc: "Sur vos processus les plus chronophages. ROI mesurable dès J+30." },
      { icon: "📋", title: "Plan d'exécution 90J", desc: "Feuille de route opérationnelle complète pour les 3 mois après le sprint." },
      { icon: "🎯", title: "30 jours de support", desc: "Accompagnement complet pendant le déploiement. Chaque blocage résolu en moins de 24h." },
    ],
    cta: "Réserver mon Sprint",
    guarantee: "Si après 30 jours vous n'avez pas libéré au moins 5h/semaine, on continue gratuitement.",
  },
  proof: {
    badge: "Pourquoi Aumentia",
    title: "Une approche terrain. Pas du conseil théorique.",
    items: [
      {
        icon: "📐",
        title: "Méthode Scaling Up",
        desc: "Formé directement sur la méthode Verne Harnish — le playbook des PME qui passent de 1M à 100M de CA.",
      },
      {
        icon: "🏭",
        title: "Expérience opérationnelle PME",
        desc: "On a vécu les mêmes blocages que vous. On ne diagnostique pas depuis l'extérieur — on connaît de l'intérieur.",
      },
      {
        icon: "⚙️",
        title: "Systèmes, pas recommandations",
        desc: "On ne livre pas un rapport PowerPoint. On construit les systèmes et on s'assure qu'ils tournent dans votre réalité.",
      },
      {
        icon: "📏",
        title: "Résultats mesurables",
        desc: "Heures libérées, décisions autonomisées, KPIs actifs. Tout se mesure — avant et après le sprint.",
      },
    ],
  },
  social: {
    badge: "Ils ont fait le Sprint",
    title: "Ce qu'ils disent.",
    items: [
      {
        quote: "En 4 semaines, j'ai récupéré mes matinées. Mon équipe prend maintenant 80% des décisions sans moi. Je n'aurais pas cru ça possible.",
        name: "Thomas R.",
        role: "CEO · Agence · 18 collaborateurs",
      },
      {
        quote: "Le diagnostic initial m'a ouvert les yeux. On perdait 15h par semaine sur des tâches qui auraient pu être réglées depuis des mois.",
        name: "Sophie M.",
        role: "Directrice · Cabinet de conseil · Lyon",
      },
      {
        quote: "J'ai enfin pu partir une semaine sans téléphone. L'entreprise a tourné. C'est con, mais c'est la première fois en 8 ans.",
        name: "Marco D.",
        role: "Fondateur · PME · 35 personnes",
      },
    ],
  },
  diagnostic: {
    badge: "Diagnostic gratuit",
    title: "Pas encore prêt pour le Sprint ?",
    titleAccent: "Commencez par le diagnostic.",
    subtitle: "Renseignez vos coordonnées. Alexandre analyse votre situation et revient vers vous avec un plan clair — sans engagement.",
    form: {
      name: "Votre nom",
      email: "Votre email professionnel",
      company: "Votre entreprise",
      role: "Votre rôle",
      rolePlaceholder: "Sélectionnez votre rôle",
      roles: {
        ceo: "CEO / Directeur Général",
        coo: "COO / Directeur Opérations",
        cfo: "CFO / Directeur Financier",
        other: "Autre dirigeant",
      },
      employees: "Taille de l'entreprise",
      employeesPlaceholder: "Nombre de collaborateurs",
      submit: "Demander mon diagnostic gratuit →",
      sending: "Envoi en cours…",
      success: "Demande reçue !",
      successSub: "Alexandre vous contactera dans les 24h pour lancer votre diagnostic.",
    },
  },
  finalcta: {
    title: "Votre entreprise mérite un système qui tourne sans vous.",
    subtitle: "30 minutes pour diagnostiquer votre chaos opérationnel. Gratuit, sans engagement.",
    cta: "Réserver mon diagnostic gratuit",
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
    bhag: "BHAG : Aider 1 million de dirigeants à piloter leur croissance avec clarté d'ici 2040.",
    purpose: "Aumentia existe pour combler le fossé entre l'ambition de croissance et la réalité opérationnelle. On aide les dirigeants de PME à construire des systèmes — pas à courir après les problèmes.",
    cta: "Parler avec Alexandre",
  },
  footer: {
    tagline: "Système d'exécution pour PME.",
    links: {
      title1: "Solutions",
      audit: "Audit IA",
      coaching: "Coaching IA",
      title2: "Contact",
    },
    rights: "Tous droits réservés.",
  },

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

  contactPage: {
    badge: "Contact",
    title: "Parlons de votre",
    title2: "situation.",
    subtitle: "30 minutes suffisent pour diagnostiquer votre chaos opérationnel et voir si le Sprint est fait pour vous.",
    form: {
      name: "Votre prénom",
      email: "Votre email professionnel",
      company: "Votre entreprise",
      message: "Décrivez votre situation (optionnel)",
      submit: "Envoyer le message",
      sending: "Envoi...",
      success: "Message envoyé ! Alexandre revient vers vous sous 24h.",
    },
    info: {
      demo: { title: "Réserver un diagnostic", desc: "30 min pour diagnostiquer votre chaos. Gratuit." },
      email: { title: "Email direct", value: "alex@aumentia.ai" },
      phone: { title: "Téléphone", value: "+32 471 662 563" },
    },
  },
};

export default fr;
