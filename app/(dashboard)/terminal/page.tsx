import { AiOSTerminal } from "@/components/terminal/terminal"

export default function TerminalPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
          AiOS Terminal
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Operator-grade command interface for AiOS
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <AiOSTerminal />
      </div>
    </div>
  )
}
