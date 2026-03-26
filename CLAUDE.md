# CLAUDE.md — Project Instructions

## Overview

Build a React + Vite + Tailwind CSS v4 + shadcn/ui project from scratch that demonstrates a component wrapper architecture based on Material Design 3 tokens exported from Figma. The project has two pages: a **Component Showcase** and a **Mock Website**.

Read `docs/ui-architecture-plan.md` before starting any work. All component and styling decisions must follow the architecture described in that document.

Read `docs/variables.css` to understand the M3 design tokens. These tokens are the source of truth for all colors and typography in the project.

---

## Project Setup

### 1. Scaffold

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install Tailwind CSS v4

Follow the current Tailwind CSS v4 + Vite installation method. Ensure the project uses the CSS-first configuration approach (`@theme inline`, `@layer`, `@import "tailwindcss"`), NOT the legacy `tailwind.config.js` approach.

### 3. Install shadcn/ui

```bash
npx shadcn@latest init
```

When prompted, select:
- TypeScript: yes
- Style: Default
- Base color: Neutral
- CSS variables: yes

### 4. Install shadcn components

Install ALL of the following shadcn components:

```bash
npx shadcn@latest add button card input badge dialog select table switch radio-group dropdown-menu breadcrumb toast tabs separator scroll-area sheet navigation-menu tooltip popover command textarea label checkbox avatar accordion alert alert-dialog aspect-ratio collapsible context-menu hover-card menubar progress skeleton slider sonner toggle toggle-group
```

### 5. Install additional dependencies

```bash
npm install react-router-dom lucide-react
```

### 6. Path aliases

Ensure `@/` maps to `./src/` in both `tsconfig.json` (or `tsconfig.app.json`) and `vite.config.ts`. This should already exist from shadcn init, but verify it.

---

## Design Tokens — Converting variables.css to globals.css

The file `docs/variables.css` contains Material Design 3 tokens in CSS custom property format. These are organized as:

- **`--md-ref-palette-*`** — raw tonal palette values (primary, secondary, tertiary, error, neutral, neutral-variant) at steps 0–100
- **`--md-sys-color-*-light`** — light mode semantic colors that map to palette steps
- **`--md-sys-color-*-dark`** — dark mode semantic colors that map to palette steps
- **`--md-sys-typescale-*`** — typography tokens (family, weight)
- **`--md-ref-typeface-*`** — base typeface references

### Token-to-shadcn Mapping

In `src/styles/globals.css`, map the M3 tokens to shadcn's expected variable names. Use the hex values from variables.css. The mapping is:

#### Light mode (`:root`)

| shadcn variable | M3 source | Hex value |
|---|---|---|
| `--background` | `--md-sys-color-background-light` | `#fffbfe` |
| `--foreground` | `--md-sys-color-on-background-light` | `#1c1b1f` |
| `--card` | `--md-sys-color-surface-light` | `#fffbfe` |
| `--card-foreground` | `--md-sys-color-on-surface-light` | `#1c1b1f` |
| `--popover` | `--md-sys-color-surface-light` | `#fffbfe` |
| `--popover-foreground` | `--md-sys-color-on-surface-light` | `#1c1b1f` |
| `--primary` | `--md-sys-color-primary-light` | `#6750a4` |
| `--primary-foreground` | `--md-sys-color-on-primary-light` | `#ffffff` |
| `--secondary` | `--md-sys-color-secondary-container-light` | `#e8def8` |
| `--secondary-foreground` | `--md-sys-color-on-secondary-container-light` | `#1d192b` |
| `--muted` | `--md-sys-color-surface-variant-light` | `#e7e0ec` |
| `--muted-foreground` | `--md-sys-color-on-surface-variant-light` | `#49454f` |
| `--accent` | `--md-sys-color-tertiary-container-light` | `#ffd8e4` |
| `--accent-foreground` | `--md-sys-color-on-tertiary-container-light` | `#31111d` |
| `--destructive` | `--md-sys-color-error-light` | `#b3261e` |
| `--border` | `--md-sys-color-outline-light` | `#79747e` |
| `--input` | `--md-sys-color-outline-light` | `#79747e` |
| `--ring` | `--md-sys-color-primary-light` | `#6750a4` |

#### Dark mode (`.dark`)

| shadcn variable | M3 source | Hex value |
|---|---|---|
| `--background` | `--md-sys-color-background-dark` | `#1c1b1f` |
| `--foreground` | `--md-sys-color-on-background-dark` | `#e6e1e5` |
| `--card` | `--md-sys-color-surface-dark` | `#1c1b1f` |
| `--card-foreground` | `--md-sys-color-on-surface-dark` | `#e6e1e5` |
| `--popover` | `--md-sys-color-surface-dark` | `#1c1b1f` |
| `--popover-foreground` | `--md-sys-color-on-surface-dark` | `#e6e1e5` |
| `--primary` | `--md-sys-color-primary-dark` | `#d0bcff` |
| `--primary-foreground` | `--md-sys-color-on-primary-dark` | `#381e72` |
| `--secondary` | `--md-sys-color-secondary-container-dark` | `#4a4458` |
| `--secondary-foreground` | `--md-sys-color-on-secondary-container-dark` | `#e8def8` |
| `--muted` | `--md-sys-color-surface-variant-dark` | `#49454f` |
| `--muted-foreground` | `--md-sys-color-on-surface-variant-dark` | `#cac4d0` |
| `--accent` | `--md-sys-color-tertiary-container-dark` | `#633b48` |
| `--accent-foreground` | `--md-sys-color-on-tertiary-container-dark` | `#ffd8e4` |
| `--destructive` | `--md-sys-color-error-dark` | `#f2b8b5` |
| `--border` | `--md-sys-color-outline-dark` | `#938f99` |
| `--input` | `--md-sys-color-outline-dark` | `#938f99` |
| `--ring` | `--md-sys-color-primary-dark` | `#d0bcff` |

#### Additional M3 tokens to register

In addition to the standard shadcn variables, register these M3-specific tokens in `:root` and `.dark` so they are available for M3-flavored components:

```
--primary-container / --on-primary-container
--secondary-container / --on-secondary-container  (secondary already maps here, but keep explicit tokens too)
--tertiary / --on-tertiary
--tertiary-container / --on-tertiary-container
--error-container / --on-error-container
--surface-tint
--inverse-surface / --inverse-on-surface / --inverse-primary
--outline-variant (use neutral-variant.80 light / neutral-variant.30 dark)
--surface-container-lowest (use neutral.100 light / neutral.4 or #0e0e11 dark)
--surface-container-low (use neutral.96 or #f7f2f7 light / neutral.10 dark)
--surface-container (use neutral.94 or #f2ecf2 light / neutral.12 or #201f23 dark)
--surface-container-high (use neutral.92 or #ece6ec light / neutral.17 or #2b292d dark)
--surface-container-highest (use neutral.90 light / neutral.22 or #363438 dark)
```

Register all additional tokens in the `@theme inline` block with the `--color-` prefix so Tailwind generates utility classes for them (e.g., `bg-primary-container`, `text-on-primary-container`).

#### Typography

Set the base font family to Roboto (from the M3 tokens). Add a Google Fonts import or install `@fontsource/roboto`:

```bash
npm install @fontsource/roboto
```

Import weights 400, 500, and 700 in the app entry point.

#### Border radius

M3 uses specific shape scale values. Set `--radius: 0.75rem` (12px) as the base. M3 shape scale for reference:
- Extra Small: 4px
- Small: 8px  
- Medium: 12px (this is `--radius`)
- Large: 16px
- Extra Large: 28px
- Full: 9999px (for FABs and chips)

---

## Folder Structure

Follow `docs/ui-architecture-plan.md` for the full structure. Here is the specific structure for this project:

```
src/
├── components/
│   └── ui/                              # raw shadcn (do not edit or import from pages)
│
├── lib/
│   └── utils.ts                         # cn() utility
│
├── styles/
│   ├── globals.css                      # tokens, @theme inline, :root, .dark
│   │
│   └── v1/                              # base wrapper components
│       ├── index.ts                     # barrel export
│       ├── button.tsx
│       ├── fab.tsx
│       ├── switch.tsx
│       ├── filter-chip.tsx
│       ├── text-field.tsx
│       ├── dropdown.tsx
│       ├── card.tsx
│       ├── radio-button.tsx
│       ├── data-table.tsx
│       ├── modal.tsx
│       ├── chip.tsx
│       ├── breadcrumb.tsx
│       └── toast.tsx
│
├── features/
│   ├── showcase/                        # Component Showcase page
│   │   ├── styles/
│   │   │   ├── index.ts
│   │   │   ├── component-section.tsx    # wrapper for each component demo section
│   │   │   └── showcase-sidebar.tsx     # navigation sidebar
│   │   ├── components/
│   │   │   ├── button-showcase.tsx
│   │   │   ├── fab-showcase.tsx
│   │   │   ├── switch-showcase.tsx
│   │   │   ├── filter-chip-showcase.tsx
│   │   │   ├── text-field-showcase.tsx
│   │   │   ├── dropdown-showcase.tsx
│   │   │   ├── card-showcase.tsx
│   │   │   ├── radio-button-showcase.tsx
│   │   │   ├── table-showcase.tsx
│   │   │   ├── modal-showcase.tsx
│   │   │   ├── chip-showcase.tsx
│   │   │   ├── breadcrumb-showcase.tsx
│   │   │   └── toast-showcase.tsx
│   │   └── pages/
│   │       └── showcase-page.tsx
│   │
│   └── mock-site/                       # Mock Website page
│       ├── styles/
│       │   ├── index.ts
│       │   ├── site-header.tsx
│       │   ├── site-footer.tsx
│       │   ├── hero-card.tsx
│       │   ├── pricing-card.tsx
│       │   ├── feature-card.tsx
│       │   ├── testimonial-card.tsx
│       │   ├── stats-card.tsx
│       │   ├── contact-form.tsx
│       │   └── data-dashboard.tsx
│       ├── components/
│       │   ├── hero-section.tsx
│       │   ├── features-section.tsx
│       │   ├── pricing-section.tsx
│       │   ├── testimonials-section.tsx
│       │   ├── stats-section.tsx
│       │   ├── dashboard-section.tsx
│       │   └── contact-section.tsx
│       └── pages/
│           └── mock-site-page.tsx
│
├── providers/
│   └── theme-provider.tsx               # light/dark mode toggle
│
├── App.tsx                              # router + theme provider
└── main.tsx
```

---

## Required Custom Wrapper Components (src/styles/v1/)

Build each of the following as a wrapper around shadcn primitives. Each wrapper must:
- Import only from `@/components/ui/` (raw shadcn)
- Use `forwardRef` where appropriate
- Accept a `className` prop and merge it last via `cn()`
- Use ONLY semantic token classes (`bg-primary`, `text-muted-foreground`, etc.) — never raw Tailwind colors
- Export the component and its props type from the barrel `index.ts`

### 1. Button (`button.tsx`)

Wrap shadcn Button. Variants: `filled`, `outlined`, `text`, `elevated`, `tonal`. These map to M3 button types:
- **filled**: `bg-primary text-primary-foreground` with elevation shadow
- **outlined**: `border border-border text-primary bg-transparent`
- **text**: `text-primary bg-transparent` no border
- **elevated**: `bg-surface-container-low text-primary shadow-md`
- **tonal**: `bg-secondary text-secondary-foreground`

Sizes: `sm`, `md`, `lg`.

### 2. FAB (`fab.tsx`)

Floating Action Button. Compose from shadcn Button with M3 FAB styling. Variants: `surface`, `primary`, `secondary`, `tertiary`. Sizes: `sm` (40px), `md` (56px), `lg` (96px). FABs are always rounded-full or use the M3 large radius. They contain an icon and optionally a label (extended FAB).

Props: `icon` (ReactNode), `label` (optional string for extended FAB), `variant`, `size`.

### 3. Switch (`switch.tsx`)

Wrap shadcn Switch. Apply M3 styling: track uses `--surface-container-highest` (unchecked) and `--primary` (checked). Thumb uses `--outline` (unchecked) and `--on-primary` (checked). Include optional label text prop.

### 4. Filter Chip (`filter-chip.tsx`)

Compose from shadcn Toggle or Badge. M3 filter chips have selected/unselected states. Selected: `bg-secondary text-on-secondary-container` with checkmark icon. Unselected: `border border-border text-on-surface bg-transparent`. Rounded full. Include `selected` prop and `onSelectedChange` callback.

### 5. Text Field (`text-field.tsx`)

Wrap shadcn Input. Variants: `filled`, `outlined` (M3 text field types).
- **filled**: bottom border only, `bg-surface-container-highest` background, no outline border
- **outlined**: full border, transparent background

Include `label` prop (renders as floating label above), `supportingText` prop (renders below), and `error` boolean + `errorText` prop. Leading and trailing icon slots via `leadingIcon` and `trailingIcon` props (ReactNode).

### 6. Dropdown (`dropdown.tsx`)

Wrap shadcn Select or DropdownMenu. Style the trigger to look like an M3 outlined text field with a trailing dropdown arrow icon. The dropdown menu items should use `bg-surface-container` with `text-on-surface`. Hover state uses `bg-surface-container-highest`.

### 7. Card (`card.tsx`)

Wrap shadcn Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter. Variants: `elevated`, `filled`, `outlined` (M3 card types):
- **elevated**: `bg-surface-container-low shadow-md` no border
- **filled**: `bg-surface-container-highest` no border no shadow
- **outlined**: `bg-surface border border-border` no shadow

Export Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.

### 8. Radio Button (`radio-button.tsx`)

Wrap shadcn RadioGroup + RadioGroupItem. Style with M3 colors: selected uses `--primary`, unselected uses `--on-surface-variant`. Include a `RadioGroup` wrapper and `RadioOption` component with `label` and `description` props.

### 9. Data Table (`data-table.tsx`)

Wrap shadcn Table + TableHeader + TableBody + TableRow + TableHead + TableCell. Apply M3 surface colors. Header row uses `bg-surface-container` with `text-on-surface-variant`. Body rows alternate or use `bg-surface` with hover `bg-surface-container`. Include a generic `DataTable` component that accepts `columns` and `data` props with TypeScript generics.

### 10. Modal (`modal.tsx`)

Wrap shadcn Dialog + DialogTrigger + DialogContent + DialogHeader + DialogTitle + DialogDescription + DialogFooter. Apply M3 dialog styling: `bg-surface-container-high` with `rounded-3xl` (28px). Scrim/overlay uses `bg-black/32`. Include standard `trigger`, `title`, `description`, and action button slots.

### 11. Chip (`chip.tsx`)

Different from filter chip. These are M3 assist/suggestion/input chips. Compose from shadcn Badge or a custom base. Variants: `assist`, `suggestion`, `input`. All are `rounded-full` with `border border-border`. `input` variant includes a trailing close/remove icon. Include `onRemove` callback for input chips. `leadingIcon` prop for assist chips.

### 12. Breadcrumb (`breadcrumb.tsx`)

Wrap shadcn Breadcrumb + BreadcrumbList + BreadcrumbItem + BreadcrumbLink + BreadcrumbSeparator + BreadcrumbPage. Apply M3 typography (label-large weight and family). Use `text-primary` for links, `text-on-surface` for current page. Accept an `items` array prop: `{ label: string, href?: string }[]` where the last item is treated as the current page.

### 13. Toast (`toast.tsx`)

Use shadcn Sonner (toast). Create a wrapper `showToast` function and a `ToastProvider` component. Style with M3 snackbar appearance: `bg-inverse-surface text-inverse-on-surface rounded-md`. Include optional action button styled as `text-inverse-primary`. Variants: `default`, `success`, `error`, `warning`.

---

## Page 1: Component Showcase (`/`)

### Layout

- **Left sidebar** (fixed, 260px wide, full height): Navigation menu listing all component sections. Each item is clickable and smooth-scrolls to the corresponding section on the page. The currently visible section should be highlighted in the sidebar (use Intersection Observer). The sidebar should use `bg-surface-container-low` with `text-on-surface`. Highlighted item uses `bg-secondary-container text-on-secondary-container`.

- **Main content area** (scrollable, right of sidebar): Vertically stacked component sections, each with an `id` for scroll targeting.

### Each Component Section

Every section should contain:
1. **Section title** — component name as a heading
2. **Description** — one-line explanation of the component
3. **Variant demos** — show every variant of the component side by side in a visual grid or row
4. **State demos** — show interactive states (default, hover, focused, disabled) where applicable
5. **Size demos** — show every size option if the component has size variants
6. **Example composition** — at least one realistic example of how the component would be used (e.g., a card with actual content, a form using text fields, a breadcrumb with real paths)

### Dark Mode Toggle

Include a theme toggle switch in the top-right corner of the page (or in the sidebar header). This toggles between light and dark mode using the ThemeProvider. The toggle should use the custom Switch wrapper component.

---

## Page 2: Mock Website (`/demo`)

### Purpose

A realistic fake SaaS product website that uses as many of the custom wrapper components as possible in context. This demonstrates that the wrapper components work together cohesively in a real layout.

### Required Sections (top to bottom)

1. **Header/Navigation Bar**
   - Site logo (text is fine), navigation links using text buttons
   - Breadcrumb showing the current page path
   - Dark mode toggle switch
   - A "Sign Up" filled button and "Log In" outlined button

2. **Hero Section**
   - Large heading, subheading, and a paragraph of body text
   - A filled primary button ("Get Started") and a text button ("Learn More")
   - An elevated card next to or below the text showing a mini dashboard preview

3. **Features Section**
   - Grid of 3–4 feature cards (use `outlined` card variant)
   - Each card has an icon, title, description
   - Filter chips above the grid to filter by category (e.g., "All", "Analytics", "Security", "Integrations")

4. **Pricing Section**
   - 3 pricing cards side by side (use `elevated` variant for the recommended plan)
   - Each card: plan name, price, feature list, CTA button
   - Chips/badges showing "Popular" or "Best Value"
   - Radio buttons to toggle between monthly/annual pricing

5. **Dashboard Preview Section**
   - A data table showing mock analytics data (5–8 rows)
   - Dropdown to filter the table by time period
   - Stats cards above the table showing key metrics
   - FAB in the corner for "Add New Report"

6. **Testimonials Section**
   - 3 testimonial cards (use `filled` card variant)
   - Each has a quote, author name, role, avatar placeholder

7. **Contact Section**
   - Contact form using text fields (name, email, message with filled and outlined variants)
   - Dropdown for "Inquiry Type"
   - A submit filled button
   - A toast notification on form submit ("Message sent!")

8. **Footer**
   - Simple footer with text links and muted text
   - Use M3 `surface-container` background

### Component Usage Checklist for Mock Site

Every custom wrapper component MUST appear at least once on this page:

- [ ] Button (filled, outlined, text variants)
- [ ] FAB (floating in bottom-right of dashboard section)
- [ ] Switch (dark mode toggle in header)
- [ ] Filter Chip (features section filter)
- [ ] Text Field (contact form — both filled and outlined)
- [ ] Dropdown (dashboard filter, contact form inquiry type)
- [ ] Card (feature cards, pricing cards, testimonial cards, stats cards)
- [ ] Radio Button (pricing toggle)
- [ ] Data Table (dashboard section)
- [ ] Modal (triggered by a button, e.g., "View Details" on a pricing card)
- [ ] Chip (pricing badges, feature tags)
- [ ] Breadcrumb (header navigation)
- [ ] Toast (contact form submission)

---

## Routing

Use `react-router-dom` with `BrowserRouter`:

| Path | Page |
|---|---|
| `/` | Component Showcase |
| `/demo` | Mock Website |

Include a simple nav link or tab toggle at the very top of the app (above the page content) to switch between the two pages. Style it subtly so it does not interfere with the page layouts.

---

## Import Rules (STRICT)

These rules are from `docs/ui-architecture-plan.md` and must be followed:

1. Files in `src/features/*/components/` and `src/features/*/pages/` may ONLY import from their own `../styles` barrel.
2. Files in `src/features/*/styles/` may ONLY import from `@/styles/v1`.
3. Files in `src/styles/v1/` may ONLY import from `@/components/ui/` (raw shadcn).
4. No file outside `src/styles/` and `src/features/*/styles/` may import from `@/components/ui/`.
5. No feature may import from another feature's styles.

Dependency chain:

```
@/components/ui/  ←  @/styles/v1/  ←  features/*/styles/  ←  features/*/components/ and pages/
```

---

## Styling Rules (STRICT)

1. **Never use raw Tailwind color classes** (`bg-blue-500`, `text-red-600`, etc.) anywhere in the project. ALL colors must reference semantic tokens: `bg-primary`, `text-muted-foreground`, `bg-surface-container`, etc.
2. Layout utilities (`flex`, `grid`, `gap-4`, `px-6`, `mt-8`, `max-w-5xl`, `w-full`, `h-screen`) are fine anywhere — these are layout, not design decisions.
3. All visual styling (colors, shadows, borders, border-radius, font-weight) belongs in wrapper components inside `styles/`, not in page-level code.
4. Every wrapper component must accept and merge a `className` prop via `cn()`.
5. Use the M3 tokens registered in `globals.css` for all color decisions.

---

## Code Quality

- Use TypeScript throughout. No `any` types.
- All components must have proper prop interfaces exported alongside the component.
- Use named exports, not default exports.
- Keep components focused. Each file should have one primary export.
- Use semantic HTML where appropriate (`nav`, `main`, `section`, `header`, `footer`, `article`).

---

## Build & Run

After setup, the project should run with:

```bash
npm run dev
```

And build without errors with:

```bash
npm run build
```

Verify both pages render correctly in both light and dark mode before considering the task complete.
