import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://placeholder.supabase.co";

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() is a required network round trip -- it's what actually
  // revalidates the JWT and refreshes the auth cookies (getSession() would
  // be faster but trusts an unverified cookie, per Supabase's own SSR
  // guidance). That cost is unavoidable here. What was NOT unavoidable was
  // the second round trip below: a `profiles` SELECT on every single
  // navigation just to answer a yes/no question ("has this user finished
  // onboarding?") that almost never changes after the first time. Chained
  // after getUser(), that doubled the middleware's network time on every
  // click that navigates -- a systemic, site-wide tax on top of whatever
  // the destination page fetches on its own.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico";

  if (!isPublicAsset && user) {
    const isAuthRoute =
      pathname === "/login" || pathname.startsWith("/auth/callback");
    const isOnboardingRoute = pathname === "/onboarding";

    // Onboarded-once, onboarded-forever: cache the DB verdict in a cookie
    // (set here on first confirmation, and by onboarding/page.tsx the
    // moment the profile is created) so every later navigation skips the
    // `profiles` query entirely. Falls back to the real query only when the
    // cookie is missing -- a new login, a cleared cookie jar, or a user
    // created before this cookie existed.
    const onboardedCookie = request.cookies.get("ml_onboarded")?.value === "1";

    let hasProfile = onboardedCookie;
    if (!onboardedCookie) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
      hasProfile = Boolean(profile);
      if (hasProfile) {
        supabaseResponse.cookies.set("ml_onboarded", "1", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
        });
      }
    }

    if (!hasProfile && !isOnboardingRoute && !isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    if (hasProfile && isOnboardingRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
