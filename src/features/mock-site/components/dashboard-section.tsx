import { StatsSection } from "./stats-section"
import { DataDashboard } from "../styles"

export function DashboardSection() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-on-surface mb-2">
            Your data, at a glance
          </h2>
          <p className="text-on-surface-variant">
            Real-time analytics across all your channels. Filter by period, export, or share.
          </p>
        </div>

        <StatsSection />

        <div className="relative pb-10">
          <DataDashboard />
        </div>
      </div>
    </section>
  )
}
