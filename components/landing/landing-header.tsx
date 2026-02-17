import Link from "next/link"
import { Zap } from "lucide-react"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 glass">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              AiBuild
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground font-mono">
              / CyberAi
            </span>
          </Link>
        </div>

        {/* Right: nav links */}
        <nav className="flex items-center gap-4" aria-label="Landing navigation">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </Link>
        </nav>
      </div>
    </header>
  )
}
