import * as React from "react"
import { Modal, Button } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function ModalShowcase() {
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  return (
    <ComponentSection
      id="modal"
      title="Modal"
      description="Modals (dialogs) interrupt the user to convey critical information. M3 uses a 28px radius and surface-container-high background."
    >
      <DemoRow label="Basic Dialog">
        <Modal
          trigger={<Button variant="outlined">Open Dialog</Button>}
          title="Delete account?"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          footer={
            <div className="flex gap-2">
              <Button variant="text" onClick={() => setOpen1(false)}>Cancel</Button>
              <Button variant="filled">Delete</Button>
            </div>
          }
          open={open1}
          onOpenChange={setOpen1}
        />
      </DemoRow>

      <DemoRow label="Info Dialog">
        <Modal
          trigger={<Button variant="filled">View Details</Button>}
          title="Feature Details"
          description="Advanced analytics gives you real-time access to your data pipeline."
          open={open2}
          onOpenChange={setOpen2}
          footer={
            <Button variant="tonal" onClick={() => setOpen2(false)}>Got it</Button>
          }
        >
          <ul className="text-sm text-on-surface-variant list-disc list-inside space-y-1 mt-2">
            <li>Custom dashboards and reporting</li>
            <li>Export to CSV, PDF, or JSON</li>
            <li>Real-time data streaming</li>
            <li>Collaborative annotations</li>
          </ul>
        </Modal>
      </DemoRow>
    </ComponentSection>
  )
}
