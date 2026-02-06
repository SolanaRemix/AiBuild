"use client"

import { cn } from "@/lib/utils"
import type { ProjectFile } from "@/lib/types"
import { GlowBadge } from "@/components/aura"

interface CodeEditorProps {
  file: ProjectFile | null
  className?: string
}

export function CodeEditor({ file, className }: CodeEditorProps) {
  if (!file) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-muted-foreground text-sm",
          className
        )}
      >
        Select a file to view its contents
      </div>
    )
  }

  const lines = file.content.split("\n")

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-foreground">{file.path}</span>
          <GlowBadge variant={file.generatedBy === "ai" ? "cyan" : "default"}>
            {file.generatedBy}
          </GlowBadge>
          <GlowBadge>v{file.version}</GlowBadge>
        </div>
        <span className="text-xs text-muted-foreground">
          {file.language || "text"}
        </span>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="inline-block w-10 shrink-0 select-none text-right pr-4 text-muted-foreground/50 font-mono text-xs leading-relaxed">
                  {i + 1}
                </span>
                <span className="font-mono text-foreground">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
