import { TrendingUp, Users, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface HeroCardProps {
  className?: string
}

export function HeroCard({ className }: HeroCardProps) {
  return (
    <Card variant="elevated" className={cn("w-full max-w-sm", className)}>
      <CardContent className="p-5">
        <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-4">
          Live Dashboard Preview
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: <TrendingUp className="size-4" />, label: "Revenue", value: "+24%" },
            { icon: <Users className="size-4" />, label: "Users", value: "12.4k" },
            { icon: <BarChart3 className="size-4" />, label: "Conversion", value: "3.6%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-3 rounded-xl bg-surface-container text-center"
            >
              <span className="text-primary mb-1">{stat.icon}</span>
              <span className="text-base font-medium text-on-surface">{stat.value}</span>
              <span className="text-xs text-on-surface-variant">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="h-20 bg-surface-container rounded-xl flex items-end px-3 pb-2 gap-1 overflow-hidden">
          {[40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary rounded-t-sm opacity-80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
