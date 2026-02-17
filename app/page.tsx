import { GlowShell } from "@/components/aura"
import { LandingHeader } from "@/components/landing/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ModelsSection } from "@/components/landing/models-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <GlowShell>
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ModelsSection />
      </main>
      <Footer />
    </GlowShell>
  )
}
