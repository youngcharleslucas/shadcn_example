import * as React from "react"
import { Star, Shield } from "lucide-react"
import { FilterChip } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

const CATEGORIES = ["All", "Analytics", "Security", "Integrations", "Reporting"]

export function FilterChipShowcase() {
  const [selected, setSelected] = React.useState<string[]>(["All"])

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  return (
    <ComponentSection
      id="filter-chip"
      title="Filter Chip"
      description="Filter chips refine content using a set of toggleable filters."
    >
      <DemoRow label="States">
        <FilterChip>Unselected</FilterChip>
        <FilterChip selected>Selected</FilterChip>
        <FilterChip disabled>Disabled</FilterChip>
        <FilterChip selected disabled>Selected Disabled</FilterChip>
      </DemoRow>

      <DemoRow label="With Leading Icon">
        <FilterChip leadingIcon={<Star className="size-4" />}>Starred</FilterChip>
        <FilterChip selected leadingIcon={<Shield className="size-4" />}>Secure</FilterChip>
      </DemoRow>

      <DemoRow label="Example — Category Filter">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              selected={selected.includes(cat)}
              onSelectedChange={() => toggle(cat)}
            >
              {cat}
            </FilterChip>
          ))}
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
