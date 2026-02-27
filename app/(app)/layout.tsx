import { AppLayoutShell } from "@/components/layout/app-layout-shell"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppLayoutShell>{children}</AppLayoutShell>
}
