import { Mail, Eye, Search } from "lucide-react"
import { TextField } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function TextFieldShowcase() {
  return (
    <ComponentSection
      id="text-field"
      title="Text Field"
      description="Text fields with Yoshi-green focus rings and borders."
    >
      <DemoRow label="Variants">
        <div className="w-64">
          <TextField variant="filled" label="Filled text field" />
        </div>
        <div className="w-64">
          <TextField variant="outlined" label="Outlined text field" />
        </div>
      </DemoRow>

      <DemoRow label="With Supporting Text">
        <div className="w-64">
          <TextField variant="outlined" label="Email" supportingText="We'll never share your email." />
        </div>
        <div className="w-64">
          <TextField variant="filled" label="Username" supportingText="Must be 3–20 characters." />
        </div>
      </DemoRow>

      <DemoRow label="Error State">
        <div className="w-64">
          <TextField variant="outlined" label="Password" error errorText="Password must be at least 8 characters." />
        </div>
        <div className="w-64">
          <TextField variant="filled" label="Email" error errorText="Invalid email address." />
        </div>
      </DemoRow>

      <DemoRow label="With Icons">
        <div className="w-64">
          <TextField variant="outlined" label="Search" leadingIcon={<Search className="size-4" />} />
        </div>
        <div className="w-64">
          <TextField variant="outlined" label="Email" leadingIcon={<Mail className="size-4" />} trailingIcon={<Eye className="size-4" />} />
        </div>
      </DemoRow>

      <DemoRow label="Disabled">
        <div className="w-64">
          <TextField variant="outlined" label="Disabled" disabled defaultValue="Can't edit this" />
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
