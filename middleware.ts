import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req: NextRequest & { auth: any }) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/pricing", "/auth/signin", "/browse"].includes(nextUrl.pathname);
  const isWatchRoute = nextUrl.pathname.startsWith("/watch");
  const isAuthRoute = ["/auth/signin"].includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();

  // /watch routes are public (movie details/player)
  if (isWatchRoute) {
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/browse", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  // Security Headers - Allow video provider embeds
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "media-src 'self' https: blob:; " +
    "frame-src https://vidsrc.pro https://nexstream.io https://autoembed.co https://vidphantom.net https://2embed.org https://player.vimeo.com https://www.youtube.com; " +
    "connect-src 'self' https:; " +
    "frame-ancestors 'none';"
  );

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
