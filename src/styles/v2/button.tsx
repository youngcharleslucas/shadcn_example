import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button as ShadButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "text-sm font-bold transition-all duration-150",
    "hover:scale-[1.03] active:scale-95",
    "disabled:pointer-events-none disabled:opacity-38",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        filled:   "bg-primary text-primary-foreground shadow-md hover:shadow-lg",
        outlined: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
        text:     "text-primary bg-transparent hover:bg-primary/10",
        elevated: "bg-surface-container-low text-primary shadow-md hover:shadow-xl",
        tonal:    "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-8  px-4  text-xs",
        md: "h-10 px-6  text-sm",
        lg: "h-12 px-8  text-base",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ShadButton>, "variant" | "size">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ShadButton
        ref={ref}
        variant="ghost"
        size="default"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
