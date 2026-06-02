import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aumentia — L'Entreprise Augmentée par l'IA",
  description:
    "Audit IA, coaching IA et automatisation pour PME. +20% d'efficacité en 90 jours. Conseil IA pragmatique à ROI mesurable. Belgique, France.",
  keywords: [
    "conseil IA PME",
    "audit IA entreprise",
    "coaching IA équipes",
    "automatisation IA PME",
    "ROI intelligence artificielle",
    "consultant IA francophone",
    "IA pour dirigeants",
    "Aumentia",
  ],
  authors: [{ name: "Alexandre Gagliano" }],
  metadataBase: new URL("https://aumentia.ai"),
  openGraph: {
    title: "Aumentia — L'Entreprise Augmentée par l'IA",
    description:
      "Audit IA, coaching IA et automatisation pour PME. +20% d'efficacité en 90 jours.",
    url: "https://aumentia.ai",
    siteName: "Aumentia",
    locale: "fr_BE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aumentia.ai/#organization",
      name: "Aumentia",
      url: "https://aumentia.ai",
      logo: "https://aumentia.ai/logo.png",
      description:
        "Aumentia aide les PME à déployer l'intelligence artificielle avec un ROI réel. Audit IA, coaching IA, automatisation sur mesure. +20% d'efficacité en 90 jours.",
      telephone: "+32471662563",
      email: "alex@aumentia.ai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bruxelles",
        addressCountry: "BE",
      },
      founder: {
        "@type": "Person",
        name: "Alexandre Gagliano",
        sameAs: ["https://scalingupcoach.fr", "https://itrocx.com"],
      },
      areaServed: ["Belgique", "France", "Europe"],
      availableLanguage: ["French", "English", "Italian"],
      sameAs: ["https://itrocx.com", "https://scalingupcoach.fr", "https://t.me/ScalingUpCoachBot"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+32471662563",
        email: "alex@aumentia.ai",
        availableLanguage: ["French", "English", "Italian"],
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Aumentia — Conseil IA pour PME",
      url: "https://aumentia.ai",
      provider: { "@id": "https://aumentia.ai/#organization" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services IA Aumentia",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Audit IA",
              description:
                "Diagnostic complet des opportunités d'automatisation dans votre PME. Identification des processus à fort potentiel, évaluation ROI, feuille de route IA.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Coaching IA",
              description:
                "Accompagnement de vos équipes dans l'adoption de l'IA. Formation pratique, prompt engineering, intégration dans les workflows existants.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automatisation IA",
              description:
                "Déploiement de solutions IA sur mesure (agents IA, automatisations, intégrations). ROI mesuré et justifié.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="msvalidate.01" content="4ADFD0248E4299D10FEA4FE0CB5C5BDB" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
