import { Card, CardContent } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  initials: string
  className?: string
}

export function TestimonialCard({ quote, author, role, initials, className }: TestimonialCardProps) {
  return (
    <Card variant="filled" className={cn("h-full", className)}>
      <CardContent className="p-6 flex flex-col gap-4">
        <p className="text-on-surface text-sm leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-sm font-medium text-on-secondary-container shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface">{author}</p>
            <p className="text-xs text-on-surface-variant">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
