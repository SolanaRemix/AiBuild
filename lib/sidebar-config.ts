import type { SidebarSection } from "@/components/aura"
import {
  LayoutDashboard,
  FolderOpen,
  Bot,
  CreditCard,
  Share2,
  Trophy,
  Settings,
  Rocket,
  ScrollText,
  Key,
  Webhook,
  Activity,
  Users,
  Brain,
  Blocks,
  Receipt,
  Gift,
  Gamepad2,
  Server,
  Flag,
} from "lucide-react"

export const userSections: SidebarSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Projects", href: "/projects", icon: FolderOpen, badge: "4" },
      { label: "Agents", href: "/agents", icon: Bot },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Billing", href: "/billing", icon: CreditCard },
      { label: "Affiliate", href: "/affiliate", icon: Share2 },
      { label: "Quests", href: "/quests", icon: Trophy, badge: "3" },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export const devSections: SidebarSection[] = [
  {
    title: "Dev Tools",
    items: [
      { label: "Deployments", href: "/dev/deployments", icon: Rocket },
      { label: "Logs", href: "/dev/logs", icon: ScrollText },
      { label: "SDK & API", href: "/dev/sdk", icon: Key },
      { label: "Webhooks", href: "/dev/webhooks", icon: Webhook },
      { label: "System Status", href: "/dev/status", icon: Activity },
    ],
  },
]

export const adminSections: SidebarSection[] = [
  {
    title: "Admin",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Models", href: "/admin/models", icon: Brain },
      { label: "Agents", href: "/admin/agents", icon: Blocks },
      { label: "Plans & Billing", href: "/admin/plans", icon: Receipt },
      { label: "Affiliate Config", href: "/admin/affiliate", icon: Gift },
      { label: "Quests Config", href: "/admin/quests", icon: Gamepad2 },
      { label: "System", href: "/admin/system", icon: Server },
      { label: "Feature Flags", href: "/admin/flags", icon: Flag },
    ],
  },
]
