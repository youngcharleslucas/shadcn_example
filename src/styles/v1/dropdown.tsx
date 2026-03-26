import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ options, value, onValueChange, placeholder = "Select…", label, disabled, className }, ref) => {
    return (
      <div className="relative flex flex-col gap-1">
        {label && (
          <span className="text-xs text-on-surface-variant px-1">{label}</span>
        )}
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "rounded-md border border-border bg-transparent text-on-surface",
              "focus:ring-2 focus:ring-primary focus:border-primary",
              "hover:bg-on-surface/4",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-surface-container border border-outline-variant rounded-md shadow-lg">
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-on-surface hover:bg-surface-container-highest focus:bg-surface-container-highest"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
)
Dropdown.displayName = "Dropdown"

export { Dropdown }
