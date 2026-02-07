import type { Metadata } from "next"
import { SdkApiView } from "@/components/dev/sdk-api-view"

export const metadata: Metadata = {
  title: "SDK & API",
}

export default function SdkApiPage() {
  return <SdkApiView />
}
