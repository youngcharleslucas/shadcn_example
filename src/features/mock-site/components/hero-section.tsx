import { Button } from "@/styles/v1"
import { HeroCard } from "../styles"

export function HeroSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-medium mb-6">
            Now in public beta
          </div>
          <h1 className="text-5xl font-medium text-on-surface leading-tight mb-4">
            Analytics that
            <br />
            <span className="text-primary">work for you</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Luminary turns your raw data into actionable insights. Build dashboards, track KPIs,
            and share reports — all without writing a single line of SQL.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="filled" size="lg">Get Started Free</Button>
            <Button variant="text" size="lg">Learn More</Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroCard />
        </div>
      </div>
    </section>
  )
}
