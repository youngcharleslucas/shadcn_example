import { TrendingUp, Users, BarChart3, Globe } from "lucide-react"
import { StatsCard } from "../styles"

const STATS = [
  { label: "Monthly Active Users",  value: "124k",   delta: "18%",  deltaPositive: true,  icon: <Users className="size-4" /> },
  { label: "Revenue (MRR)",         value: "$284k",  delta: "32%",  deltaPositive: true,  icon: <TrendingUp className="size-4" /> },
  { label: "Reports Generated",     value: "1.2M",   delta: "5%",   deltaPositive: true,  icon: <BarChart3 className="size-4" /> },
  { label: "Avg. Churn Rate",       value: "1.8%",   delta: "0.4%", deltaPositive: false, icon: <Globe className="size-4" /> },
]

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {STATS.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
