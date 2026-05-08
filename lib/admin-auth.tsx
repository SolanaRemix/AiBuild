"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

interface AdminAuthState {
  authenticated: boolean
  user: string | null
  loading: boolean
}

interface AdminAuthContextValue extends AdminAuthState {
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    authenticated: false,
    user: null,
    loading: true,
  })

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session")
      if (res.ok) {
        const data = await res.json()
        setState({ authenticated: true, user: data.user, loading: false })
      } else {
        setState({ authenticated: false, user: null, loading: false })
      }
    } catch {
      setState({ authenticated: false, user: null, loading: false })
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        setState({ authenticated: true, user: data.user, loading: false })
        return { success: true }
      }

      return { success: false, error: data.error || "Invalid credentials" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setState({ authenticated: false, user: null, loading: false })
  }

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout, checkSession }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider")
  return ctx
}
