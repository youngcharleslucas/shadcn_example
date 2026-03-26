import * as React from "react"
import { useTheme } from "@/providers/theme-provider"
import { Switch } from "@/styles/v1"
import { ShowcaseSidebar } from "../styles"
import { ButtonShowcase } from "../components/button-showcase"
import { FabShowcase } from "../components/fab-showcase"
import { SwitchShowcase } from "../components/switch-showcase"
import { FilterChipShowcase } from "../components/filter-chip-showcase"
import { TextFieldShowcase } from "../components/text-field-showcase"
import { DropdownShowcase } from "../components/dropdown-showcase"
import { CardShowcase } from "../components/card-showcase"
import { RadioButtonShowcase } from "../components/radio-button-showcase"
import { TableShowcase } from "../components/table-showcase"
import { ModalShowcase } from "../components/modal-showcase"
import { ChipShowcase } from "../components/chip-showcase"
import { BreadcrumbShowcase } from "../components/breadcrumb-showcase"
import { ToastShowcase } from "../components/toast-showcase"

const SECTIONS = [
  { id: "button",       label: "Button" },
  { id: "fab",          label: "FAB" },
  { id: "switch",       label: "Switch" },
  { id: "filter-chip",  label: "Filter Chip" },
  { id: "text-field",   label: "Text Field" },
  { id: "dropdown",     label: "Dropdown" },
  { id: "card",         label: "Card" },
  { id: "radio-button", label: "Radio Button" },
  { id: "data-table",   label: "Data Table" },
  { id: "modal",        label: "Modal" },
  { id: "chip",         label: "Chip" },
  { id: "breadcrumb",   label: "Breadcrumb" },
  { id: "toast",        label: "Toast" },
]

export function ShowcasePage() {
  const [activeId, setActiveId] = React.useState(SECTIONS[0].id)
  const { resolvedTheme, toggleTheme } = useTheme()

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-background">
      <ShowcaseSidebar items={SECTIONS} activeId={activeId} className="sticky top-8 h-full" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-3 bg-background/80 backdrop-blur border-b border-outline-variant">
          <h1 className="text-sm font-medium text-on-surface-variant">Component Showcase</h1>
          <Switch
            label={resolvedTheme === "dark" ? "Dark" : "Light"}
            checked={resolvedTheme === "dark"}
            onCheckedChange={toggleTheme}
            labelPosition="left"
          />
        </div>

        <div className="px-8 py-4 max-w-4xl">
          <ButtonShowcase />
          <FabShowcase />
          <SwitchShowcase />
          <FilterChipShowcase />
          <TextFieldShowcase />
          <DropdownShowcase />
          <CardShowcase />
          <RadioButtonShowcase />
          <TableShowcase />
          <ModalShowcase />
          <ChipShowcase />
          <BreadcrumbShowcase />
          <ToastShowcase />
        </div>
      </main>
    </div>
  )
}
