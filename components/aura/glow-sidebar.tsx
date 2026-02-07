"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
}

interface GlowSidebarProps {
  sections: SidebarSection[]
  className?: string
}

export function GlowSidebar({ sections, className }: GlowSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col w-60 shrink-0 border-r border-border bg-fx-rail glass overflow-auto",
        className
      )}
    >
      <nav className="flex flex-col gap-6 px-3 py-4" aria-label="Sidebar navigation">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {section.title}
            </span>
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary glow-blue"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
