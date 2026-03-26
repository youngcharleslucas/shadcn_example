import { showToast, Button } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

export function ToastShowcase() {
  return (
    <ComponentSection
      id="toast"
      title="Toast"
      description="Toasts (snackbars) provide brief feedback messages. M3 snackbars use the inverse surface color."
    >
      <DemoRow label="Variants">
        <Button variant="outlined" onClick={() => showToast("Changes saved successfully.")}>
          Default
        </Button>
        <Button
          variant="outlined"
          onClick={() => showToast("Profile updated!", "success")}
        >
          Success
        </Button>
        <Button
          variant="outlined"
          onClick={() => showToast("Something went wrong.", "error")}
        >
          Error
        </Button>
        <Button
          variant="outlined"
          onClick={() => showToast("Storage is almost full.", "warning")}
        >
          Warning
        </Button>
      </DemoRow>

      <DemoRow label="With Action">
        <Button
          variant="filled"
          onClick={() =>
            showToast("Message deleted.", "default", {
              action: {
                label: "Undo",
                onClick: () => showToast("Message restored.", "success"),
              },
            })
          }
        >
          With Undo Action
        </Button>
      </DemoRow>

      <DemoRow label="With Description">
        <Button
          variant="tonal"
          onClick={() =>
            showToast("Export complete", "success", {
              description: "Your report has been exported to Downloads.",
            })
          }
        >
          With Description
        </Button>
      </DemoRow>
    </ComponentSection>
  )
}
