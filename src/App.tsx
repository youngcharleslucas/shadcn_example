import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/styles/v1"
import { ShowcasePage } from "@/features/showcase/pages/showcase-page"
import { MockSitePage } from "@/features/mock-site/pages/mock-site-page"

function AppNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center gap-1 px-4 py-1 bg-surface-container-low border-b border-outline-variant text-xs">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors ${
            isActive
              ? "text-primary font-medium bg-primary/10"
              : "text-on-surface-variant hover:text-on-surface hover:bg-on-surface/8"
          }`
        }
      >
        Component Showcase
      </NavLink>
      <NavLink
        to="/demo"
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors ${
            isActive
              ? "text-primary font-medium bg-primary/10"
              : "text-on-surface-variant hover:text-on-surface hover:bg-on-surface/8"
          }`
        }
      >
        Mock Website
      </NavLink>
    </nav>
  )
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <AppNav />
        <div className="pt-8">
          <Routes>
            <Route path="/" element={<ShowcasePage />} />
            <Route path="/demo" element={<MockSitePage />} />
          </Routes>
        </div>
        <ToastProvider />
      </BrowserRouter>
    </ThemeProvider>
  )
}
