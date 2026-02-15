"use client"

import { useState } from "react"
import { GlowCard, GlowButton, GlowBadge } from "@/components/aura"
import { 
  Frame, 
  Plus, 
  Eye, 
  Code, 
  Download, 
  Share2, 
  Image as ImageIcon,
  Type,
  MousePointer,
  Layers,
  Settings,
  Copy,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FrameElement {
  id: string
  type: "text" | "button" | "image"
  content: string
  position: { x: number; y: number }
  style?: {
    fontSize?: string
    color?: string
    backgroundColor?: string
  }
}

interface FrameProject {
  id: string
  name: string
  description: string
  elements: FrameElement[]
  metadata: {
    title: string
    description: string
    image: string
  }
  createdAt: Date
  published: boolean
}

const mockFrames: FrameProject[] = [
  {
    id: "1",
    name: "Welcome Frame",
    description: "A simple welcome message for new users",
    elements: [
      { id: "e1", type: "text", content: "Welcome to our Frame!", position: { x: 50, y: 40 } },
      { id: "e2", type: "button", content: "Get Started", position: { x: 50, y: 60 } },
    ],
    metadata: {
      title: "Welcome Frame",
      description: "Interactive welcome experience",
      image: "/api/placeholder/1200/630",
    },
    createdAt: new Date(2024, 1, 10),
    published: true,
  },
  {
    id: "2",
    name: "Poll Frame",
    description: "Community polling frame",
    elements: [
      { id: "e1", type: "text", content: "What's your favorite feature?", position: { x: 50, y: 30 } },
      { id: "e2", type: "button", content: "AI Chat", position: { x: 25, y: 60 } },
      { id: "e3", type: "button", content: "Frames", position: { x: 75, y: 60 } },
    ],
    metadata: {
      title: "Feature Poll",
      description: "Vote for your favorite feature",
      image: "/api/placeholder/1200/630",
    },
    createdAt: new Date(2024, 1, 9),
    published: false,
  },
]

export default function FramesPage() {
  const [frames, setFrames] = useState<FrameProject[]>(mockFrames)
  const [selectedFrame, setSelectedFrame] = useState<FrameProject | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "editor">("grid")
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    const code = `<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${selectedFrame?.metadata.image}" />
  <meta property="fc:frame:button:1" content="${selectedFrame?.elements.find(e => e.type === 'button')?.content}" />
</head>
<body>
  <h1>${selectedFrame?.metadata.title}</h1>
</body>
</html>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Farcaster Frames</h1>
          <p className="text-muted-foreground">Build interactive frames for the Farcaster protocol</p>
        </div>
        <div className="flex items-center gap-2">
          <GlowButton variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "editor" : "grid")}>
            {viewMode === "grid" ? <Layers className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {viewMode === "grid" ? "View All" : "Editor"}
          </GlowButton>
          <GlowButton>
            <Plus className="h-4 w-4 mr-2" />
            New Frame
          </GlowButton>
        </div>
      </div>

      {viewMode === "grid" ? (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <GlowCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Frame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Frames</div>
                  <div className="text-2xl font-bold text-foreground">{frames.length}</div>
                </div>
              </div>
            </GlowCard>
            <GlowCard className="p-5 border-success/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Check className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Published</div>
                  <div className="text-2xl font-bold text-foreground">
                    {frames.filter((f) => f.published).length}
                  </div>
                </div>
              </div>
            </GlowCard>
            <GlowCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Eye className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                  <div className="text-2xl font-bold text-foreground">2.4k</div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Frames Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {frames.map((frame) => (
              <GlowCard
                key={frame.id}
                className="p-0 overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
                onClick={() => {
                  setSelectedFrame(frame)
                  setViewMode("editor")
                }}
              >
                <div className="aspect-[1.91/1] bg-muted/30 border-b border-border relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Frame className="h-16 w-16 text-muted-foreground/20" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {frame.elements.map((element) => (
                      <div
                        key={element.id}
                        className={cn(
                          "mb-2",
                          element.type === "text" && "text-lg font-semibold text-foreground",
                          element.type === "button" && "px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
                        )}
                      >
                        {element.content}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {frame.name}
                    </h3>
                    {frame.published ? (
                      <GlowBadge variant="success">Published</GlowBadge>
                    ) : (
                      <GlowBadge variant="warning">Draft</GlowBadge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{frame.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{frame.createdAt.toLocaleDateString()}</span>
                    <span>{frame.elements.length} elements</span>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </>
      ) : (
        /* Editor View */
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <GlowCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Canvas</h2>
                <div className="flex items-center gap-2">
                  <GlowButton size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </GlowButton>
                  <GlowButton size="sm" variant="outline" onClick={handleCopyCode}>
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Code className="h-3 w-3 mr-1" />
                        Export
                      </>
                    )}
                  </GlowButton>
                </div>
              </div>

              {/* Frame Preview */}
              <div className="aspect-[1.91/1] bg-muted/20 rounded-lg border-2 border-dashed border-border relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {selectedFrame?.elements.map((element) => (
                    <div
                      key={element.id}
                      className={cn(
                        "mb-3 cursor-pointer hover:scale-105 transition-transform",
                        element.type === "text" && "text-2xl font-bold text-foreground",
                        element.type === "button" &&
                          "px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
                      )}
                    >
                      {element.content}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mt-4 flex items-center gap-2">
                <GlowButton size="sm" variant="outline">
                  <Type className="h-4 w-4 mr-1" />
                  Text
                </GlowButton>
                <GlowButton size="sm" variant="outline">
                  <MousePointer className="h-4 w-4 mr-1" />
                  Button
                </GlowButton>
                <GlowButton size="sm" variant="outline">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Image
                </GlowButton>
              </div>
            </GlowCard>
          </div>

          {/* Properties Panel */}
          <div className="space-y-4">
            <GlowCard className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Frame Properties</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Frame Name</label>
                  <input
                    type="text"
                    value={selectedFrame?.name || ""}
                    onChange={(e) => {
                      if (selectedFrame) {
                        setSelectedFrame({ ...selectedFrame, name: e.target.value })
                      }
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Description</label>
                  <textarea
                    value={selectedFrame?.description || ""}
                    onChange={(e) => {
                      if (selectedFrame) {
                        setSelectedFrame({ ...selectedFrame, description: e.target.value })
                      }
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Published</span>
                  <button
                    onClick={() => {
                      if (selectedFrame) {
                        setSelectedFrame({ ...selectedFrame, published: !selectedFrame.published })
                        setFrames((prev) =>
                          prev.map((f) =>
                            f.id === selectedFrame.id ? { ...f, published: !f.published } : f
                          )
                        )
                      }
                    }}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      selectedFrame?.published ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        selectedFrame?.published ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Layers</h3>
              </div>
              <div className="space-y-2">
                {selectedFrame?.elements.map((element, index) => (
                  <div
                    key={element.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {element.type === "text" && <Type className="h-3 w-3 text-muted-foreground" />}
                      {element.type === "button" && <MousePointer className="h-3 w-3 text-muted-foreground" />}
                      {element.type === "image" && <ImageIcon className="h-3 w-3 text-muted-foreground" />}
                      <span className="text-xs text-foreground">{element.content.slice(0, 20)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </GlowCard>

            <GlowButton className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Frame
            </GlowButton>
          </div>
        </div>
      )}
    </div>
  )
}
