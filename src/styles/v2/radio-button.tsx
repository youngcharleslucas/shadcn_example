import * as React from "react"
import {
  RadioGroup as ShadRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface RadioOptionProps {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof ShadRadioGroup> {
  options?: RadioOptionProps[]
  className?: string
  children?: React.ReactNode
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadRadioGroup>,
  RadioGroupProps
>(({ className, options, children, ...props }, ref) => {
  return (
    <ShadRadioGroup ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {options
        ? options.map((opt) => (
            <RadioOption key={opt.value} {...opt} />
          ))
        : children}
    </ShadRadioGroup>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioOption = React.forwardRef<HTMLButtonElement, RadioOptionProps>(
  ({ value, label, description, disabled }, ref) => {
    const id = React.useId()
    return (
      <div className={cn("flex items-start gap-3", disabled && "opacity-38")}>
        <RadioGroupItem
          ref={ref}
          value={value}
          id={id}
          disabled={disabled}
          className="mt-0.5 border-on-surface-variant text-primary data-[state=checked]:border-primary"
        />
        <div className="flex flex-col">
          <Label htmlFor={id} className="text-on-surface font-medium cursor-pointer">
            {label}
          </Label>
          {description && (
            <span className="text-xs text-on-surface-variant">{description}</span>
          )}
        </div>
      </div>
    )
  }
)
RadioOption.displayName = "RadioOption"

export { RadioGroup, RadioOption }
