import * as React from "react"
import { Star, Zap, Globe } from "lucide-react"
import { Chip } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function ChipShowcase() {
  const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind"])

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag))

  return (
    <ComponentSection
      id="chip"
      title="Chip"
      description="Chips are compact elements that represent an attribute, input, or action."
    >
      <DemoRow label="Assist">
        <Chip variant="assist" leadingIcon={<Star className="size-4" />}>
          Add to starred
        </Chip>
        <Chip variant="assist" leadingIcon={<Zap className="size-4" />}>
          Quick action
        </Chip>
        <Chip variant="assist" leadingIcon={<Globe className="size-4" />}>
          Open in browser
        </Chip>
      </DemoRow>

      <DemoRow label="Suggestion">
        <Chip variant="suggestion">React</Chip>
        <Chip variant="suggestion">TypeScript</Chip>
        <Chip variant="suggestion">Tailwind CSS</Chip>
        <Chip variant="suggestion">shadcn/ui</Chip>
      </DemoRow>

      <DemoRow label="Input (removable)">
        {tags.map((tag) => (
          <Chip key={tag} variant="input" onRemove={() => removeTag(tag)}>
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span className="text-sm text-on-surface-variant">All tags removed</span>
        )}
      </DemoRow>

      <DemoRow label="Disabled">
        <Chip variant="assist" disabled>Disabled assist</Chip>
        <Chip variant="suggestion" disabled>Disabled</Chip>
      </DemoRow>
    </ComponentSection>
  )
}
