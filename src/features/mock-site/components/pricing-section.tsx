import * as React from "react"
import { Modal, Button, RadioGroup, RadioOption } from "@/styles/v1"
import { PricingCard } from "../styles"

const PLANS = [
  {
    name: "Starter",
    price: 0,
    features: [
      "Up to 3 dashboards",
      "5 data sources",
      "7-day data history",
      "Email support",
    ],
    cta: "Get started free",
    badge: undefined,
    highlighted: false,
  },
  {
    name: "Pro",
    price: 49,
    features: [
      "Unlimited dashboards",
      "25 data sources",
      "1-year data history",
      "Custom report builder",
      "Priority support",
    ],
    cta: "Start free trial",
    badge: "Most Popular",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 149,
    features: [
      "Everything in Pro",
      "Unlimited data sources",
      "Unlimited history",
      "SSO & SAML",
      "SLA & dedicated support",
      "Custom integrations",
    ],
    cta: "Contact sales",
    badge: "Best Value",
    highlighted: false,
  },
]

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = React.useState<"monthly" | "annual">("monthly")
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-on-surface mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-on-surface-variant mb-6">
            No hidden fees. Cancel anytime.
          </p>
          <div className="inline-flex items-center justify-center">
            <RadioGroup
              value={billingPeriod}
              onValueChange={(v: string) => setBillingPeriod(v as "monthly" | "annual")}
              className="flex-row gap-6"
            >
              <RadioOption value="monthly" label="Monthly" />
              <RadioOption value="annual" label="Annual · Save 20%" />
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              period={billingPeriod}
              onViewDetails={plan.highlighted ? () => setDetailsOpen(true) : undefined}
            />
          ))}
        </div>
      </div>

      <Modal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Pro Plan Details"
        description="Everything you need to scale your analytics."
        footer={
          <div className="flex gap-2">
            <Button variant="text" onClick={() => setDetailsOpen(false)}>Close</Button>
            <Button variant="filled">Start free trial</Button>
          </div>
        }
      >
        <ul className="text-sm text-on-surface-variant list-disc list-inside space-y-2 mt-2">
          <li>Unlimited dashboards with drag-and-drop builder</li>
          <li>25 native integrations (Salesforce, Stripe, HubSpot…)</li>
          <li>1-year historical data access</li>
          <li>Custom report scheduling (daily/weekly/monthly)</li>
          <li>Team collaboration and commenting</li>
          <li>Priority email and chat support</li>
        </ul>
      </Modal>
    </section>
  )
}
