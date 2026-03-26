import { SiteHeader, SiteFooter } from "../styles"
import { HeroSection } from "../components/hero-section"
import { FeaturesSection } from "../components/features-section"
import { PricingSection } from "../components/pricing-section"
import { DashboardSection } from "../components/dashboard-section"
import { TestimonialsSection } from "../components/testimonials-section"
import { ContactSection } from "../components/contact-section"

export function MockSitePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <DashboardSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
