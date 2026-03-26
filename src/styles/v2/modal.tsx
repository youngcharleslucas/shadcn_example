import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface ModalProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ trigger, title, description, children, footer, open, onOpenChange, className }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          className={cn(
            "bg-surface-container-high rounded-3xl border-0 shadow-2xl p-6",
            "sm:rounded-3xl",
            className
          )}
        >
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle className="text-on-surface text-xl font-medium">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription className="text-on-surface-variant">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          {children && <div className="py-2 text-on-surface">{children}</div>}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    )
  }
)
Modal.displayName = "Modal"

export { Modal }
