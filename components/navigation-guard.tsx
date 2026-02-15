"use client"

import { useEffect } from "react"

export function NavigationGuard() {
  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      const error = event.reason

      // Suppress Next.js navigation abort errors
      if (error instanceof DOMException && error.name === "AbortError") {
        event.preventDefault()
        return
      }

      // Suppress browser extension errors (MetaMask, etc.)
      const msg = String(error?.message ?? "")
      const stack = String(error?.stack ?? "")
      if (
        msg.includes("MetaMask") ||
        msg.includes("Navigation cancelled") ||
        msg.includes("navigation") ||
        stack.includes("chrome-extension://") ||
        stack.includes("moz-extension://")
      ) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleRejection)
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection)
  }, [])

  return null
}
