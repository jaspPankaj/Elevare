import { FeatureSection } from "../components/FeatureSection"
import { HeroSection } from "../components/HeroSection"
import { NewsletterSection } from "../components/NewsletterSection"
import { TeamSection } from "../components/TeamSection"
import { AuroraBackground } from "../components/ui/aurora-background"

export const Home = () => {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <AuroraBackground/>
      </div>

      <main>
      <HeroSection />
      <FeatureSection />
      <TeamSection />
      <NewsletterSection />
      </main>

      
    </div>
  )
}
