import type { Metadata } from "next"
import { QuestsView } from "@/components/quests/quests-view"

export const metadata: Metadata = {
  title: "Quests",
}

export default function QuestsPage() {
  return <QuestsView />
}
