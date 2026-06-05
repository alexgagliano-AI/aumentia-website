export interface Translations {
  nav: {
    home: string;
    process: string;
    offer: string;
    coaching: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    h1: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  problem: {
    badge: string;
    title: string;
    items: string[];
    conclusion: string;
  };
  consequences: {
    badge: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  solution: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    pillars: { icon: string; title: string; desc: string }[];
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    weeks: {
      num: string;
      label: string;
      title: string;
      items: string[];
    }[];
  };
  offer: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    price: string;
    priceLabel: string;
    duration: string;
    durationLabel: string;
    deliverables: { icon: string; title: string; desc: string }[];
    cta: string;
    guarantee: string;
  };
  proof: {
    badge: string;
    title: string;
    items: { icon: string; title: string; desc: string }[];
  };
  social: {
    badge: string;
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  diagnostic: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      role: string;
      rolePlaceholder: string;
      roles: { ceo: string; coo: string; cfo: string; other: string };
      employees: string;
      employeesPlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      successSub: string;
    };
  };
  finalcta: {
    title: string;
    subtitle: string;
    cta: string;
  };
  values: {
    badge: string;
    title: string;
    subtitle: string;
    items: { letter: string; title: string; desc: string }[];
  };
  about: {
    badge: string;
    name: string;
    role: string;
    bhag: string;
    purpose: string;
    cta: string;
  };
  footer: {
    tagline: string;
    links: { title1: string; audit: string; coaching: string; investors: string; title2: string };
    rights: string;
  };
  investorPage: {
    meta: { title: string; description: string };
    hero: {
      badge: string; h1: string; h1accent: string; subtitle: string;
      cta_primary: string; cta_secondary: string;
    };
    metrics: { value: string; label: string; sub: string }[];
    why: {
      badge: string; title: string;
      problem_title: string; problem_items: string[];
      advantage_title: string; advantage_items: string[];
    };
    model: {
      badge: string; title: string;
      steps: { num: string; name: string; price: string; label: string }[];
    };
    projections: {
      badge: string; title: string; subtitle: string;
      col_year: string; col_revenue: string; col_hypothesis: string;
      rows: { year: string; revenue: string; hypothesis: string }[];
      note: string;
    };
    funds: {
      badge: string; title: string;
      items: { pct: string; title: string; desc: string }[];
    };
    team: {
      badge: string; title: string;
      members: { name: string; role: string; bio: string }[];
    };
    cta: { title: string; subtitle: string; btn: string; contact: string };
    modal: {
      title: string; subtitle: string;
      firstname: string; lastname: string; email: string;
      company: string; ticket: string; ticket_options: string[];
      message: string; message_placeholder: string;
      submit: string; sending: string; success: string; success_sub: string;
    };
  };
  auditPage: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    cta_hero: string;
    chaos_badge: string;
    chaos_title: string;
    chaos_subtitle: string;
    chaos_items: string[];
    chaos_conclusion: string;
    method_badge: string;
    method_title: string;
    method_subtitle: string;
    phases: {
      num: string;
      label: string;
      title: string;
      duration: string;
      desc: string;
      deliverables: string[];
    }[];
    why_badge: string;
    why_title: string;
    why_subtitle: string;
    why_items: { icon: string; title: string; desc: string }[];
    faq_badge: string;
    faq_title: string;
    faq_items: { q: string; a: string }[];
    cta: { title: string; subtitle: string; btn: string };
  };
  coachingPage: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    coaches: {
      id: string;
      name: string;
      tagline: string;
      desc: string;
      status: string;
      cta: string;
      link: string | null;
      tags: string[];
    }[];
    why: {
      title: string;
      items: { icon: string; title: string; desc: string }[];
    };
  };
  contactPage: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
    };
    info: {
      demo: { title: string; desc: string };
      email: { title: string; value: string };
      phone: { title: string; value: string };
    };
  };
}
