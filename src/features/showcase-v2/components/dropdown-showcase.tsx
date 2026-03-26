import * as React from "react"
import { Dropdown } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

const PERIODS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
]

const WORLDS = [
  { value: "world1", label: "Yoshi's Island" },
  { value: "world2", label: "Egg Plains" },
  { value: "world3", label: "Jungle Fever" },
  { value: "world4", label: "Shy Guy Jungle" },
]

export function DropdownShowcase() {
  const [period, setPeriod] = React.useState("30d")
  const [world, setWorld] = React.useState("")

  return (
    <ComponentSection
      id="dropdown"
      title="Dropdown"
      description="Dropdown selects with green-themed focus and hover states."
    >
      <DemoRow label="Default">
        <div className="w-64">
          <Dropdown options={PERIODS} value={period} onValueChange={setPeriod} placeholder="Select time period" />
        </div>
      </DemoRow>

      <DemoRow label="With Label">
        <div className="w-64">
          <Dropdown options={WORLDS} value={world} onValueChange={setWorld} label="World" placeholder="Choose a world" />
        </div>
      </DemoRow>

      <DemoRow label="Disabled">
        <div className="w-64">
          <Dropdown options={PERIODS} value="30d" disabled placeholder="Disabled" />
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
