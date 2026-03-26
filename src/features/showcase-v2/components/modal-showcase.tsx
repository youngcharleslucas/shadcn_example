import * as React from "react"
import { Modal, Button } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function ModalShowcase() {
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  return (
    <ComponentSection
      id="modal"
      title="Modal"
      description="Dialogs with surface-container-high background and 28px rounded corners."
    >
      <DemoRow label="Confirm Dialog">
        <Modal
          trigger={<Button variant="outlined">Open Dialog</Button>}
          title="Eat the egg?"
          description="This will consume the spotted Yoshi egg. This action cannot be undone."
          footer={
            <div className="flex gap-2">
              <Button variant="text" onClick={() => setOpen1(false)}>Cancel</Button>
              <Button variant="filled">Eat It!</Button>
            </div>
          }
          open={open1}
          onOpenChange={setOpen1}
        />
      </DemoRow>

      <DemoRow label="Info Dialog">
        <Modal
          trigger={<Button variant="filled">Power-Up Details</Button>}
          title="Super Star Power-Up"
          description="Grants temporary invincibility and defeat any enemy on contact."
          open={open2}
          onOpenChange={setOpen2}
          footer={<Button variant="tonal" onClick={() => setOpen2(false)}>Got it!</Button>}
        >
          <ul className="text-sm text-on-surface-variant list-disc list-inside space-y-1 mt-2">
            <li>5 seconds of invincibility</li>
            <li>Defeat any enemy by touching them</li>
            <li>Increases running speed</li>
            <li>Plays the Star music theme</li>
          </ul>
        </Modal>
      </DemoRow>
    </ComponentSection>
  )
}
