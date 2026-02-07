import type { Metadata } from "next"
import { AffiliateView } from "@/components/affiliate/affiliate-view"

export const metadata: Metadata = {
  title: "Affiliate Program",
}

export default function AffiliatePage() {
  return <AffiliateView />
}
