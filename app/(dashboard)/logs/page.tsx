import { eventBus } from "@/core/events"
import { LogsClient } from "@/components/logs/logs-client"

export default function LogsPage() {
  const events = eventBus.getHistory(200)

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
          Logs & Events
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          System event stream and audit logs
        </p>
      </div>
      <LogsClient initialEvents={events} />
    </div>
  )
}
