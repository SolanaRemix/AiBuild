"use client"

import { useEffect } from "react"

export function NavigationGuard() {
  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      const error = event.reason
      if (
        error instanceof DOMException &&
        error.name === "AbortError" &&
        error.message?.includes("Navigation aborted")
      ) {
        event.preventDefault()
      }
      if (
        error?.message?.includes("Failed to connect to MetaMask") ||
        error?.stack?.includes("chrome-extension://")
      ) {
        event.preventDefault()
      }
    }
    window.addEventListener("unhandledrejection", handleRejection)
    return () => window.removeEventListener("unhandledrejection", handleRejection)
  }, [])

  return null
}
