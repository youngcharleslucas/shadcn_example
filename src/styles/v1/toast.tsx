import * as React from "react"
import { Toaster as SonnerToaster, toast as sonnerToast } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

export type ToastVariant = "default" | "success" | "error" | "warning"

export interface ToastOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

const variantIcons: Record<ToastVariant, string> = {
  default: "",
  success: "✓",
  error: "✕",
  warning: "⚠",
}

export function showToast(
  message: string,
  variant: ToastVariant = "default",
  options?: ToastOptions
) {
  const icon = variantIcons[variant]

  const toastFn =
    variant === "success"
      ? sonnerToast.success
      : variant === "error"
      ? sonnerToast.error
      : variant === "warning"
      ? sonnerToast.warning
      : sonnerToast

  toastFn(message, {
    description: options?.description,
    duration: options?.duration ?? 4000,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
    icon: icon || undefined,
  })
}

export interface ToastProviderProps {
  className?: string
}

const ToastProvider = React.forwardRef<HTMLElement, ToastProviderProps>(
  ({ className }, _ref) => {
    return (
      <SonnerToaster
        className={cn(className)}
        toastOptions={{
          classNames: {
            toast:
              "bg-inverse-surface text-inverse-on-surface rounded-md border-0 shadow-lg font-medium",
            description: "text-inverse-on-surface/80",
            actionButton:
              "bg-transparent text-inverse-primary font-medium hover:underline",
            closeButton:
              "text-inverse-on-surface/60 hover:text-inverse-on-surface",
          },
        }}
      />
    )
  }
)
ToastProvider.displayName = "ToastProvider"

export { ToastProvider }
