import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Redirect based on role
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (path.startsWith("/dev") && token?.role !== "DEV") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (path.startsWith("/dashboard") && token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    if (path.startsWith("/dashboard") && token?.role === "DEV") {
      return NextResponse.redirect(new URL("/dev", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/dev/:path*"],
}
