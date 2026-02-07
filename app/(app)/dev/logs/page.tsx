import type { Metadata } from "next"
import { DevLogsView } from "@/components/dev/dev-logs-view"

export const metadata: Metadata = {
  title: "Logs",
}

export default function DevLogsPage() {
  return <DevLogsView />
}
