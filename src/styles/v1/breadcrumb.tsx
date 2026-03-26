import * as React from "react"
import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

export interface BreadcrumbItemDef {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItemDef[]
  className?: string
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items }, ref) => {
    return (
      <ShadBreadcrumb ref={ref} className={cn(className)}>
        <BreadcrumbList className="font-medium text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-on-surface">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={item.href ?? "#"}
                      className="text-primary hover:text-primary/80"
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="text-on-surface-variant" />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </ShadBreadcrumb>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
