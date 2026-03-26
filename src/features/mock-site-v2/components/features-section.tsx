import * as React from "react"
import { BarChart3, Shield, Zap, Globe } from "lucide-react"
import { FilterChip } from "@/styles/v1"
import { FeatureCard } from "../styles"

const ALL_FEATURES = [
  {
    icon: <BarChart3 className="size-5" />,
    title: "Advanced Analytics",
    description: "Deep dive into your data with real-time charts and custom reports.",
    tags: ["Analytics"],
  },
  {
    icon: <Shield className="size-5" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and role-based access.",
    tags: ["Security"],
  },
  {
    icon: <Zap className="size-5" />,
    title: "100+ Integrations",
    description: "Connect to Salesforce, HubSpot, Stripe, and every data source you use.",
    tags: ["Integrations"],
  },
  {
    icon: <Globe className="size-5" />,
    title: "Scheduled Reports",
    description: "Automatically send reports to your team on a daily, weekly, or monthly basis.",
    tags: ["Analytics", "Reporting"],
  },
]

const FILTER_OPTIONS = ["All", "Analytics", "Security", "Integrations", "Reporting"]

export function FeaturesSection() {
  const [activeFilters, setActiveFilters] = React.useState<string[]>(["All"])

  const toggle = (filter: string) => {
    if (filter === "All") {
      setActiveFilters(["All"])
      return
    }
    setActiveFilters((prev) => {
      const withoutAll = prev.filter((f) => f !== "All")
      if (withoutAll.includes(filter)) {
        const next = withoutAll.filter((f) => f !== filter)
        return next.length === 0 ? ["All"] : next
      }
      return [...withoutAll, filter]
    })
  }

  const filtered = activeFilters.includes("All")
    ? ALL_FEATURES
    : ALL_FEATURES.filter((f) => f.tags.some((t) => activeFilters.includes(t)))

  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-on-surface mb-3">
            Everything you need to ship faster
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Luminary provides all the tools your team needs to understand and act on your data.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {FILTER_OPTIONS.map((filter) => (
            <FilterChip
              key={filter}
              selected={activeFilters.includes(filter)}
              onSelectedChange={() => toggle(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
