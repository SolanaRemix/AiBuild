import { SettingsClient } from "@/components/settings/settings-client"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure API keys, models, and system preferences
        </p>
      </div>
      <SettingsClient />
    </div>
  )
}
