import { NextRequest, NextResponse } from "next/server"

const ADMIN_USER = "master"
const ADMIN_PASS = "admin123"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = Buffer.from(
        JSON.stringify({ user: ADMIN_USER, role: "admin", iat: Date.now() })
      ).toString("base64")

      const response = NextResponse.json({ success: true, user: ADMIN_USER })

      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return response
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}
