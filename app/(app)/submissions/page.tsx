"use client"

import { useState } from "react"
import { GlowCard, GlowButton, GlowBadge } from "@/components/aura"
import { Send, Eye, CheckCircle, XCircle, Clock, Filter, Search, ExternalLink } from "lucide-react"

interface Submission {
  id: string
  name: string
  description: string
  category: string
  status: "pending" | "approved" | "rejected" | "review"
  submittedAt: Date
  author: string
  preview: string
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    name: "AI Recipe Generator",
    description: "An AI-powered app that generates recipes based on available ingredients",
    category: "Food & Cooking",
    status: "pending",
    submittedAt: new Date(2024, 1, 10),
    author: "john@example.com",
    preview: "/api/placeholder/400/300",
  },
  {
    id: "2",
    name: "Workout Tracker Pro",
    description: "Track your fitness journey with AI-powered workout recommendations",
    category: "Health & Fitness",
    status: "review",
    submittedAt: new Date(2024, 1, 9),
    author: "sarah@example.com",
    preview: "/api/placeholder/400/300",
  },
  {
    id: "3",
    name: "Budget Manager",
    description: "Smart budget tracking with AI-powered insights and forecasting",
    category: "Finance",
    status: "approved",
    submittedAt: new Date(2024, 1, 8),
    author: "mike@example.com",
    preview: "/api/placeholder/400/300",
  },
  {
    id: "4",
    name: "Language Tutor",
    description: "Learn new languages with AI conversation practice",
    category: "Education",
    status: "rejected",
    submittedAt: new Date(2024, 1, 7),
    author: "emma@example.com",
    preview: "/api/placeholder/400/300",
  },
]

export default function SubmissionsPage() {
  const [submissions] = useState<Submission[]>(mockSubmissions)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected" | "review">("all")
  const [search, setSearch] = useState("")

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = filter === "all" || sub.status === filter
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase()) || 
                         sub.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusConfig = {
    pending: { color: "warning", icon: Clock, label: "Pending" },
    review: { color: "cyan", icon: Eye, label: "In Review" },
    approved: { color: "success", icon: CheckCircle, label: "Approved" },
    rejected: { color: "destructive", icon: XCircle, label: "Rejected" },
  }

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    review: submissions.filter((s) => s.status === "review").length,
    approved: submissions.filter((s) => s.status === "approved").length,
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">App Submissions</h1>
          <p className="text-muted-foreground">Review and manage submitted applications</p>
        </div>
        <GlowButton>
          <Send className="h-4 w-4 mr-2" />
          Submit New App
        </GlowButton>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <GlowCard className="p-5">
          <div className="text-sm text-muted-foreground mb-1">Total</div>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
        </GlowCard>
        <GlowCard className="p-5 border-warning/30">
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
        </GlowCard>
        <GlowCard className="p-5 border-primary/30">
          <div className="text-sm text-muted-foreground mb-1">In Review</div>
          <div className="text-2xl font-bold text-foreground">{stats.review}</div>
        </GlowCard>
        <GlowCard className="p-5 border-success/30">
          <div className="text-sm text-muted-foreground mb-1">Approved</div>
          <div className="text-2xl font-bold text-foreground">{stats.approved}</div>
        </GlowCard>
      </div>

      {/* Filters */}
      <GlowCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </GlowCard>

      {/* Submissions Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredSubmissions.map((submission) => {
          const config = statusConfig[submission.status]
          const Icon = config.icon
          return (
            <GlowCard key={submission.id} className="p-6 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {submission.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{submission.category}</p>
                </div>
                <GlowBadge variant={config.color as "cyan" | "success" | "warning" | "destructive"}>
                  <Icon className="h-3 w-3 mr-1" />
                  {config.label}
                </GlowBadge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {submission.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Submitted by</span>
                  <span className="text-sm font-medium text-foreground">{submission.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {submission.submittedAt.toLocaleDateString()}
                  </span>
                  <GlowButton size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    Review
                  </GlowButton>
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>

      {filteredSubmissions.length === 0 && (
        <GlowCard className="p-12 text-center">
          <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No submissions found</h3>
          <p className="text-sm text-muted-foreground">
            {search ? "Try adjusting your search or filters" : "No submissions match the selected filter"}
          </p>
        </GlowCard>
      )}
    </div>
  )
}
