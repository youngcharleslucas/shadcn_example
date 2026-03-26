import { Breadcrumb } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function BreadcrumbShowcase() {
  return (
    <ComponentSection
      id="breadcrumb"
      title="Breadcrumb"
      description="Breadcrumbs help users understand their location in the app hierarchy."
    >
      <DemoRow label="Two levels">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Settings" },
          ]}
        />
      </DemoRow>

      <DemoRow label="Three levels">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analytics" },
          ]}
        />
      </DemoRow>

      <DemoRow label="Four levels">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Electronics", href: "/products/electronics" },
            { label: "Laptops" },
          ]}
        />
      </DemoRow>

      <DemoRow label="Example — App header breadcrumb">
        <div className="flex items-center h-12 px-4 bg-surface-container rounded-xl">
          <Breadcrumb
            items={[
              { label: "Workspace", href: "/workspace" },
              { label: "Reports", href: "/workspace/reports" },
              { label: "Q4 2024 Summary" },
            ]}
          />
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
