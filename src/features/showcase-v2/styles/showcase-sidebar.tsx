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
        "w-64 shrink-0 bg-surface-container-low border-r-2 border-border",
        "flex flex-col overflow-y-auto",
        className
      )}
    >
      <div className="p-4 border-b-2 border-border bg-primary-container">
        <h1 className="text-base font-bold text-on-primary-container">Yoshi v2 Components</h1>
        <p className="text-xs text-on-primary-container/70 mt-0.5">Nintendo-inspired theme</p>
      </div>
      <nav className="p-2 flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-full text-sm transition-all duration-150",
              "hover:scale-[1.02] active:scale-95",
              activeId === item.id
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "text-on-surface hover:bg-primary/10 font-medium"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
