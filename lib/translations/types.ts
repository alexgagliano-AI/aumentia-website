export interface Translations {
  nav: {
    home: string;
    audit: string;
    coaching: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
  problem: {
    badge: string;
    title: string;
    items: string[];
    conclusion: string;
  };
  pillars: {
    badge: string;
    title: string;
    subtitle: string;
    audit: { title: string; desc: string; cta: string };
    coaching: { title: string; desc: string; cta: string };
  };
  results: {
    badge: string;
    title: string;
    items: { value: string; label: string }[];
    promise: string;
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
