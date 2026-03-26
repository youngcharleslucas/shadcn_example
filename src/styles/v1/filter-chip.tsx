import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  disabled?: boolean
  leadingIcon?: React.ReactNode
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    { className, selected = false, onSelectedChange, disabled, leadingIcon, children, onClick, ...props },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onSelectedChange?.(!selected)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={selected}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full h-8 px-3 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-38 disabled:pointer-events-none",
          selected
            ? "bg-secondary text-on-secondary-container border border-transparent"
            : "border border-border text-on-surface bg-transparent hover:bg-on-surface/8 active:bg-on-surface/12",
          className
        )}
        {...props}
      >
        {selected ? (
          <Check className="size-4 shrink-0" />
        ) : (
          leadingIcon && (
            <span className="size-4 flex items-center justify-center">{leadingIcon}</span>
          )
        )}
        <span>{children}</span>
      </button>
    )
  }
)
FilterChip.displayName = "FilterChip"

export { FilterChip }
