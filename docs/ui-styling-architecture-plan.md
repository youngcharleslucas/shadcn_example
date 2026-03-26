# UI Styling Architecture: Wrapper Component System

## Overview

We are implementing a layered styling architecture for a React + Vite + Tailwind CSS v4 + shadcn/ui project. The goal is to create a system where:

1. Raw shadcn components are never imported directly by feature code.
2. All styling flows through versioned wrapper components that reference design tokens.
3. Each feature has its own styles folder that composes from the shared base.
4. The entire UI can be incrementally migrated from v1 to v2 on a per-feature basis.
5. Theming (dark mode, future rebrands) works automatically through CSS custom properties.

No developer should be writing raw Tailwind color classes like `bg-blue-500` in feature code. All color references must go through semantic tokens (`bg-primary`, `text-muted-foreground`, etc.).

---

## Prerequisites

- React 18+ with Vite
- Tailwind CSS v4 (using `@theme inline` and `@layer` syntax)
- shadcn/ui installed and initialized (components in `src/components/ui/`)
- TypeScript
- `class-variance-authority` (cva) already present via shadcn
- `clsx` and `tailwind-merge` available via shadcn's `cn` utility at `src/lib/utils.ts`

---

## Folder Structure

Create the following folder structure. Do not move or rename existing shadcn components in `src/components/ui/`.

```
src/
├── components/
│   └── ui/                              # RAW SHADCN — do not edit, do not import from feature code
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ... (other shadcn components)
│
├── lib/
│   └── utils.ts                         # shadcn cn() utility (already exists)
│
├── styles/
│   ├── globals.css                      # design tokens (:root, .dark, @theme inline)
│   ├── components.css                   # optional: @layer components shared classes
│   │
│   ├── v1/                              # v1 base wrapper components
│   │   ├── index.ts                     # barrel export for all v1 wrappers
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   │
│   └── v2/                              # v2 base wrapper components (created when v2 begins)
│       ├── index.ts
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       └── table.tsx
│
├── features/
│   ├── dashboard/
│   │   ├── styles/                      # dashboard-specific styled wrappers
│   │   │   ├── index.ts                 # barrel: exports feature wrappers + re-exports base
│   │   │   ├── stat-card.tsx
│   │   │   ├── metric-badge.tsx
│   │   │   └── dashboard-button.tsx
│   │   ├── components/                  # dashboard UI components (import from ../styles)
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── stats-grid.tsx
│   │   │   └── recent-activity.tsx
│   │   └── pages/
│   │       └── dashboard-page.tsx
│   │
│   ├── billing/
│   │   ├── styles/
│   │   │   ├── index.ts
│   │   │   ├── plan-card.tsx
│   │   │   ├── price-badge.tsx
│   │   │   └── billing-button.tsx
│   │   ├── components/
│   │   └── pages/
│   │
│   └── settings/
│       ├── styles/
│       │   ├── index.ts
│       │   └── settings-input.tsx
│       ├── components/
│       └── pages/
│
├── providers/
│   └── theme-provider.tsx               # theme context (v1/v2 + dark/light)
│
└── App.tsx
```

---

## Implementation Steps

Execute these steps in order.

### Step 1: Verify Existing Setup

Before making any changes, verify:

1. shadcn is initialized and components exist in `src/components/ui/`.
2. `src/lib/utils.ts` exports a `cn()` function (from shadcn init).
3. `globals.css` has the Tailwind v4 structure with `@theme inline`, `:root`, and `.dark` blocks.
4. `tailwind.config.ts` or `tailwind.config.js` exists if using Tailwind v3, or Tailwind v4's CSS-first config is in use.

Do not proceed if shadcn is not initialized. Run `npx shadcn@latest init` first if needed.

### Step 2: Set Up Path Aliases

In `tsconfig.json` (or `tsconfig.app.json` if using Vite's split config), ensure these path aliases exist:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Verify the corresponding Vite alias exists in `vite.config.ts`:

```ts
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

These should already exist from shadcn init. If not, add them.

### Step 3: Create the Theme Provider

Create `src/providers/theme-provider.tsx`:

```tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type DesignVersion = "v1" | "v2";
type ColorMode = "light" | "dark" | "system";

interface ThemeContextValue {
  designVersion: DesignVersion;
  colorMode: ColorMode;
  setDesignVersion: (version: DesignVersion) => void;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultDesignVersion?: DesignVersion;
  defaultColorMode?: ColorMode;
}

export function ThemeProvider({
  children,
  defaultDesignVersion = "v1",
  defaultColorMode = "system",
}: ThemeProviderProps) {
  const [designVersion, setDesignVersion] = useState<DesignVersion>(defaultDesignVersion);
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);

  useEffect(() => {
    const root = document.documentElement;

    // Handle color mode
    root.classList.remove("light", "dark");

    if (colorMode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(colorMode);
    }
  }, [colorMode]);

  useEffect(() => {
    const root = document.documentElement;

    // Handle design version
    root.classList.remove("theme-v1", "theme-v2");
    root.classList.add(`theme-${designVersion}`);
  }, [designVersion]);

  return (
    <ThemeContext.Provider
      value={{ designVersion, colorMode, setDesignVersion, setColorMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

Wrap the app in `src/App.tsx` (or `src/main.tsx`) with `<ThemeProvider>`.

### Step 4: Update globals.css With Design Version Scoping

The existing `globals.css` already has `:root` and `.dark` blocks. Add a `.theme-v2` scope for future v2 token overrides. Do NOT change any existing token values — just add the empty v2 scope as a placeholder.

Add this after the existing `.dark` block:

```css
/* v2 design token overrides — populated when v2 design is ready */
.theme-v2 {
  /* Override token values here when v2 designs are finalized */
  /* Example:
  --primary: oklch(0.55 0.2 260);
  --radius: 0.75rem;
  */
}

.theme-v2.dark {
  /* v2 dark mode overrides */
}
```

### Step 5: Create v1 Base Wrapper Components

Create the `src/styles/v1/` directory and build wrapper components for every shadcn component the project uses. Each wrapper:

- Imports the raw shadcn component from `@/components/ui/`.
- Uses `forwardRef` to forward refs.
- Applies default styling using `cn()` and semantic Tailwind token classes.
- Defines its own variant/size props using plain objects (not cva, to keep it simple and decoupled from shadcn's internal cva).
- Exports both the component and its props type.
- Passes through all remaining props to the underlying shadcn component.

#### Template: Button wrapper

Create `src/styles/v1/button.tsx`:

```tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  ghost:
    "hover:bg-accent hover:text-accent-foreground",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90",
  link:
    "text-primary underline-offset-4 hover:underline",
} as const;

const sizeStyles = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-11 px-6 text-base rounded-lg",
  xl: "h-14 px-8 text-base rounded-xl",
  icon: "h-10 w-10 rounded-lg",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface StyledButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, StyledButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

#### Template: Card wrapper

Create `src/styles/v1/card.tsx`:

```tsx
import { forwardRef, type HTMLAttributes } from "react";
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ShadcnCard
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardHeader ref={ref} className={cn("pb-3", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardTitle
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardContent ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardFooter ref={ref} className={cn(className)} {...props} />
));
CardFooter.displayName = "CardFooter";
```

#### Template: Input wrapper

Create `src/styles/v1/input.tsx`:

```tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
}

const sizeStyles = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-11 px-4 text-base rounded-lg",
} as const;

export const Input = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ inputSize = "md", error = false, className, ...props }, ref) => {
    return (
      <ShadcnInput
        ref={ref}
        className={cn(
          sizeStyles[inputSize],
          "border border-input bg-background text-foreground",
          "placeholder:text-muted-foreground",
          "focus:border-primary focus:ring-2 focus:ring-ring/30",
          "transition-colors",
          error && "border-destructive focus:border-destructive focus:ring-destructive/30",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
```

#### Template: Badge wrapper

Create `src/styles/v1/badge.tsx`:

```tsx
import { forwardRef, type HTMLAttributes } from "react";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground bg-transparent",
  destructive: "bg-destructive text-white",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export interface StyledBadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, StyledBadgeProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <ShadcnBadge
        ref={ref}
        className={cn(
          "rounded-md px-2.5 py-0.5 text-xs font-medium",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
```

#### Barrel export

Create `src/styles/v1/index.ts`:

```tsx
export { Button, type StyledButtonProps, type ButtonVariant, type ButtonSize } from "./button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export { Input, type StyledInputProps } from "./input";
export { Badge, type StyledBadgeProps, type BadgeVariant } from "./badge";
```

Add more component wrappers to this barrel as needed. Every shadcn component the project uses should eventually have a v1 wrapper.

### Step 6: Create Feature Style Folders

For each feature, create a `styles/` directory with:

1. Feature-specific composed wrapper components that import from `@/styles/v1`.
2. A barrel `index.ts` that exports feature wrappers AND re-exports any base wrappers the feature uses unchanged.

#### Example: Dashboard feature styles

Create `src/features/dashboard/styles/stat-card.tsx`:

```tsx
import { Card, CardHeader, CardContent } from "@/styles/v1";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "flat";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: Trend;
  description?: string;
  className?: string;
}

const trendStyles: Record<Trend, string> = {
  up: "text-green-600 dark:text-green-400",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

export function StatCard({
  title,
  value,
  trend = "flat",
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <p className={cn("text-3xl font-bold", trendStyles[trend])}>{value}</p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
```

Create `src/features/dashboard/styles/dashboard-button.tsx`:

```tsx
import { Button, type StyledButtonProps } from "@/styles/v1";
import { cn } from "@/lib/utils";

export function DashboardButton({
  size = "sm",
  className,
  ...props
}: StyledButtonProps) {
  return (
    <Button
      size={size}
      className={cn("uppercase tracking-wide text-xs", className)}
      {...props}
    />
  );
}
```

Create `src/features/dashboard/styles/index.ts`:

```tsx
// Feature-specific wrappers
export { StatCard } from "./stat-card";
export { DashboardButton } from "./dashboard-button";

// Re-export base components used unchanged by this feature
export { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/styles/v1";
export { Input } from "@/styles/v1";
export { Badge } from "@/styles/v1";
```

#### Example: Billing feature styles

Create `src/features/billing/styles/plan-card.tsx`:

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/styles/v1";
import { Button } from "@/styles/v1";
import { Badge } from "@/styles/v1";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  price: string;
  interval: string;
  features: string[];
  recommended?: boolean;
  onSelect: () => void;
  className?: string;
}

export function PlanCard({
  name,
  price,
  interval,
  features,
  recommended = false,
  onSelect,
  className,
}: PlanCardProps) {
  return (
    <Card
      className={cn(
        recommended && "border-primary ring-2 ring-primary/20",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          {recommended && <Badge variant="default">Recommended</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">
          {price}
          <span className="text-sm font-normal text-muted-foreground">
            /{interval}
          </span>
        </p>
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-muted-foreground">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={recommended ? "primary" : "outline"}
          className="w-full"
          onClick={onSelect}
        >
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
```

Create `src/features/billing/styles/index.ts`:

```tsx
export { PlanCard } from "./plan-card";

// Re-export base components used unchanged
export { Button } from "@/styles/v1";
export { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/styles/v1";
export { Badge } from "@/styles/v1";
export { Input } from "@/styles/v1";
```

### Step 7: Wire Up Feature Pages

Feature pages and components import ONLY from their own `../styles` barrel. Never from `@/components/ui/`, never from `@/styles/v1` directly, never from another feature's styles.

Example `src/features/dashboard/pages/dashboard-page.tsx`:

```tsx
import { StatCard, DashboardButton, Card, CardContent } from "../styles";

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <DashboardButton variant="outline">Export</DashboardButton>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Revenue" value="$42,500" trend="up" />
        <StatCard title="Users" value="1,205" trend="up" />
        <StatCard title="Churn" value="3.2%" trend="down" />
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* chart, table, or other content */}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## v2 Migration Procedure

When v2 design is ready, follow these steps:

### 1. Populate v2 token overrides in globals.css

Fill in the `.theme-v2` block with the new design token values:

```css
.theme-v2 {
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.985 0 0);
  --radius: 0.75rem;
  /* ...all changed tokens */
}
```

### 2. Create v2 base wrappers

Copy `src/styles/v1/` to `src/styles/v2/`. Update the styling in each wrapper to match the v2 design. The exported component names and prop interfaces MUST remain identical to v1 so they are drop-in replacements.

Example change in `src/styles/v2/button.tsx`:

```tsx
// v2: larger default radius, bolder shadows, different hover
const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 shadow-md font-bold",
  // ... updated styles
} as const;

const sizeStyles = {
  md: "h-11 px-5 text-sm rounded-xl",  // taller, rounder than v1
  // ... updated sizes
} as const;
```

### 3. Migrate features one at a time

For each feature, change the import source in its `styles/index.ts`:

```tsx
// BEFORE
export { Button } from "@/styles/v1";
export { Card, CardContent } from "@/styles/v1";

// AFTER
export { Button } from "@/styles/v2";
export { Card, CardContent } from "@/styles/v2";
```

No changes needed in the feature's pages or components. The barrel swap propagates the new styles.

### 4. If a feature wrapper needs v2-specific changes

Create a versioned styles subfolder for that feature:

```
features/dashboard/styles/
  v1/
    stat-card.tsx     # imports from @/styles/v1
    index.ts
  v2/
    stat-card.tsx     # imports from @/styles/v2, possibly new layout
    index.ts
```

Then update the feature's components to import from `../styles/v2` instead of `../styles/v1`.

---

## Rules and Conventions

These rules must be followed in all code:

### Import Rules

1. **Feature pages/components** import ONLY from their own `../styles` barrel.
2. **Feature styles** import ONLY from `@/styles/v1` (or `@/styles/v2` when migrated).
3. **Base wrappers (styles/v1, v2)** import ONLY from `@/components/ui/` (raw shadcn).
4. **No code outside of `src/styles/` and `src/features/*/styles/`** may import from `@/components/ui/`.
5. **No feature** may import from another feature's styles folder.

Dependency chain:

```
@/components/ui/*          ← only styles/v1 and styles/v2 import from here
    ↑
@/styles/v1/* (or v2)      ← only feature styles import from here
    ↑
features/*/styles/*        ← only that feature's components/pages import from here
    ↑
features/*/components/*    ← leaf nodes, no one imports their styled wrappers
features/*/pages/*
```

### Styling Rules

1. **Never use raw Tailwind color classes** (like `bg-blue-500`, `text-red-600`) in feature code. Always use semantic token classes: `bg-primary`, `text-muted-foreground`, `border-border`, etc.
2. **Layout utilities are fine inline.** Classes like `flex`, `grid`, `gap-4`, `px-6`, `mt-8`, `max-w-5xl` are not styling decisions — they are layout decisions and belong in feature code.
3. **All visual styling** (colors, shadows, borders, border-radius, font-weight for brand emphasis) belongs in the styles layer, not in page components.
4. **Every wrapper component must accept a `className` prop** and merge it last via `cn()` so consumers can override when needed.
5. **Use `forwardRef`** on all wrapper components that wrap native HTML elements or shadcn components that forward refs.
6. **Barrel exports must re-export** every base component the feature uses, even if unchanged. Feature code should never need to reach outside its own styles barrel.

### Naming Conventions

- Base wrapper files match the shadcn component name: `button.tsx`, `card.tsx`, `input.tsx`.
- Feature wrapper files use descriptive domain names: `stat-card.tsx`, `plan-card.tsx`, `metric-badge.tsx`.
- Variant type names use PascalCase: `ButtonVariant`, `BadgeVariant`.
- Props interfaces are named `Styled{Component}Props`: `StyledButtonProps`, `StyledInputProps`.
- Feature wrappers use function declarations (no forwardRef needed unless the feature explicitly needs refs).

---

## Checklist

After implementation, verify:

- [ ] `src/styles/v1/index.ts` exports wrappers for every shadcn component used in the project.
- [ ] Every feature has a `styles/index.ts` barrel that re-exports all components the feature needs.
- [ ] No file in `features/*/components/` or `features/*/pages/` imports from `@/components/ui/`.
- [ ] No file in `features/*/components/` or `features/*/pages/` imports from `@/styles/v1` directly — only from `../styles`.
- [ ] No raw color classes (`bg-blue-*`, `text-red-*`, `bg-green-*`, etc.) appear in feature page/component files. Semantic tokens only.
- [ ] Every wrapper component accepts and merges a `className` prop.
- [ ] `ThemeProvider` wraps the app root.
- [ ] `.theme-v2` scope exists in `globals.css` (even if empty placeholder).
- [ ] The app renders correctly with no visual regressions after the wrapper layer is introduced.
- [ ] Dark mode still works via the `.dark` class toggle.
