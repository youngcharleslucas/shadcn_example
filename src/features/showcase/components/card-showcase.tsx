import { Star, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function CardShowcase() {
  return (
    <ComponentSection
      id="card"
      title="Card"
      description="Cards contain content and actions about a single subject. M3 has three card styles."
    >
      <DemoRow label="Variants">
        <Card variant="elevated" className="w-56">
          <CardHeader>
            <CardTitle>Elevated</CardTitle>
            <CardDescription>bg-surface-container-low + shadow</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Use for content that needs visual separation.</p>
          </CardContent>
        </Card>

        <Card variant="filled" className="w-56">
          <CardHeader>
            <CardTitle>Filled</CardTitle>
            <CardDescription>bg-surface-container-highest</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Use for less prominent items in a list.</p>
          </CardContent>
        </Card>

        <Card variant="outlined" className="w-56">
          <CardHeader>
            <CardTitle>Outlined</CardTitle>
            <CardDescription>border-border, no shadow</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Use when items are at the same level.</p>
          </CardContent>
        </Card>
      </DemoRow>

      <DemoRow label="Example — Feature Card">
        <Card variant="outlined" className="w-72">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center mb-3">
              <Star className="size-5 text-on-primary-container" />
            </div>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>Deep dive into your data with real-time insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">
              Track KPIs, build custom dashboards, and export reports in any format.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="text" className="px-0">
              Learn more <ArrowRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      </DemoRow>
    </ComponentSection>
  )
}
