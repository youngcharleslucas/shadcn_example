import { Star, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function CardShowcase() {
  return (
    <ComponentSection
      id="card"
      title="Card"
      description="Rounder 2xl cards with green-tinted borders and bold hover effects."
    >
      <DemoRow label="Variants">
        <Card variant="elevated" className="w-56">
          <CardHeader>
            <CardTitle>Elevated</CardTitle>
            <CardDescription>shadow + green border on hover</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Rises up with extra shadow on hover.</p>
          </CardContent>
        </Card>

        <Card variant="filled" className="w-56">
          <CardHeader>
            <CardTitle>Filled</CardTitle>
            <CardDescription>bg-surface-container-highest</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Filled with the highest surface container.</p>
          </CardContent>
        </Card>

        <Card variant="outlined" className="w-56">
          <CardHeader>
            <CardTitle>Outlined</CardTitle>
            <CardDescription>2px green border</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">Border turns primary green on hover.</p>
          </CardContent>
        </Card>
      </DemoRow>

      <DemoRow label="Example — Feature Card">
        <Card variant="outlined" className="w-72">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center mb-3">
              <Star className="size-5 text-on-primary-container" />
            </div>
            <CardTitle>Power-Up Analytics</CardTitle>
            <CardDescription>Collect coins while tracking your KPIs in real time.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">
              Like a Super Star power-up — invincible insights at every level.
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
