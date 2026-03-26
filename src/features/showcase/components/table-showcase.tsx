import { DataTable } from "@/styles/v1"
import type { ColumnDef } from "@/styles/v1"
import { ComponentSection, DemoRow } from "../styles"

interface User {
  name: string
  email: string
  role: string
  status: string
  joined: string
}

const USERS: User[] = [
  { name: "Alice Chen",    email: "alice@example.com",   role: "Admin",  status: "Active",   joined: "Jan 2024" },
  { name: "Bob Patel",     email: "bob@example.com",     role: "Editor", status: "Active",   joined: "Mar 2024" },
  { name: "Carol Smith",   email: "carol@example.com",   role: "Viewer", status: "Inactive", joined: "Jun 2024" },
  { name: "David Kim",     email: "david@example.com",   role: "Editor", status: "Active",   joined: "Aug 2024" },
  { name: "Eva Rossi",     email: "eva@example.com",     role: "Admin",  status: "Active",   joined: "Oct 2024" },
]

const COLUMNS: ColumnDef<User>[] = [
  { key: "name",   header: "Name",    cell: (v) => <span className="font-medium">{String(v)}</span> },
  { key: "email",  header: "Email",   cell: (v) => <span className="text-on-surface-variant">{String(v)}</span> },
  { key: "role",   header: "Role" },
  {
    key: "status",
    header: "Status",
    cell: (v) => (
      <span
        className={
          v === "Active"
            ? "px-2 py-0.5 rounded-full text-xs font-medium bg-primary-container text-on-primary-container"
            : "px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container-highest text-on-surface-variant"
        }
      >
        {String(v)}
      </span>
    ),
  },
  { key: "joined", header: "Joined" },
]

export function TableShowcase() {
  return (
    <ComponentSection
      id="data-table"
      title="Data Table"
      description="Tables display information in rows and columns with M3 surface styling."
    >
      <DemoRow label="Default">
        <DataTable columns={COLUMNS} data={USERS} className="w-full" />
      </DemoRow>

      <DemoRow label="Empty State">
        <DataTable columns={COLUMNS} data={[]} className="w-full" emptyMessage="No users found." />
      </DemoRow>
    </ComponentSection>
  )
}
