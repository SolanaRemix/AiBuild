"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "aios-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  // Initialise from localStorage on mount (client only)
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) setThemeState(stored)
  }, [storageKey])

  // Resolve "system" preference
  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">("dark")
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mq.matches ? "dark" : "light")
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const resolvedTheme: "dark" | "light" =
    theme === "system" ? systemTheme : theme

  // Apply data-theme attribute to <html> for CSS selectors
  React.useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", resolvedTheme)
    // Also set the class for Tailwind darkMode: ["selector"] compatibility
    root.classList.toggle("dark", resolvedTheme === "dark")
  }, [resolvedTheme])

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next)
      localStorage.setItem(storageKey, next)
    },
    [storageKey]
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
