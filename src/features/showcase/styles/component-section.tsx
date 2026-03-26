import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComponentSectionProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ComponentSection({
  id,
  title,
  description,
  children,
  className,
}: ComponentSectionProps) {
  return (
    <section
      id={id}
      className={cn("py-10 border-b border-outline-variant last:border-0", className)}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-on-surface mb-1">{title}</h2>
        {description && (
          <p className="text-on-surface-variant text-sm">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export interface DemoRowProps {
  label?: string
  children: React.ReactNode
  className?: string
}

export function DemoRow({ label, children, className }: DemoRowProps) {
  return (
    <div className={cn("flex flex-col gap-2 mb-6", className)}>
      {label && (
        <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
