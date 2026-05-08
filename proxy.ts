import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") || "";
  for (const lang of accept.split(",")) {
    const code = lang.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (locales.includes(code as any)) return code;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if locale already in path
  const pathnameLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (pathnameLocale) return NextResponse.next();

  // Redirect to locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
