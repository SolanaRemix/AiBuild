import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      version:
        process.env.APP_VERSION ??
        process.env.VERCEL_GIT_COMMIT_SHA ??
        process.env.VERCEL_DEPLOYMENT_ID ??
        "unknown",
    },
    { status: 200 }
  )
}
