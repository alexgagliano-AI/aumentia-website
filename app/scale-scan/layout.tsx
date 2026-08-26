import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Scale Scan — Aumentia",
  description: "Identifiez vos 3 automatisations IA prioritaires en 120 minutes. Rentable ou remboursé.",
  robots: { index: false, follow: false },
};

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function ScaleScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head />
      <body style={{ margin: 0, background: "var(--dark)", color: "#fff" }}>
        {children}

        {/* Meta Pixel — init + PageView */}
        {PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
              n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${PIXEL_ID}');
              fbq('track','PageView');
            `}</Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1" width="1" style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
