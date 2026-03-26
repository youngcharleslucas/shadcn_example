import * as React from "react"
import { Dropdown } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

const PERIODS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
]

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
]

export function DropdownShowcase() {
  const [period, setPeriod] = React.useState("30d")
  const [country, setCountry] = React.useState("")

  return (
    <ComponentSection
      id="dropdown"
      title="Dropdown"
      description="Dropdowns allow users to select one option from a list, styled as an M3 select field."
    >
      <DemoRow label="Default">
        <div className="w-64">
          <Dropdown
            options={PERIODS}
            value={period}
            onValueChange={setPeriod}
            placeholder="Select time period"
          />
        </div>
      </DemoRow>

      <DemoRow label="With Label">
        <div className="w-64">
          <Dropdown
            options={COUNTRIES}
            value={country}
            onValueChange={setCountry}
            label="Country"
            placeholder="Choose a country"
          />
        </div>
      </DemoRow>

      <DemoRow label="Disabled">
        <div className="w-64">
          <Dropdown
            options={PERIODS}
            value="30d"
            disabled
            placeholder="Disabled"
          />
        </div>
      </DemoRow>

      <DemoRow label="Example — Dashboard Filter">
        <div className="flex items-end gap-3">
          <div className="w-52">
            <Dropdown
              options={PERIODS}
              value={period}
              onValueChange={setPeriod}
              label="Time Period"
            />
          </div>
          <div className="w-52">
            <Dropdown
              options={COUNTRIES}
              value={country}
              onValueChange={setCountry}
              label="Region"
              placeholder="All regions"
            />
          </div>
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
