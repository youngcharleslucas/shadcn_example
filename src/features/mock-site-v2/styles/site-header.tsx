import { useTheme } from "@/providers/theme-provider"
import { Switch, Button, Breadcrumb } from "@/styles/v1"
import { cn } from "@/lib/utils"

export interface SiteHeaderProps {
  className?: string
}

export function SiteHeader({ className }: SiteHeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <header
      className={cn(
        "sticky top-8 z-40 w-full bg-surface-container-low border-b border-outline-variant",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="text-lg font-medium text-primary">Luminary</span>
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="text" size="sm">Features</Button>
            <Button variant="text" size="sm">Pricing</Button>
            <Button variant="text" size="sm">Dashboard</Button>
            <Button variant="text" size="sm">About</Button>
          </nav>
        </div>

        <div className="hidden md:flex items-center">
          <Breadcrumb
            items={[
              { label: "Home", href: "#" },
              { label: "Luminary App" },
            ]}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            label={resolvedTheme === "dark" ? "Dark" : "Light"}
            checked={resolvedTheme === "dark"}
            onCheckedChange={toggleTheme}
            labelPosition="left"
          />
          <Button variant="outlined" size="sm">Log In</Button>
          <Button variant="filled" size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
