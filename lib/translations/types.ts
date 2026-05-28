export interface Translations {
  nav: {
    home: string;
    process: string;
    offer: string;
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
    links: { title1: string; audit: string; coaching: string; title2: string };
    rights: string;
  };
  auditPage: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    steps: {
      num: string;
      title: string;
      duration: string;
      desc: string;
      deliverables: string[];
    }[];
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
