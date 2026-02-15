"use client"

import { useState } from "react"
import { GlowCard, GlowButton, GlowBadge } from "@/components/aura"
import { CheckCircle, XCircle, Eye, MessageSquare, Flag, ExternalLink } from "lucide-react"

interface AdminSubmission {
  id: string
  name: string
  description: string
  category: string
  status: "pending" | "approved" | "rejected" | "flagged"
  submittedAt: Date
  author: string
  email: string
  url: string
  reviewNotes?: string
}

const mockAdminSubmissions: AdminSubmission[] = [
  {
    id: "1",
    name: "AI Recipe Generator",
    description: "An AI-powered app that generates recipes based on available ingredients. Uses GPT-4 for intelligent recipe creation.",
    category: "Food & Cooking",
    status: "pending",
    submittedAt: new Date(2024, 1, 10, 14, 30),
    author: "John Doe",
    email: "john@example.com",
    url: "https://recipe-gen.app",
  },
  {
    id: "2",
    name: "Workout Tracker Pro",
    description: "Track your fitness journey with AI-powered workout recommendations",
    category: "Health & Fitness",
    status: "pending",
    submittedAt: new Date(2024, 1, 10, 12, 15),
    author: "Sarah Smith",
    email: "sarah@example.com",
    url: "https://workout-tracker.app",
  },
  {
    id: "3",
    name: "Budget Manager",
    description: "Smart budget tracking with AI-powered insights and forecasting",
    category: "Finance",
    status: "approved",
    submittedAt: new Date(2024, 1, 9, 16, 45),
    author: "Mike Johnson",
    email: "mike@example.com",
    url: "https://budget-app.com",
    reviewNotes: "Excellent implementation, follows all guidelines",
  },
  {
    id: "4",
    name: "Spam Marketing Tool",
    description: "Automated mass email sender",
    category: "Marketing",
    status: "flagged",
    submittedAt: new Date(2024, 1, 9, 10, 20),
    author: "Suspicious User",
    email: "spam@example.com",
    url: "https://spam-tool.app",
    reviewNotes: "Violates terms of service",
  },
]

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<AdminSubmission[]>(mockAdminSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<AdminSubmission | null>(null)
  const [reviewNote, setReviewNote] = useState("")

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "approved" as const, reviewNotes: reviewNote } : sub
      )
    )
    setReviewNote("")
    setSelectedSubmission(null)
  }

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "rejected" as const, reviewNotes: reviewNote } : sub
      )
    )
    setReviewNote("")
    setSelectedSubmission(null)
  }

  const handleFlag = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "flagged" as const, reviewNotes: reviewNote } : sub
      )
    )
    setReviewNote("")
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const flaggedCount = submissions.filter((s) => s.status === "flagged").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Review Submissions</h1>
        <p className="text-muted-foreground">Moderate and approve user-submitted applications</p>
      </div>

      {/* Alert Banner */}
      {(pendingCount > 0 || flaggedCount > 0) && (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-warning/30 bg-warning/5">
          <MessageSquare className="h-5 w-5 text-warning shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {pendingCount > 0 && `${pendingCount} submission${pendingCount > 1 ? 's' : ''} awaiting review`}
              {pendingCount > 0 && flaggedCount > 0 && " • "}
              {flaggedCount > 0 && `${flaggedCount} flagged submission${flaggedCount > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      )}

      {/* Submissions List */}
      <div className="grid gap-4">
        {submissions.map((submission) => (
          <GlowCard
            key={submission.id}
            className={`p-6 ${
              submission.status === "flagged"
                ? "border-destructive/50 bg-destructive/5"
                : submission.status === "pending"
                ? "border-warning/30"
                : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{submission.name}</h3>
                  {submission.status === "pending" && (
                    <GlowBadge variant="warning">Pending Review</GlowBadge>
                  )}
                  {submission.status === "approved" && (
                    <GlowBadge variant="success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </GlowBadge>
                  )}
                  {submission.status === "rejected" && (
                    <GlowBadge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </GlowBadge>
                  )}
                  {submission.status === "flagged" && (
                    <GlowBadge variant="destructive">
                      <Flag className="h-3 w-3 mr-1" />
                      Flagged
                    </GlowBadge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{submission.category}</p>
                <p className="text-sm text-foreground leading-relaxed mb-4">{submission.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 rounded-lg bg-muted/30 border border-border">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Author</span>
                    <span className="text-sm font-medium text-foreground">{submission.author}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Email</span>
                    <span className="text-sm font-medium text-foreground">{submission.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Submitted</span>
                    <span className="text-sm font-medium text-foreground">
                      {submission.submittedAt.toLocaleDateString()} {submission.submittedAt.toLocaleTimeString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">URL</span>
                    <a
                      href={submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      Visit App
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {submission.reviewNotes && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <span className="text-xs text-muted-foreground block mb-1">Review Notes</span>
                    <p className="text-sm text-foreground">{submission.reviewNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions for pending submissions */}
            {submission.status === "pending" && (
              <div className="border-t border-border pt-4 mt-4">
                {selectedSubmission?.id === submission.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      placeholder="Add review notes (optional)..."
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <GlowButton
                        size="sm"
                        onClick={() => handleApprove(submission.id)}
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </GlowButton>
                      <GlowButton
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(submission.id)}
                        className="border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </GlowButton>
                      <GlowButton
                        size="sm"
                        variant="outline"
                        onClick={() => handleFlag(submission.id)}
                        className="border-warning text-warning hover:bg-warning/10"
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Flag
                      </GlowButton>
                      <GlowButton
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSubmission(null)
                          setReviewNote("")
                        }}
                      >
                        Cancel
                      </GlowButton>
                    </div>
                  </div>
                ) : (
                  <GlowButton size="sm" onClick={() => setSelectedSubmission(submission)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review Submission
                  </GlowButton>
                )}
              </div>
            )}

            {/* Actions for flagged submissions */}
            {submission.status === "flagged" && (
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center gap-2">
                  <GlowButton
                    size="sm"
                    onClick={() => handleReject(submission.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Confirm Rejection
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSubmissions((prev) =>
                        prev.map((sub) => (sub.id === submission.id ? { ...sub, status: "pending" as const } : sub))
                      )
                    }}
                  >
                    Review Again
                  </GlowButton>
                </div>
              </div>
            )}
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
