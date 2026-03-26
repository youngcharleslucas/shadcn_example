import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/styles/v1"
import { ShowcasePage } from "@/features/showcase/pages/showcase-page"
import { MockSitePage } from "@/features/mock-site/pages/mock-site-page"
import { MockSiteV2Page } from "@/features/mock-site-v2/pages/mock-site-v2-page"
import { ShowcaseV2Page } from "@/features/showcase-v2/pages/showcase-v2-page"

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
        v1 Showcase
      </NavLink>
      <NavLink
        to="/v2"
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors ${
            isActive
              ? "text-primary font-medium bg-primary/10"
              : "text-on-surface-variant hover:text-on-surface hover:bg-on-surface/8"
          }`
        }
      >
        v2 Showcase 🦖
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
      <NavLink
        to="/demo-v2"
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors ${
            isActive
              ? "text-primary font-medium bg-primary/10"
              : "text-on-surface-variant hover:text-on-surface hover:bg-on-surface/8"
          }`
        }
      >
        v2 Increment 🦖
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
            <Route path="/v2" element={<ShowcaseV2Page />} />
            <Route path="/demo" element={<MockSitePage />} />
            <Route path="/demo-v2" element={<MockSiteV2Page />} />
          </Routes>
        </div>
        <ToastProvider />
      </BrowserRouter>
    </ThemeProvider>
  )
}
