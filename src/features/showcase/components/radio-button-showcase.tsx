import * as React from "react"
import { RadioGroup, RadioOption } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function RadioButtonShowcase() {
  const [plan, setPlan] = React.useState("monthly")
  const [notify, setNotify] = React.useState("all")

  return (
    <ComponentSection
      id="radio-button"
      title="Radio Button"
      description="Radio buttons allow users to select one option from a set."
    >
      <DemoRow label="Default">
        <RadioGroup value={plan} onValueChange={setPlan}>
          <RadioOption value="monthly" label="Monthly" />
          <RadioOption value="annual" label="Annual" />
          <RadioOption value="lifetime" label="Lifetime" disabled />
        </RadioGroup>
      </DemoRow>

      <DemoRow label="With Descriptions">
        <RadioGroup value={notify} onValueChange={setNotify}>
          <RadioOption
            value="all"
            label="All notifications"
            description="Receive every alert and update"
          />
          <RadioOption
            value="important"
            label="Important only"
            description="Only critical alerts and mentions"
          />
          <RadioOption
            value="none"
            label="None"
            description="Mute all notifications"
          />
        </RadioGroup>
      </DemoRow>

      <DemoRow label="Example — Billing Toggle">
        <div className="p-4 rounded-xl bg-surface-container border border-outline-variant">
          <p className="text-sm font-medium text-on-surface mb-3">Billing cycle</p>
          <RadioGroup
            value={plan}
            onValueChange={setPlan}
            className="flex-row gap-6"
          >
            <RadioOption value="monthly" label="Monthly" description="Billed monthly" />
            <RadioOption value="annual" label="Annual" description="Save 20%" />
          </RadioGroup>
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
