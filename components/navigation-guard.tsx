"use client"

import { useEffect } from "react"

export function NavigationGuard() {
  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      const error = event.reason

      // Suppress Next.js navigation abort errors
      if (error?.name === "AbortError") {
        if (process.env.NODE_ENV === "development") {
          console.log("[NavigationGuard suppressed]", "AbortError:", error)
        }
        event.preventDefault()
        return
      }

      // Suppress browser extension errors (MetaMask, etc.) and other known safe errors
      const msg = String(error?.message ?? "")
      const stack = String(error?.stack ?? "")
      if (
        msg.includes("MetaMask") ||
        msg.includes("Navigation cancelled") ||
        stack.includes("chrome-extension://") ||
        stack.includes("moz-extension://")
      ) {
        if (process.env.NODE_ENV === "development") {
          console.log("[NavigationGuard suppressed]", error?.name || "Error:", error)
        }
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleRejection)
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection)
  }, [])

  return null
}
