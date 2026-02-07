import { GlowShell } from "@/components/aura"
import { AppLayoutShell } from "@/components/layout/app-layout-shell"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlowShell>
      <AppLayoutShell>{children}</AppLayoutShell>
    </GlowShell>
  )
}
