import { Plus, Edit, Star, Heart } from "lucide-react"
import { Fab } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function FabShowcase() {
  return (
    <ComponentSection
      id="fab"
      title="FAB"
      description="Fully circular FABs with a satisfying scale-up hover and bounce-back active effect."
    >
      <DemoRow label="Variants">
        <Fab variant="surface" icon={<Plus />} aria-label="Add" />
        <Fab variant="primary" icon={<Plus />} aria-label="Add" />
        <Fab variant="secondary" icon={<Edit />} aria-label="Edit" />
        <Fab variant="tertiary" icon={<Star />} aria-label="Favorite" />
      </DemoRow>

      <DemoRow label="Sizes">
        <Fab variant="primary" size="sm" icon={<Plus className="size-4" />} aria-label="Small FAB" />
        <Fab variant="primary" size="md" icon={<Plus />} aria-label="Medium FAB" />
        <Fab variant="primary" size="lg" icon={<Plus className="size-8" />} aria-label="Large FAB" />
      </DemoRow>

      <DemoRow label="Extended FAB (with label)">
        <Fab variant="primary" icon={<Plus />} label="New Report" aria-label="New Report" />
        <Fab variant="secondary" icon={<Heart />} label="Save" aria-label="Save" />
        <Fab variant="tertiary" icon={<Edit />} label="Edit" aria-label="Edit" />
      </DemoRow>
    </ComponentSection>
  )
}
