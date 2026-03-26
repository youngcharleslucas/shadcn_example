import { Plus, Mail } from "lucide-react"
import { Button } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function ButtonShowcase() {
  return (
    <ComponentSection
      id="button"
      title="Button"
      description="Buttons allow users to take actions with a single tap. M3 defines five button types."
    >
      <DemoRow label="Variants">
        <Button variant="filled">Filled</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant="elevated">Elevated</Button>
        <Button variant="tonal">Tonal</Button>
      </DemoRow>

      <DemoRow label="Sizes">
        <Button variant="filled" size="sm">Small</Button>
        <Button variant="filled" size="md">Medium</Button>
        <Button variant="filled" size="lg">Large</Button>
      </DemoRow>

      <DemoRow label="With Icons">
        <Button variant="filled"><Plus />Add Item</Button>
        <Button variant="outlined"><Mail />Send Email</Button>
        <Button variant="tonal"><Plus />New Report</Button>
      </DemoRow>

      <DemoRow label="States">
        <Button variant="filled">Default</Button>
        <Button variant="filled" disabled>Disabled</Button>
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" disabled>Disabled</Button>
      </DemoRow>

      <DemoRow label="Example — Dialog Actions">
        <div className="flex gap-2">
          <Button variant="text">Cancel</Button>
          <Button variant="filled">Confirm</Button>
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
