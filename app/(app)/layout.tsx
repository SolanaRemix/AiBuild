import { GlowShell } from "@/components/aura"
import { AppHeader } from "@/components/layout/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlowShell>
      <AppHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {children}
      </div>
    </GlowShell>
  )
}
