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
          "inline-flex items-center gap-1.5 rounded-full border border-border",
          "px-3 h-8 text-sm font-medium text-on-surface bg-transparent",
          "transition-colors cursor-pointer select-none",
          "hover:bg-on-surface/8 active:bg-on-surface/12",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled && "opacity-38 pointer-events-none",
          className
        )}
        {...props}
      >
        {leadingIcon && (
          <span className="size-4 flex items-center justify-center text-on-surface-variant">
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
            className="size-4 flex items-center justify-center rounded-full hover:bg-on-surface/12 text-on-surface-variant ml-0.5"
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
