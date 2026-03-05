"use client"

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

const CPU_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  t: `${i}s`,
  cpu: Math.floor(Math.random() * 40 + 5),
  mem: Math.floor(Math.random() * 30 + 25),
}))

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-[hsl(var(--fx-surface))] px-3 py-2 shadow-xl">
      <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs font-mono" style={{ color: p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

interface SystemMonitorChartsProps {
  cpuPercent: number
  memPercent: number
}

export function SystemMonitorCharts({ cpuPercent, memPercent }: SystemMonitorChartsProps) {
  const gaugeData = [
    { name: "CPU", value: cpuPercent, fill: "hsl(199,89%,60%)" },
    { name: "Memory", value: memPercent, fill: "hsl(142,71%,45%)" },
  ]

  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold font-mono text-foreground">Resource Usage</h2>
      </div>
      <div className="p-5 space-y-4">
        {/* Gauge */}
        <div className="grid grid-cols-2 gap-4">
          {gaugeData.map((g) => (
            <div key={g.name} className="flex flex-col items-center">
              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="100%"
                    innerRadius="60%"
                    outerRadius="90%"
                    startAngle={180}
                    endAngle={0}
                    data={[{ value: g.value, fill: g.fill }]}
                  >
                    <RadialBar background={{ fill: "hsl(215,28%,17%)" }} dataKey="value" cornerRadius={4} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-2xl font-bold font-mono" style={{ color: g.fill }}>
                {g.value.toFixed(1)}%
              </p>
              <p className="text-xs font-mono text-muted-foreground">{g.name}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
            History (30s)
          </p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CPU_HISTORY} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradCPU" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199,89%,60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(199,89%,60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,28%,17%)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 9, fill: "hsl(215,20%,55%)" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 9, fill: "hsl(215,20%,55%)" }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="cpu" stroke="hsl(199,89%,60%)" strokeWidth={1.5} fill="url(#gradCPU)" name="CPU" />
                <Area type="monotone" dataKey="mem" stroke="hsl(142,71%,45%)" strokeWidth={1.5} fill="url(#gradMem)" name="Mem" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
