import { DesktopSidebar, MobileDrawer, SidebarProvider } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      {/* Mobile drawer (portal-style, fixed overlay) */}
      <MobileDrawer />

      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop sidebar — hidden on mobile */}
        <DesktopSidebar />

        {/* Main column */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto scrollbar-thin pb-safe">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
