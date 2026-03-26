import { cn } from "@/lib/utils"

export interface SiteFooterProps {
  className?: string
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("bg-surface-container border-t border-outline-variant py-12", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            { title: "Support", links: ["Docs", "Status", "Contact", "Community"] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-on-surface hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-outline-variant pt-8 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">Luminary</span>
          <p className="text-xs text-on-surface-variant">© 2024 Luminary, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
