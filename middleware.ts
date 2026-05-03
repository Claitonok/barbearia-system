import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  const isPublicRoute =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/login";

  // 🔓 rotas públicas
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 🔒 sem token → bloqueia
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/agendamentos/:path*",
    "/dashboard/:path*",
    "/servicos/:path*",
    "/reset-password/:path*"
  ]
};