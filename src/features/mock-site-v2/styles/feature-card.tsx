import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  tags?: string[]
  className?: string
}

export function FeatureCard({ icon, title, description, tags, className }: FeatureCardProps) {
  return (
    <Card variant="outlined" className={cn("h-full", className)}>
      <CardHeader>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center mb-3 text-on-primary-container">
          {icon}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {tags && tags.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
