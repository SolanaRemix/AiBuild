import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))

    if (payload.user && payload.role === "admin") {
      const age = Date.now() - payload.iat
      if (age > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ authenticated: false, error: "Session expired" }, { status: 401 })
      }
      return NextResponse.json({ authenticated: true, user: payload.user })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
