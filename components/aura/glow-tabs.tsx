"use client"

import { cn } from "@/lib/utils"

interface GlowTabsProps<T extends string> {
  tabs: { id: T; label: string }[]
  active: T
  onTabChange: (id: T) => void
  className?: string
}

export function GlowTabs<T extends string>({
  tabs,
  active,
  onTabChange,
  className,
}: GlowTabsProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-muted/50 p-1",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200",
            active === tab.id
              ? "bg-primary/10 text-primary shadow-sm border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
