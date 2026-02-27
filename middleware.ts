import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Auth is disabled for demo/preview mode.
// All routes are accessible without login.
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
