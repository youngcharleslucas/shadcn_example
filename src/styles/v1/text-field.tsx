import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type TextFieldVariant = "filled" | "outlined"

export interface TextFieldProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "placeholder"> {
  variant?: TextFieldVariant
  label?: string
  supportingText?: string
  error?: boolean
  errorText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant = "outlined",
      label,
      supportingText,
      error = false,
      errorText,
      leadingIcon,
      trailingIcon,
      id,
      disabled,
      value,
      defaultValue,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const [focused, setFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      Boolean(value !== undefined ? value : defaultValue)
    )

    const isFloating = focused || hasValue

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      setHasValue(Boolean(e.target.value))
      onBlur?.(e)
    }

    const showError = error || Boolean(errorText)
    const helperText = showError ? errorText ?? supportingText : supportingText

    return (
      <div className="relative flex flex-col gap-1">
        <div
          className={cn(
            "relative flex items-center",
            variant === "filled" && [
              "bg-surface-container-highest rounded-t-md border-b-2",
              showError ? "border-destructive" : focused ? "border-primary" : "border-outline",
            ],
            variant === "outlined" && [
              "bg-transparent rounded-md border",
              showError ? "border-destructive" : focused ? "border-primary border-2" : "border-border",
            ]
          )}
        >
          {leadingIcon && (
            <span className="ml-3 size-5 flex items-center justify-center text-on-surface-variant shrink-0">
              {leadingIcon}
            </span>
          )}

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-0 transition-all duration-150 pointer-events-none text-on-surface-variant",
                leadingIcon ? "left-10" : variant === "outlined" ? "left-3" : "left-4",
                isFloating
                  ? "top-0 -translate-y-1/2 text-xs bg-background px-1 rounded"
                  : "top-1/2 -translate-y-1/2 text-base",
                variant === "filled" && isFloating && "bg-transparent top-2.5 translate-y-0 text-xs",
                showError && "text-destructive",
                focused && !showError && "text-primary"
              )}
            >
              {label}
            </label>
          )}

          <Input
            ref={ref}
            id={inputId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-on-surface",
              leadingIcon ? "pl-2" : variant === "outlined" ? "px-3" : "px-4",
              trailingIcon ? "pr-2" : "pr-4",
              label && variant === "filled" ? "pt-5 pb-1" : "py-3",
              label && variant === "outlined" ? "pt-4 pb-2" : "",
              className
            )}
            {...props}
          />

          {trailingIcon && (
            <span className="mr-3 size-5 flex items-center justify-center text-on-surface-variant shrink-0">
              {trailingIcon}
            </span>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              "text-xs px-4",
              showError ? "text-destructive" : "text-on-surface-variant"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
TextField.displayName = "TextField"

export { TextField }
