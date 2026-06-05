"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";

interface NavProps {
  locale: string;
  t: {
    home: string;
    process: string;
    offer: string;
    coaching: string;
    contact: string;
    cta: string;
  };
}

export default function Nav({ locale, t }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(newLocale: Locale) {
    // Replace current locale prefix with new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  }

  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}#process`, label: t.process },
    { href: `/${locale}#offer`, label: t.offer },
    { href: `/${locale}/coaching`, label: t.coaching },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1A1A1A" : "none",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/logo.png" alt="Aumentia" width={44} height={44} style={{ objectFit: "contain" }} priority />
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pathname === l.href ? "var(--cyan)" : "var(--gray-light)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: locale switcher + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Locale switcher */}
            <div style={{ display: "flex", gap: 4 }}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchLocale(l)}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: 6,
                    color: l === locale ? "var(--cyan)" : "var(--gray)",
                    background: l === locale ? "var(--cyan-dim)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {localeLabels[l]}
                </Link>
              ))}
            </div>

            <a
              href="https://calendly.com/alex-aumentia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "8px 20px", fontSize: 13 }}
            >
              {t.cta}
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "none" }}
              className="burger-btn"
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {open ? (
                  <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: "var(--dark-card)", border: "1px solid var(--dark-border)",
            borderRadius: 12, padding: 20, marginBottom: 12,
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "10px 12px", borderRadius: 8,
                  color: pathname === l.href ? "var(--cyan)" : "#fff",
                  background: pathname === l.href ? "var(--cyan-dim)" : "transparent",
                  fontSize: 15, fontWeight: 500, textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ marginTop: 8 }}>
              <a href="https://calendly.com/alex-aumentia" target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {t.cta}
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
