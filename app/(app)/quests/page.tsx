import { GlowCard, GlowBadge } from "@/components/aura"
import { mockQuests } from "@/lib/mock-data"
import { Trophy, CheckCircle2, Circle, Gift } from "lucide-react"

export default function QuestsPage() {
  const completedCount = mockQuests.filter((q) => q.completed).length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Quests</h1>
          <p className="text-sm text-muted-foreground">Complete challenges to earn rewards and unlock features</p>
        </div>
        <GlowBadge variant="cyan">
          {completedCount} / {mockQuests.length} completed
        </GlowBadge>
      </div>

      {/* Overall progress */}
      <GlowCard variant="cyan" className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(completedCount / mockQuests.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {Math.round((completedCount / mockQuests.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Quest list */}
      <div className="flex flex-col gap-4">
        {mockQuests.map((quest) => (
          <GlowCard
            key={quest.id}
            variant={quest.completed ? "default" : "cyan"}
            className="p-5"
            hover={!quest.completed}
          >
            <div className="flex items-start gap-4">
              {/* Status icon */}
              <div className="mt-0.5">
                {quest.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-success" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`text-base font-semibold ${quest.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {quest.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Gift className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">{quest.reward}</span>
                  </div>
                </div>

                {/* Progress bar */}
                {!quest.completed && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
