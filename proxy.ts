import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { locales, defaultLocale } from "@/lib/i18n";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") || "";
  for (const lang of accept.split(",")) {
    const code = lang.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (locales.includes(code as (typeof locales)[number])) return code;
  }
  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ─── Admin auth protection ────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (pathname !== "/admin/login" && !user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (pathname === "/admin/login" && user) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return response;
  }

  // ─── Public routes (respond, results) — no auth needed ───────────
  if (pathname.startsWith("/respond") || pathname.startsWith("/results")) {
    return NextResponse.next();
  }

  // ─── Locale redirect for marketing pages ─────────────────────────
  const pathnameLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  if (pathnameLocale) return NextResponse.next();

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
