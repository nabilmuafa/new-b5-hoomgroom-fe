import { NextResponse } from "next/server";
import { jwtIsValid } from "./app/utils/jwtUtil";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("token")?.value;

  const valid = await jwtIsValid(token);
  if (valid) {
    if (url.pathname.startsWith("/auth")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else {
    if (url.pathname !== "/" && !url.pathname.startsWith("/auth")) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/auth/:path*",
};
