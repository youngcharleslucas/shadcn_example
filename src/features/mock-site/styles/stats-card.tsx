import * as React from "react"
import { Card, CardContent } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface StatsCardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
  icon: React.ReactNode
  className?: string
}

export function StatsCard({ label, value, delta, deltaPositive = true, icon, className }: StatsCardProps) {
  return (
    <Card variant="outlined" className={cn(className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            {icon}
          </div>
          {delta && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                deltaPositive
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-error-container text-on-error-container"
              )}
            >
              {deltaPositive ? "+" : ""}{delta}
            </span>
          )}
        </div>
        <p className="text-2xl font-medium text-on-surface">{value}</p>
        <p className="text-xs text-on-surface-variant mt-0.5">{label}</p>
      </CardContent>
    </Card>
  )
}
