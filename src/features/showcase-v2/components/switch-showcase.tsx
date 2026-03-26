import * as React from "react"
import { Switch } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function SwitchShowcase() {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)
  const [notifs, setNotifs] = React.useState(true)
  const [emails, setEmails] = React.useState(false)

  return (
    <ComponentSection
      id="switch"
      title="Switch"
      description="Toggle switches with Yoshi-green checked state and egg-yellow accents."
    >
      <DemoRow label="States">
        <Switch checked={checked1} onCheckedChange={setChecked1} />
        <Switch checked={checked2} onCheckedChange={setChecked2} />
        <Switch disabled />
        <Switch checked disabled />
      </DemoRow>

      <DemoRow label="With Label (right)">
        <Switch label="Enable notifications" checked={notifs} onCheckedChange={setNotifs} />
      </DemoRow>

      <DemoRow label="With Label (left)">
        <Switch label="Dark mode" labelPosition="left" checked={emails} onCheckedChange={setEmails} />
      </DemoRow>

      <DemoRow label="Example — Settings panel">
        <div className="flex flex-col gap-4 w-72 p-4 rounded-2xl bg-surface-container border-2 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-on-surface">Push Notifications</p>
              <p className="text-xs text-on-surface-variant">Receive alerts on your device</p>
            </div>
            <Switch checked={notifs} onCheckedChange={setNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-on-surface">Email Digest</p>
              <p className="text-xs text-on-surface-variant">Weekly summary email</p>
            </div>
            <Switch checked={emails} onCheckedChange={setEmails} />
          </div>
        </div>
      </DemoRow>
    </ComponentSection>
  )
}
