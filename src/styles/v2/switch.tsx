import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string
  labelPosition?: "left" | "right"
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, label, labelPosition = "right", id, ...props }, ref) => {
  const switchId = id ?? React.useId()

  const switchEl = (
    <SwitchPrimitives.Root
      ref={ref}
      id={switchId}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        "border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface-container-highest",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground",
          "data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-outline"
        )}
      />
    </SwitchPrimitives.Root>
  )

  if (!label) return switchEl

  return (
    <div className="flex items-center gap-2">
      {labelPosition === "left" && (
        <Label htmlFor={switchId} className="text-on-surface cursor-pointer">
          {label}
        </Label>
      )}
      {switchEl}
      {labelPosition === "right" && (
        <Label htmlFor={switchId} className="text-on-surface cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  )
})
Switch.displayName = "Switch"

export { Switch }
