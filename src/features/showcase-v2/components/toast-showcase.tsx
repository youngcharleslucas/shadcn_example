import { showToast, Button } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

export function ToastShowcase() {
  return (
    <ComponentSection
      id="toast"
      title="Toast"
      description="Snackbar notifications with inverse-surface (dark green) background."
    >
      <DemoRow label="Variants">
        <Button variant="outlined" onClick={() => showToast("Egg collected!")}>Default</Button>
        <Button variant="outlined" onClick={() => showToast("Level complete!", "success")}>Success</Button>
        <Button variant="outlined" onClick={() => showToast("Bowser got away.", "error")}>Error</Button>
        <Button variant="outlined" onClick={() => showToast("Low on eggs — only 3 left!", "warning")}>Warning</Button>
      </DemoRow>

      <DemoRow label="With Action">
        <Button variant="filled" onClick={() =>
          showToast("Yoshi fell into a pit.", "default", {
            action: { label: "Retry", onClick: () => showToast("Stage restarted!", "success") },
          })
        }>
          With Retry Action
        </Button>
      </DemoRow>

      <DemoRow label="With Description">
        <Button variant="tonal" onClick={() =>
          showToast("World 3 unlocked!", "success", {
            description: "Jungle Fever awaits. Good luck!",
          })
        }>
          With Description
        </Button>
      </DemoRow>
    </ComponentSection>
  )
}
