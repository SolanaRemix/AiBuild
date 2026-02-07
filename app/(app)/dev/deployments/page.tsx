import type { Metadata } from "next"
import { DeploymentsView } from "@/components/dev/deployments-view"

export const metadata: Metadata = {
  title: "Deployments",
}

export default function DeploymentsPage() {
  return <DeploymentsView />
}
