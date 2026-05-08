import { getTranslations, locales, type Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
