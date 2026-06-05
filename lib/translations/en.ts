import type { Translations } from "./types";

const en: Translations = {
  nav: {
    home: "Home",
    process: "The process",
    offer: "The offer",
    coaching: "AI Coaching",
    contact: "Contact",
    cta: "Book a diagnosis",
  },
  hero: {
    badge: "Aumentia Growth OS Sprint",
    h1: "We eliminate operational chaos in SMBs to make their growth finally manageable.",
    subtitle: "Diagnosis. Structuring. Useful AI. Systems. In 30 days, your company goes from chaos to manageable — and you go from firefighter to CEO.",
    cta1: "Book a free diagnosis",
    cta2: "See the 30-day Sprint",
  },
  problem: {
    badge: "The problem",
    title: "Your business is running. But you're running it on fumes.",
    items: [
      "Everything goes through you — every decision, every fire, every problem",
      "Your team is capable but can't prioritize without you",
      "You have tools everywhere but no clear picture of what's really happening",
      "Your KPIs are non-existent, unclear, or never looked at",
      "You lose 10h+ per week on things that shouldn't reach your desk",
      "The growth is there. The market is there. But the system can't keep up.",
    ],
    conclusion: "This isn't a hard work problem. It's a structure problem. And it's fixable.",
  },
  consequences: {
    badge: "The real impact",
    title: "What operational chaos is really costing you.",
    items: [
      {
        title: "You are the bottleneck",
        desc: "Impossible to lift your head and steer strategically. All decisions escalate to you. You're the cornerstone — and the chokepoint.",
      },
      {
        title: "Your decisions are slow or wrong",
        desc: "Without clear data and defined KPIs, you're flying blind. Every important decision takes 3x too long — or is made too late.",
      },
      {
        title: "Your team underperforms",
        desc: "When roles aren't clear and priorities change every week, your best people disengage or leave.",
      },
      {
        title: "Your growth is capped",
        desc: "You have the market. You have the clients. But operations can't scale. Chaos costs money — every single day.",
      },
    ],
  },
  solution: {
    badge: "The solution",
    title: "Aumentia",
    titleAccent: "Growth OS Sprint",
    subtitle: "A 30-day execution sprint. No theoretical consulting — we build your operational system from A to Z, with you, inside your company.",
    pillars: [
      {
        icon: "🔍",
        title: "Chaos diagnosis",
        desc: "We map exactly where the bottlenecks, time losses and CEO dependencies are that prevent you from scaling.",
      },
      {
        icon: "🏗️",
        title: "Operational structuring",
        desc: "Routines, KPIs, clear responsibilities. The foundation of a company that runs without everything escalating to you.",
      },
      {
        icon: "⚡",
        title: "Useful AI & automation",
        desc: "No gadgets. Only automations that eliminate repetitive tasks and free up time from day one.",
      },
      {
        icon: "🎯",
        title: "Stabilization + 90-day plan",
        desc: "Team adoption, real-time adjustments, and a concrete execution plan for the next 90 days.",
      },
    ],
  },
  process: {
    badge: "The process",
    title: "30 days. 4 phases. One system.",
    subtitle: "A structured sprint — not a consulting mission that drags on forever.",
    weeks: [
      {
        num: "01",
        label: "Week 1",
        title: "Chaos Diagnosis",
        items: [
          "Full mapping of your critical processes",
          "Identification of 3 major bottlenecks",
          "CEO dependency measurement",
          "High-impact action prioritization",
        ],
      },
      {
        num: "02",
        label: "Week 2",
        title: "Structuring",
        items: [
          "Clear role and responsibility definition",
          "Key KPIs set up per function",
          "Weekly steering ritual design",
          "Critical process documentation",
        ],
      },
      {
        num: "03",
        label: "Week 3",
        title: "AI & Automation",
        items: [
          "Selection of immediate-ROI automations",
          "Deployment of useful AI copilots",
          "Team training on new workflows",
          "Integration into existing processes",
        ],
      },
      {
        num: "04",
        label: "Week 4",
        title: "Stabilization",
        items: [
          "Full system testing and adjustments",
          "Team adoption and validation",
          "First measurable results review",
          "90-day execution plan handover",
        ],
      },
    ],
  },
  offer: {
    badge: "The offer",
    title: "Aumentia",
    titleAccent: "Growth OS Sprint",
    subtitle: "One offer. One clear commitment. One measurable result.",
    price: "€7,500",
    priceLabel: "excl. VAT · One-time payment",
    duration: "30",
    durationLabel: "days to eliminate operational chaos",
    deliverables: [
      { icon: "🔍", title: "Full chaos diagnosis", desc: "Deep analysis of your operations. Bottlenecks and CEO dependencies identified and documented." },
      { icon: "📊", title: "KPI steering system", desc: "Operational dashboard, key KPIs, weekly steering ritual — in place and running." },
      { icon: "👥", title: "Team structuring", desc: "Clear roles, defined responsibilities, decision protocols that don't go through you." },
      { icon: "⚡", title: "3 automations", desc: "On your most time-consuming processes. Measurable ROI from day 30." },
      { icon: "📋", title: "90-day execution plan", desc: "Complete operational roadmap for the 3 months after the sprint." },
      { icon: "🎯", title: "30-day support", desc: "Full support throughout deployment. Every blocker resolved in under 24 hours." },
    ],
    cta: "Book my Sprint",
    guarantee: "If after 30 days you haven't freed at least 5h/week, we continue for free.",
  },
  proof: {
    badge: "Why Aumentia",
    title: "A field-tested approach. Not theoretical consulting.",
    items: [
      {
        icon: "📐",
        title: "Scaling Up Method",
        desc: "Trained directly on Verne Harnish's methodology — the playbook for SMBs scaling from €1M to €100M.",
      },
      {
        icon: "🏭",
        title: "SMB operational experience",
        desc: "We've lived the same bottlenecks you have. We don't diagnose from the outside — we know it from the inside.",
      },
      {
        icon: "⚙️",
        title: "Systems, not recommendations",
        desc: "We don't deliver a PowerPoint report. We build the systems and make sure they work in your reality.",
      },
      {
        icon: "📏",
        title: "Measurable results",
        desc: "Hours freed, autonomous decisions, active KPIs. Everything is measured — before and after the sprint.",
      },
    ],
  },
  social: {
    badge: "They did the Sprint",
    title: "What they say.",
    items: [
      {
        quote: "In 4 weeks, I got my mornings back. My team now makes 80% of decisions without me. I wouldn't have believed it possible.",
        name: "Thomas R.",
        role: "CEO · Agency · 18 employees",
      },
      {
        quote: "The initial diagnosis opened my eyes. We were losing 15 hours a week on things that could have been fixed months ago.",
        name: "Sophie M.",
        role: "Director · Consulting firm · Lyon",
      },
      {
        quote: "I finally took a week off without my phone. The business ran fine. Sounds basic, but it was the first time in 8 years.",
        name: "Marco D.",
        role: "Founder · SMB · 35 people",
      },
    ],
  },
  diagnostic: {
    badge: "Free diagnosis",
    title: "Not ready for the Sprint yet?",
    titleAccent: "Start with the diagnosis.",
    subtitle: "Leave your details. Alexandre analyzes your situation and comes back with a clear plan — no commitment.",
    form: {
      name: "Your name",
      email: "Your professional email",
      company: "Your company",
      role: "Your role",
      rolePlaceholder: "Select your role",
      roles: {
        ceo: "CEO / General Manager",
        coo: "COO / Operations Director",
        cfo: "CFO / Finance Director",
        other: "Other executive",
      },
      employees: "Company size",
      employeesPlaceholder: "Number of employees",
      submit: "Request my free diagnosis →",
      sending: "Sending…",
      success: "Request received!",
      successSub: "Alexandre will contact you within 24h to launch your diagnosis.",
    },
  },
  finalcta: {
    title: "Your company deserves a system that runs without you.",
    subtitle: "30 minutes to diagnose your operational chaos. Free, no commitment.",
    cta: "Book my free diagnosis",
  },
  values: {
    badge: "Our values",
    title: "NOW.",
    subtitle: "Not Only Widgets. Now Or Never. The time to act is now.",
    items: [
      {
        letter: "B",
        title: "Business First, Tech After",
        desc: "We start with your ROI, not the technology. AI is a tool, not an end goal.",
      },
      {
        letter: "S",
        title: "Security",
        desc: "We secure what we deliver. Zero promises without guarantees. What we don't master, we don't sell.",
      },
      {
        letter: "P",
        title: "Positivity Mindset",
        desc: "We move forward with energy, even in complexity. Every problem is an opportunity.",
      },
      {
        letter: "W",
        title: "We Use What We Sell",
        desc: "We live our product. We are our best client. Aumentia runs on AI.",
      },
    ],
  },
  about: {
    badge: "The founder",
    name: "Alexandre Gagliano",
    role: "CEO & Founder, Aumentia",
    bhag: "BHAG: Help 1 million leaders steer their growth with clarity by 2040.",
    purpose: "Aumentia exists to close the gap between growth ambition and operational reality. We help SMB leaders build systems — not chase problems.",
    cta: "Talk with Alexandre",
  },
  footer: {
    tagline: "Execution system for SMBs.",
    links: {
      title1: "Solutions",
      audit: "AI Audit",
      coaching: "AI Coaching",
      investors: "Investors",
      title2: "Contact",
    },
    rights: "All rights reserved.",
  },

  investorPage: {
    meta: {
      title: "Aumentia — Investors · Fundraising €1M–€2M",
      description: "Aumentia is raising €1M–€2M to build the reference operational execution system for European SMBs. Discover the thesis, projections and business model.",
    },
    hero: {
      badge: "🤝 INVESTORS",
      h1: "Aumentia raises €1M – €2M.",
      h1accent: "To build the reference execution system for European SMBs.",
      subtitle: "We're not funding a vision. We're accelerating an execution machine already in motion.",
      cta_primary: "Request the pitch deck →",
      cta_secondary: "See projections",
    },
    metrics: [
      { value: "€120B+", label: "Global SMB AI TAM", sub: "Total addressable market" },
      { value: "€18B", label: "European SAM", sub: "Serviceable addressable market" },
      { value: "€1B+", label: "SOM BE · FR · IT", sub: "Serviceable obtainable market" },
      { value: "50–150K€", label: "Estimated client LTV", sub: "Lifetime value per client" },
      { value: "7,500€", label: "Scale Sprint ticket", sub: "Entry price, one-time" },
      { value: "1,500–3K€/mo", label: "Target Run MRR", sub: "Monthly recurring revenue" },
    ],
    why: {
      badge: "INVESTMENT THESIS",
      title: "Right problem. Right time. Right team.",
      problem_title: "The problem",
      problem_items: [
        "72% of SMBs are adopting AI (McKinsey 2024)",
        "Only 12% achieve real ROI (PwC)",
        "The gap = absence of execution structure",
        "That's exactly what Aumentia provides",
      ],
      advantage_title: "The competitive advantage",
      advantage_items: [
        "Not consulting (too expensive for SMBs)",
        "Not isolated AI tools (no ROI alone)",
        "A turnkey on-the-ground execution system",
        "Sprint → Run MRR → LTV 50–150K€",
      ],
    },
    model: {
      badge: "BUSINESS MODEL",
      title: "A recurring model built on execution.",
      steps: [
        { num: "01", name: "Scale Sprint", price: "€7,500", label: "Entry point · One-time payment" },
        { num: "02", name: "Aumentia OS Run", price: "€1,500–3,000/mo", label: "Recurring MRR · Ongoing support" },
        { num: "03", name: "Lifetime Value", price: "€50–150K", label: "Per client · Over 3–5 years" },
      ],
    },
    projections: {
      badge: "PROJECTIONS",
      title: "Growth anchored in execution.",
      subtitle: "Conservative model based on current conversion rates.",
      col_year: "Year",
      col_revenue: "Revenue",
      col_hypothesis: "Assumptions",
      rows: [
        { year: "Y1", revenue: "€300K", hypothesis: "10 Sprints + 5 Run MRR" },
        { year: "Y2", revenue: "€1M", hypothesis: "35 Sprints + 20 Run + France / Italy" },
        { year: "Y3", revenue: "€3M+", hypothesis: "Sales/Tech team + franchise model" },
      ],
      note: "Model based on Sprint €7,500 + Run MRR €1,500–3,000/mo + service upsells",
    },
    funds: {
      badge: "USE OF FUNDS",
      title: "Every euro allocated to growth.",
      items: [
        { pct: "40%", title: "Product & AI", desc: "Engineering · Automations · Platform scalability" },
        { pct: "30%", title: "Sales & Marketing", desc: "Growth · Content · SMB outreach FR / BE / IT" },
        { pct: "20%", title: "Recruitment", desc: "Ops Manager · Sales Rep · AI Engineer" },
        { pct: "10%", title: "Operations", desc: "Infrastructure · Legal · Compliance" },
      ],
    },
    team: {
      badge: "THE TEAM",
      title: "Built to execute.",
      members: [
        {
          name: "Alexandre Gagliano",
          role: "CEO & Founder",
          bio: "Certified Scaling Up coach (Gazelles · Verne Harnish). 200+ leaders coached. Trilingual FR/EN/IT. BHAG: help 1M leaders steer their growth with clarity by 2040.",
        },
        {
          name: "Remco Lafeber",
          role: "Advisor & Partner",
          bio: "Expert in business development and growth strategy. Investor network and European scale-ups.",
        },
        {
          name: "Nina Barette",
          role: "Advisor & Partner",
          bio: "Expertise in digital marketing and SMB acquisition. Content strategy and brand building.",
        },
      ],
    },
    cta: {
      title: "Investing in tomorrow's SMBs?",
      subtitle: "30 minutes. We present the full thesis, detailed projections and current pipeline.",
      btn: "Request a meeting →",
      contact: "alex@aumentia.ai · +32 471 662 563",
    },
    modal: {
      title: "Request the pitch deck",
      subtitle: "We'll send you the full deck + detailed projections within 24h.",
      firstname: "First name",
      lastname: "Last name",
      email: "Professional email",
      company: "Company / Fund",
      ticket: "Usual investment ticket",
      ticket_options: ["<€100K", "€100K – €500K", "€500K – €2M", "€2M+"],
      message: "Message (optional)",
      message_placeholder: "Your context, questions, or specific interests...",
      submit: "Send my request →",
      sending: "Sending…",
      success: "Request received!",
      success_sub: "Alexandre will send you the full pitch deck within 24h.",
    },
  },

  auditPage: {
    badge: "Operational Diagnosis",
    title: "Your SMB's operational chaos,",
    title2: "diagnosed. Structured. Eliminated.",
    subtitle: "The Aumentia Growth OS Sprint — a 30-day execution methodology to go from chaos to a system that runs without you.",
    cta_hero: "Book my free diagnosis",

    chaos_badge: "What is operational chaos?",
    chaos_title: "Your business is running. But you're running on empty.",
    chaos_subtitle: "Operational chaos is when your company depends on you for everything — every decision, every problem, every fire. It's not a hard work problem. It's a structure problem.",
    chaos_items: [
      "Everything goes through you — every decision, every fire, every problem",
      "Your team is capable but can't prioritize without you",
      "Tools everywhere but no clear picture of what's really happening",
      "KPIs that are non-existent, unclear, or never looked at",
      "10h+ per week lost on tasks that shouldn't reach your desk",
      "The growth is there. The market is there. But the system can't keep up.",
    ],
    chaos_conclusion: "This isn't a hard work problem. It's a structure problem. And it can be diagnosed in 48 hours.",

    method_badge: "The Growth OS Sprint methodology",
    method_title: "30 days. 3 phases. One operational system.",
    method_subtitle: "The Growth OS Sprint is Aumentia's methodology to eliminate operational chaos in SMBs. In 30 days, we diagnose, structure, automate and stabilize — with you, inside your company.",
    phases: [
      {
        num: "01",
        label: "Week 1",
        title: "Chaos Diagnosis",
        duration: "5–7 days",
        desc: "We map all your critical processes. We identify your 3 major bottlenecks, measure your CEO dependencies and prioritize high-impact actions. You finally know exactly where you're losing time — and why.",
        deliverables: [
          "Full mapping of your critical processes",
          "Identification of your 3 major bottlenecks",
          "CEO dependency measurement by department",
          "High-impact action prioritization",
          "Complete operational diagnosis report",
        ],
      },
      {
        num: "02",
        label: "Weeks 2–3",
        title: "Structuring & Deployment",
        duration: "2 weeks",
        desc: "We build the system. Clear role and responsibility definition, key KPIs by function, weekly steering rituals, critical process documentation and deployment of 3 automations on your most time-consuming tasks.",
        deliverables: [
          "Clear role and responsibility definition",
          "Key KPIs set up per function",
          "Weekly steering rituals designed",
          "3 automations deployed (immediate measurable ROI)",
          "Critical process documentation",
        ],
      },
      {
        num: "03",
        label: "Week 4",
        title: "Stabilization + 90-day plan",
        duration: "1 week",
        desc: "We make sure the system holds. Full testing, team adoption, real-time adjustments. You leave with the first measurable results and a concrete execution plan for the next 90 days.",
        deliverables: [
          "Full system testing and adjustments",
          "Team adoption validated",
          "First measurable results documented",
          "90-day execution plan delivered",
          "30-day post-Sprint continuous support",
        ],
      },
    ],

    why_badge: "Why diagnosis first?",
    why_title: "We don't prescribe without examining.",
    why_subtitle: "Too many consultants arrive with solutions before understanding the problems. At Aumentia, diagnosis always comes before action.",
    why_items: [
      {
        icon: "🎯",
        title: "Every SMB has its own specific chaos",
        desc: "A bottleneck in a 15-person company doesn't look like one in an 80-person company. Diagnosis lets us intervene in the right place, not the wrong one.",
      },
      {
        icon: "📊",
        title: "Without data, no priorities",
        desc: "The diagnosis objectively measures where your time goes, which decisions escalate, which KPIs are missing. We prioritize by impact, not intuition.",
      },
      {
        icon: "⚡",
        title: "Quick wins from week 1",
        desc: "The diagnosis systematically identifies 2–3 immediate-impact actions. Some clients free up 3h/week by the end of the first week.",
      },
      {
        icon: "🤝",
        title: "Team buy-in starts here",
        desc: "When the team participates in the diagnosis, they understand the problems and invest in the solutions. Diagnosis creates alignment before change.",
      },
    ],

    faq_badge: "Frequently asked questions",
    faq_title: "Everything you want to know about operational diagnosis.",
    faq_items: [
      {
        q: "What is operational chaos in an SMB?",
        a: "Operational chaos describes the state of a business where processes, decisions and priorities depend excessively on the leader. Concretely: everything goes through you, your team can't decide without you, KPIs are absent or never consulted, and you lose 10h+ per week on operational tasks that should be handled without you. It's the main barrier to scalability for SMBs between 5 and 100 employees.",
      },
      {
        q: "What does the Aumentia operational diagnosis consist of?",
        a: "The Aumentia operational diagnosis is the first week of the Growth OS Sprint. We map your critical processes, measure your CEO dependencies, identify your 3 major bottlenecks and prioritize immediate-impact actions. You receive a complete report with concrete recommendations — not an 80-slide PowerPoint audit, but an operational action plan.",
      },
      {
        q: "How long does the Growth OS Sprint last?",
        a: "The Growth OS Sprint lasts 30 days, structured in 3 phases: Week 1 — Diagnosis (mapping, bottlenecks, CEO dependencies). Weeks 2–3 — Structuring (KPIs, roles, automations, processes). Week 4 — Stabilization (testing, team adoption, 90-day plan). This isn't a consulting mission that drags on for months — it's an execution sprint with measurable results at D+30.",
      },
      {
        q: "What concrete results can I expect in 30 days?",
        a: "Typical results after a Growth OS Sprint: 5–10h/week freed for the leader, 70–80% of operational decisions made without the CEO, 3 automated processes with measurable ROI, active KPI dashboard, team autonomous on their priorities. If after 30 days you haven't freed at least 5h/week, we continue for free.",
      },
      {
        q: "What size company is the method suited for?",
        a: "The Growth OS Sprint is designed for SMBs between 5 and 100 employees, across all sectors. The ideal fit: a leader who realizes their company can't scale because everything still goes through them, with a team in place but lacking clear structure and processes.",
      },
      {
        q: "What's the difference from traditional consulting?",
        a: "A traditional consultant delivers a report and leaves. Aumentia builds the system with you, inside your company. We don't diagnose from the outside — we work with your teams, deploy automations, set up KPIs, train managers. The difference: you have a working system at D+30, not a recommendations document.",
      },
      {
        q: "What role does AI play in the Growth OS Sprint?",
        a: "AI is a tool, not an end goal. In the Sprint, we deploy automations on your 3 most time-consuming processes — only those with immediately measurable ROI. No gadgets, no AI for AI's sake. Every deployed automation frees up real time from day 30.",
      },
    ],

    cta: {
      title: "Ready to diagnose your chaos?",
      subtitle: "30-minute free call. We identify your main bottlenecks and tell you if the Sprint is right for you.",
      btn: "Book my free diagnosis",
    },
  },

  coachingPage: {
    badge: "AI Coaching",
    title: "Your AI coaches,",
    title2: "available 24/7.",
    subtitle: "Artificial intelligences trained on the world's best methodologies. Accessible via Telegram, whenever you need them.",
    coaches: [
      {
        id: "scaling-up",
        name: "Scaling Up Coach",
        tagline: "Business growth",
        desc: "Based on Verne Harnish's Scaling Up method. Strategy, OKRs, quarterly Rocks, efficient meetings — this coach knows the playbook of companies that scale.",
        status: "active",
        cta: "Start on Telegram",
        link: "https://t.me/ScalingUpCoachBot",
        tags: ["Strategy", "OKRs", "Scaling Up", "Leadership"],
      },
      {
        id: "personal",
        name: "Personal Coach",
        tagline: "Personal & professional development",
        desc: "Mindset, time management, high performance habits, clarity on your life goals. A coach that knows you and adapts to your pace.",
        status: "soon",
        cta: "Coming soon",
        link: null,
        tags: ["Mindset", "Habits", "Performance", "Clarity"],
      },
      {
        id: "sport",
        name: "Sports & Nutrition Coach",
        tagline: "Body and energy at maximum",
        desc: "Personalized training plans, optimized nutrition, smart recovery. Because a high-performing leader needs a body that keeps up.",
        status: "soon",
        cta: "Coming soon",
        link: null,
        tags: ["Sport", "Nutrition", "Energy", "Recovery"],
      },
      {
        id: "execution",
        name: "Execution Coach",
        tagline: "Execute like Dan Martell",
        desc: "Inspired by Buy Back Your Time. Delegation, systems, hiring, CEO productivity. This coach helps you work on your business, not in it.",
        status: "soon",
        cta: "Coming soon",
        link: null,
        tags: ["Delegation", "Systems", "CEO", "Buy Back"],
      },
    ],
    why: {
      title: "Why AI coaches?",
      items: [
        { icon: "🕐", title: "Available 24/7", desc: "Ask questions at 11pm before an important meeting. Your coach is there." },
        { icon: "🧠", title: "Trained on the best", desc: "Each coach deeply masters its methodology. No approximations." },
        { icon: "💰", title: "10x more affordable", desc: "An expert human coach costs thousands per month. Our AI, a fraction." },
        { icon: "📱", title: "Via Telegram", desc: "No app to install. Your coach lives in your phone, where you are." },
      ],
    },
  },

  contactPage: {
    badge: "Contact",
    title: "Let's talk about your",
    title2: "situation.",
    subtitle: "30 minutes is enough to diagnose your operational chaos and see if the Sprint is right for you.",
    form: {
      name: "Your first name",
      email: "Your professional email",
      company: "Your company",
      message: "Describe your situation (optional)",
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent! Alexandre will get back to you within 24h.",
    },
    info: {
      demo: { title: "Book a diagnosis", desc: "30 min to diagnose your chaos. Free." },
      email: { title: "Direct email", value: "alex@aumentia.ai" },
      phone: { title: "Phone", value: "+32 471 662 563" },
    },
  },
};

export default en;
