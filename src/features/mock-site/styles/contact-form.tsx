import * as React from "react"
import { Mail, User, MessageSquare } from "lucide-react"
import { TextField, Dropdown, Button, showToast } from "@/styles/v1"
import { cn } from "@/lib/utils"

const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Technical Support" },
  { value: "billing", label: "Billing" },
  { value: "partnership", label: "Partnership" },
]

export interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [inquiryType, setInquiryType] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showToast("Message sent!", "success", {
      description: "We'll get back to you within 24 hours.",
      action: { label: "Dismiss", onClick: () => {} },
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          variant="outlined"
          label="Full name"
          leadingIcon={<User className="size-4" />}
          required
        />
        <TextField
          variant="outlined"
          label="Email address"
          type="email"
          leadingIcon={<Mail className="size-4" />}
          required
        />
      </div>
      <Dropdown
        options={INQUIRY_TYPES}
        value={inquiryType}
        onValueChange={setInquiryType}
        label="Inquiry type"
        placeholder="Select a topic"
      />
      <TextField
        variant="filled"
        label="Message"
        leadingIcon={<MessageSquare className="size-4" />}
        supportingText="Minimum 20 characters"
      />
      <Button variant="filled" type="submit" disabled={submitted} className="self-start">
        {submitted ? "Sent!" : "Send Message"}
      </Button>
    </form>
  )
}
