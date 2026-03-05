"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const ACTIVITY_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  runs: Math.floor(Math.random() * 40 + 5),
  tokens: Math.floor(Math.random() * 50000 + 10000),
  errors: Math.floor(Math.random() * 3),
}))

const MODEL_DATA = [
  { model: "GPT-4o", calls: 512, tokens: 240000 },
  { model: "Claude 3.5", calls: 384, tokens: 310000 },
  { model: "GPT-4o-mini", calls: 256, tokens: 95000 },
  { model: "Llama 3.3", calls: 128, tokens: 180000 },
  { model: "Claude Haiku", calls: 96, tokens: 48000 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-[hsl(var(--fx-surface))] px-3 py-2 shadow-xl">
      <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs font-mono" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  )
}

export function DashboardCharts() {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold font-mono text-foreground">Agent Activity (24h)</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Runs and token usage per hour</p>
      </div>

      <div className="p-5 space-y-6">
        {/* Area chart: runs */}
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACTIVITY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradRuns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199,89%,60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199,89%,60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradErrors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0,84%,60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0,84%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,28%,17%)" vertical={false} />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: "hsl(215,20%,55%)", fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(215,20%,55%)", fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="runs"
                stroke="hsl(199,89%,60%)"
                strokeWidth={2}
                fill="url(#gradRuns)"
                name="Runs"
              />
              <Area
                type="monotone"
                dataKey="errors"
                stroke="hsl(0,84%,60%)"
                strokeWidth={1.5}
                fill="url(#gradErrors)"
                name="Errors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart: model usage */}
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Model Usage Distribution
          </p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MODEL_DATA}
                layout="vertical"
                margin={{ top: 0, right: 4, bottom: 0, left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,28%,17%)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "hsl(215,20%,55%)", fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="model"
                  type="category"
                  tick={{ fontSize: 10, fill: "hsl(215,20%,55%)", fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="calls"
                  fill="hsl(199,89%,60%)"
                  radius={[0, 4, 4, 0]}
                  opacity={0.8}
                  name="Calls"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
