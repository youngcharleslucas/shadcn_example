import * as React from "react"
import { Star, Zap, Egg } from "lucide-react"
import { Chip } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function ChipShowcase() {
  const [eggs, setEggs] = React.useState(["Red Egg", "Blue Egg", "Yellow Egg"])

  const removeEgg = (egg: string) => setEggs((prev) => prev.filter((e) => e !== egg))

  return (
    <ComponentSection
      id="chip"
      title="Chip"
      description="Tinted chips with a playful scale-up hover and bold green borders."
    >
      <DemoRow label="Assist">
        <Chip variant="assist" leadingIcon={<Star className="size-4" />}>Collect Star</Chip>
        <Chip variant="assist" leadingIcon={<Zap className="size-4" />}>Dash Attack</Chip>
        <Chip variant="assist" leadingIcon={<Egg className="size-4" />}>Throw Egg</Chip>
      </DemoRow>

      <DemoRow label="Suggestion">
        <Chip variant="suggestion">Green Yoshi</Chip>
        <Chip variant="suggestion">Egg Toss</Chip>
        <Chip variant="suggestion">Flutter Jump</Chip>
        <Chip variant="suggestion">Ground Pound</Chip>
      </DemoRow>

      <DemoRow label="Input (removable)">
        {eggs.map((egg) => (
          <Chip key={egg} variant="input" onRemove={() => removeEgg(egg)}>
            {egg}
          </Chip>
        ))}
        {eggs.length === 0 && (
          <span className="text-sm text-on-surface-variant">All eggs thrown!</span>
        )}
      </DemoRow>

      <DemoRow label="Disabled">
        <Chip variant="assist" disabled>Disabled assist</Chip>
        <Chip variant="suggestion" disabled>Disabled</Chip>
      </DemoRow>
    </ComponentSection>
  )
}
