import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardDescription as ShadCardDescription,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-2xl overflow-hidden transition-all duration-150", {
  variants: {
    variant: {
      elevated: "bg-surface-container-low shadow-md border border-border/40 hover:shadow-lg",
      filled:   "bg-surface-container-highest border-0 shadow-none",
      outlined: "bg-surface border-2 border-border shadow-none hover:border-primary/60",
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
})

export interface CardProps
  extends React.ComponentPropsWithoutRef<typeof ShadCard>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <ShadCard ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ShadCardHeader>
>(({ className, ...props }, ref) => (
  <ShadCardHeader ref={ref} className={cn(className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ShadCardTitle>
>(({ className, ...props }, ref) => (
  <ShadCardTitle ref={ref} className={cn("text-on-surface font-bold", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ShadCardDescription>
>(({ className, ...props }, ref) => (
  <ShadCardDescription
    ref={ref}
    className={cn("text-on-surface-variant", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ShadCardContent>
>(({ className, ...props }, ref) => (
  <ShadCardContent ref={ref} className={cn(className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ShadCardFooter>
>(({ className, ...props }, ref) => (
  <ShadCardFooter ref={ref} className={cn(className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
