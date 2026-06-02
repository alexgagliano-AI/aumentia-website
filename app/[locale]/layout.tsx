import type { Metadata } from "next";
import { getTranslations, locales, type Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Aumentia — L'Entreprise Augmentée par l'IA | Conseil IA pour PME",
    en: "Aumentia — AI-Powered Business Growth | AI Consulting for SMEs",
    it: "Aumentia — L'Azienda Aumentata dall'IA | Consulenza IA per PMI",
  };
  const descriptions: Record<string, string> = {
    fr: "Audit IA, coaching IA et automatisation pour PME. +20% d'efficacité en 90 jours. ROI mesurable, pas juste des démos. Alexandre Gagliano — Bruxelles, Belgique.",
    en: "AI audit, AI coaching and automation for SMEs. +20% operational efficiency in 90 days. Measurable ROI, not just demos. Alexandre Gagliano — Brussels, Belgium.",
    it: "Audit IA, coaching IA e automazione per PMI. +20% di efficienza in 90 giorni. ROI misurabile. Alexandre Gagliano — Bruxelles, Belgio.",
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: {
      canonical: locale === "fr" ? "https://aumentia.ai/fr" : `https://aumentia.ai/${locale}`,
      languages: {
        "fr": "https://aumentia.ai/fr",
        "en": "https://aumentia.ai/en",
        "it": "https://aumentia.ai/it",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      url: `https://aumentia.ai/${locale}`,
      siteName: "Aumentia",
      locale: locale === "fr" ? "fr_BE" : locale === "en" ? "en_GB" : "it_IT",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <Nav locale={locale} t={t.nav} />
      <main>{children}</main>
      <Footer locale={locale} t={t.footer} />
    </>
  );
}
