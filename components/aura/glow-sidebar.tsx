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
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 glow-blue"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border hover:border-border"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isActive && "text-primary",
                    !isActive && "group-hover:scale-110"
                  )} />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      isActive 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse pointer-events-none" />
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
