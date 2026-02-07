"use client"

import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import {
  Sword,
  Trophy,
  Rocket,
  GitBranch,
  Smartphone,
  Star,
  Bot,
  Users2,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react"

interface Quest {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  progress: number
  total: number
  reward: string
  status: "locked" | "active" | "completed"
  category: "onboarding" | "builder" | "social"
}

const quests: Quest[] = [
  {
    id: "q1",
    title: "Create Your First Project",
    description: "Use the prompt builder to generate your first AI-powered project.",
    icon: Rocket,
    progress: 1,
    total: 1,
    reward: "Builder Badge",
    status: "completed",
    category: "onboarding",
  },
  {
    id: "q2",
    title: "Deploy to Vercel",
    description: "Ship your first project live with one-click Vercel deployment.",
    icon: Star,
    progress: 1,
    total: 1,
    reward: "Deployer Badge",
    status: "completed",
    category: "onboarding",
  },
  {
    id: "q3",
    title: "Sync to GitHub",
    description: "Connect a project to GitHub and push your generated code.",
    icon: GitBranch,
    progress: 0,
    total: 1,
    reward: "Git Ninja Badge",
    status: "active",
    category: "onboarding",
  },
  {
    id: "q4",
    title: "Build an APK",
    description: "Generate a mobile project and export an APK build artifact.",
    icon: Smartphone,
    progress: 0,
    total: 1,
    reward: "Mobile Builder Badge + 10% affiliate boost",
    status: "active",
    category: "builder",
  },
  {
    id: "q5",
    title: "Create 5 Projects",
    description: "Build a total of 5 projects using the AiBuild platform.",
    icon: Trophy,
    progress: 4,
    total: 5,
    reward: "Power User Badge",
    status: "active",
    category: "builder",
  },
  {
    id: "q6",
    title: "Create a Custom Agent",
    description: "Build and configure your first personal AI agent.",
    icon: Bot,
    progress: 0,
    total: 1,
    reward: "Agent Master Badge",
    status: "active",
    category: "builder",
  },
  {
    id: "q7",
    title: "Refer 3 Users",
    description: "Share your referral link and get 3 users to sign up.",
    icon: Users2,
    progress: 1,
    total: 3,
    reward: "Community Champion + $15 credit",
    status: "active",
    category: "social",
  },
]

const categories = [
  { id: "all", label: "All Quests" },
  { id: "onboarding", label: "Getting Started" },
  { id: "builder", label: "Builder" },
  { id: "social", label: "Social" },
]

export function QuestsView() {
  const completedCount = quests.filter((q) => q.status === "completed").length
  const totalCount = quests.length
  const overallProgress = (completedCount / totalCount) * 100

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Quests
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete challenges to earn badges and rewards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sword className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {completedCount}/{totalCount} Complete
          </span>
        </div>
      </div>

      {/* Overall progress */}
      <GlowCard variant="cyan" className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Your Progress
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {completedCount} of {totalCount} quests completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {quests
                .filter((q) => q.status === "completed")
                .map((q) => {
                  const Icon = q.icon
                  return (
                    <div
                      key={q.id}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 border-2 border-background"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-1.5 block">
            {overallProgress.toFixed(0)}% complete
          </span>
        </div>
      </GlowCard>

      {/* Category badges */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <GlowBadge key={cat.id} variant="cyan">
            {cat.label}
          </GlowBadge>
        ))}
      </div>

      {/* Quest list */}
      <div className="flex flex-col gap-4">
        {quests.map((quest) => {
          const Icon = quest.icon
          const pct = (quest.progress / quest.total) * 100

          return (
            <GlowCard
              key={quest.id}
              variant={quest.status === "completed" ? "cyan" : "default"}
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                    quest.status === "completed"
                      ? "bg-success/10 border border-success/20"
                      : quest.status === "active"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-muted border border-border"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      quest.status === "completed"
                        ? "text-success"
                        : quest.status === "active"
                          ? "text-primary"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">
                          {quest.title}
                        </h3>
                        {quest.status === "completed" && (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        {quest.description}
                      </p>
                    </div>
                    <GlowBadge
                      variant={
                        quest.status === "completed"
                          ? "success"
                          : quest.status === "active"
                            ? "cyan"
                            : "default"
                      }
                    >
                      {quest.status}
                    </GlowBadge>
                  </div>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">
                        {quest.progress}/{quest.total}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {quest.reward}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          quest.status === "completed" ? "bg-success" : "bg-primary"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>
    </div>
  )
}
