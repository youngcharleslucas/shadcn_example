import { Breadcrumb } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function BreadcrumbShowcase() {
  return (
    <ComponentSection
      id="breadcrumb"
      title="Breadcrumb"
      description="Navigation breadcrumbs with Yoshi-green link color."
    >
      <DemoRow label="Two levels">
        <Breadcrumb items={[{ label: "Yoshi's Island", href: "#" }, { label: "World 1" }]} />
      </DemoRow>

      <DemoRow label="Three levels">
        <Breadcrumb items={[
          { label: "Home", href: "#" },
          { label: "Worlds", href: "#" },
          { label: "Egg Plains" },
        ]} />
      </DemoRow>

      <DemoRow label="Four levels">
        <Breadcrumb items={[
          { label: "Home", href: "#" },
          { label: "Worlds", href: "#" },
          { label: "World 4", href: "#" },
          { label: "Lava Cave" },
        ]} />
      </DemoRow>

      <DemoRow label="Example — In-game path">
        <div className="flex items-center h-12 px-4 bg-surface-container rounded-2xl border-2 border-border">
          <Breadcrumb items={[
            { label: "Yoshi's Island", href: "#" },
            { label: "World 3", href: "#" },
            { label: "Stage 3-4: Blargg's Boiler" },
          ]} />
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
