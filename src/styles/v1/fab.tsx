import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button as ShadButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fabVariants = cva(
  "rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transition-shadow flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        surface:   "bg-surface-container-high text-primary",
        primary:   "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        tertiary:  "bg-tertiary-container text-on-tertiary-container",
      },
      size: {
        sm: "w-10 h-10",
        md: "w-14 h-14",
        lg: "w-24 h-24 rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface FabProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ShadButton>, "variant" | "size">,
    VariantProps<typeof fabVariants> {
  icon: React.ReactNode
  label?: string
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, icon, label, ...props }, ref) => {
    const isExtended = Boolean(label)

    return (
      <ShadButton
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          fabVariants({ variant, size }),
          isExtended && "w-auto px-4 rounded-2xl",
          "hover:bg-inherit",
          className
        )}
        {...props}
      >
        <span className={cn(size === "lg" ? "size-9" : "size-6", "flex items-center justify-center")}>
          {icon}
        </span>
        {isExtended && (
          <span className="text-sm font-medium">{label}</span>
        )}
      </ShadButton>
    )
  }
)
Fab.displayName = "Fab"

export { Fab, fabVariants }
