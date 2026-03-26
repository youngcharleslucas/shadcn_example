import { TestimonialCard } from "../styles"

const TESTIMONIALS = [
  {
    quote:
      "Luminary replaced three separate analytics tools we were paying for. The dashboard builder is intuitive and our whole team adopted it within a week.",
    author: "Sarah Chen",
    role: "Head of Growth, Finch AI",
    initials: "SC",
  },
  {
    quote:
      "The real-time reports have completely changed how we run our weekly planning meetings. We go in with data, not gut feelings.",
    author: "Marcus Webb",
    role: "VP Engineering, Relay",
    initials: "MW",
  },
  {
    quote:
      "Setup took less than 20 minutes. We connected our Salesforce and Stripe data, built a revenue dashboard, and shared it with the board the same day.",
    author: "Priya Nair",
    role: "CEO, Drifter",
    initials: "PN",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-on-surface mb-3">
            Trusted by data-driven teams
          </h2>
          <p className="text-on-surface-variant">
            Join 12,000+ companies that use Luminary to make faster decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
