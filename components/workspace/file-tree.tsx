"use client"

import { cn } from "@/lib/utils"
import type { ProjectFile } from "@/lib/types"
import { FileCode2, FileJson, FileText, ChevronRight, Folder } from "lucide-react"
import { useMemo, useState } from "react"

interface FileTreeProps {
  files: ProjectFile[]
  selectedPath: string | null
  onSelect: (path: string) => void
}

function getFileIcon(path: string) {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return FileCode2
  if (path.endsWith(".json")) return FileJson
  return FileText
}

interface TreeNode {
  name: string
  path: string
  isDir: boolean
  children: TreeNode[]
}

function buildTree(files: ProjectFile[]): TreeNode[] {
  const root: TreeNode[] = []

  for (const file of files) {
    const parts = file.path.split("/")
    let current = root

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i]
      const isLast = i === parts.length - 1
      const fullPath = parts.slice(0, i + 1).join("/")

      let existing = current.find((n) => n.name === name)
      if (!existing) {
        existing = {
          name,
          path: fullPath,
          isDir: !isLast,
          children: [],
        }
        current.push(existing)
      }
      current = existing.children
    }
  }

  return root
}

function TreeItem({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: TreeNode
  depth: number
  selectedPath: string | null
  onSelect: (path: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const Icon = node.isDir ? Folder : getFileIcon(node.path)
  const isSelected = node.path === selectedPath

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors text-left",
          isSelected
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (node.isDir) {
            setExpanded(!expanded)
          } else {
            onSelect(node.path)
          }
        }}
      >
        {node.isDir && (
          <ChevronRight
            className={cn(
              "h-3 w-3 transition-transform",
              expanded && "rotate-90"
            )}
          />
        )}
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate font-mono text-xs">{node.name}</span>
      </button>
      {node.isDir && expanded && (
        <div>
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ files, selectedPath, onSelect }: FileTreeProps) {
  const tree = useMemo(() => buildTree(files), [files])

  return (
    <div className="flex flex-col gap-0.5 py-2">
      {tree.map((node) => (
        <TreeItem
          key={node.path}
          node={node}
          depth={0}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
