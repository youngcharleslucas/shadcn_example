import { ContactForm } from "../styles"

const contactInfo = () => {
  return (
    <div className="theme-v2">
      <h2 className="text-3xl font-medium text-on-surface mb-3">Get in touch</h2>
      <p className="text-on-surface-variant mb-6">
        Have a question, or want to learn more about our Enterprise plan?
        We typically respond within one business day.
      </p>
      <div className="space-y-3">
        {[
          { label: "Email", value: "hello@luminary.io" },
          { label: "Phone", value: "+1 (800) 555-0192" },
          { label: "Office", value: "340 Pine St, San Francisco, CA" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
              {item.label}
            </p>
            <p className="text-sm text-on-surface">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContactSection() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {contactInfo()}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
