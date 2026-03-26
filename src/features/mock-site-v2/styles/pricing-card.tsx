import { Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Chip } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface PricingCardProps {
  name: string
  price: number
  period: "monthly" | "annual"
  features: string[]
  cta: string
  badge?: string
  highlighted?: boolean
  className?: string
  onViewDetails?: () => void
}

export function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  badge,
  highlighted = false,
  className,
  onViewDetails,
}: PricingCardProps) {
  const displayPrice = period === "annual" ? Math.round(price * 0.8) : price

  return (
    <Card
      variant={highlighted ? "elevated" : "outlined"}
      className={cn("flex flex-col h-full", highlighted && "ring-2 ring-primary", className)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          {badge && (
            <Chip variant="suggestion" className="text-xs bg-primary-container text-on-primary-container border-0">
              {badge}
            </Chip>
          )}
        </div>
        <div className="mt-3">
          <span className="text-4xl font-medium text-on-surface">${displayPrice}</span>
          <span className="text-on-surface-variant text-sm ml-1">/ mo</span>
          {period === "annual" && (
            <p className="text-xs text-primary mt-1">Billed annually · Save 20%</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm text-on-surface-variant">
              <Check className="size-4 text-primary mt-0.5 shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button variant={highlighted ? "filled" : "outlined"} className="w-full">
          {cta}
        </Button>
        {onViewDetails && (
          <Button variant="text" className="w-full text-xs" onClick={onViewDetails}>
            View details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
