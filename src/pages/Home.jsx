import { FeatureSection } from "../components/FeatureSection"
import { HeroSection } from "../components/HeroSection"
import { NewsletterSection } from "../components/NewsletterSection"
import { TeamSection } from "../components/TeamSection"
import { AuroraBackground } from "../components/ui/aurora-background"

function Home  () {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 overflow-x-hidden">
      
      

      <main>
      <HeroSection />
      <FeatureSection />
      <TeamSection />
      <NewsletterSection />
      </main>

      
    </div>
  )
} export default Home;
