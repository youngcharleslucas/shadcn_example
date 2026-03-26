import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChipVariant = "assist" | "suggestion" | "input"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ChipVariant
  leadingIcon?: React.ReactNode
  onRemove?: () => void
  disabled?: boolean
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "assist", leadingIcon, onRemove, disabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border-2 border-border",
          "px-3 h-8 text-sm font-bold text-on-surface bg-surface-container",
          "transition-all duration-150 cursor-pointer select-none",
          "hover:bg-surface-container-high hover:border-primary hover:scale-[1.03]",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled && "opacity-38 pointer-events-none",
          className
        )}
        {...props}
      >
        {leadingIcon && (
          <span className="size-4 flex items-center justify-center text-primary">
            {leadingIcon}
          </span>
        )}
        <span>{children}</span>
        {variant === "input" && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="size-4 flex items-center justify-center rounded-full hover:bg-primary/20 text-on-surface-variant ml-0.5 transition-colors"
            aria-label="Remove"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"

export { Chip }
