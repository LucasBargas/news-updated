import { NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const newPath = pathname.replace(
    /^\/(cadastrar-noticia|noticias-favoritas)\/.+/,
    "/$1",
  );

  if (newPath !== pathname) {
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/cadastrar-noticia/:path*", "/noticias-favoritas/:path*"],
};
