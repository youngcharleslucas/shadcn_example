import * as React from "react"
import { RadioGroup, RadioOption } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function RadioButtonShowcase() {
  const [plan, setPlan] = React.useState("monthly")
  const [yoshi, setYoshi] = React.useState("green")

  return (
    <ComponentSection
      id="radio-button"
      title="Radio Button"
      description="Radio groups with Yoshi-green selected state."
    >
      <DemoRow label="Default">
        <RadioGroup value={plan} onValueChange={setPlan}>
          <RadioOption value="monthly" label="Monthly" />
          <RadioOption value="annual" label="Annual" />
          <RadioOption value="lifetime" label="Lifetime" disabled />
        </RadioGroup>
      </DemoRow>

      <DemoRow label="Example — Choose your Yoshi">
        <div className="p-4 rounded-2xl bg-surface-container border-2 border-border">
          <p className="text-sm font-bold text-on-surface mb-3">Choose your Yoshi</p>
          <RadioGroup value={yoshi} onValueChange={setYoshi}>
            <RadioOption value="green" label="Green Yoshi" description="The classic, fastest runner" />
            <RadioOption value="yellow" label="Yellow Yoshi" description="Produces sand clouds when stomping" />
            <RadioOption value="pink" label="Pink Yoshi" description="Floats longer when fluttering" />
            <RadioOption value="blue" label="Blue Yoshi" description="Can fly with any shell" />
          </RadioGroup>
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
