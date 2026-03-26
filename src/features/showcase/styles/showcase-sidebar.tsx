import { cn } from "@/lib/utils"

export interface SidebarItem {
  id: string
  label: string
}

export interface ShowcaseSidebarProps {
  items: SidebarItem[]
  activeId: string
  className?: string
}

export function ShowcaseSidebar({ items, activeId, className }: ShowcaseSidebarProps) {
  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <aside
      className={cn(
        "w-64 shrink-0 bg-surface-container-low border-r border-outline-variant",
        "flex flex-col overflow-y-auto",
        className
      )}
    >
      <div className="p-4 border-b border-outline-variant">
        <h1 className="text-base font-medium text-on-surface">M3 Components</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">shadcn/ui + Tailwind v4</p>
      </div>
      <nav className="p-2 flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              activeId === item.id
                ? "bg-secondary text-on-secondary-container font-medium"
                : "text-on-surface hover:bg-on-surface/8"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
