import { DataTable } from "@/styles/v2"
import type { ColumnDef } from "@/styles/v2"
import { ComponentSection, DemoRow } from "../styles"

interface Score {
  player: string
  world: string
  coins: string
  score: string
  status: string
}

const SCORES: Score[] = [
  { player: "Yoshi",     world: "World 1-1", coins: "120", score: "48,200",  status: "Complete" },
  { player: "Baby Mario", world: "World 2-3", coins: "88",  score: "31,500",  status: "Complete" },
  { player: "Boshi",     world: "World 3-2", coins: "44",  score: "19,100",  status: "Failed" },
  { player: "Yoshi",     world: "World 4-1", coins: "200", score: "72,800",  status: "Complete" },
  { player: "Pink Yoshi",world: "World 4-4", coins: "155", score: "61,300",  status: "In Progress" },
]

const COLUMNS: ColumnDef<Score>[] = [
  { key: "player", header: "Player",    cell: (v) => <span className="font-bold">{String(v)}</span> },
  { key: "world",  header: "World" },
  { key: "coins",  header: "Coins",     cell: (v) => <span className="text-secondary-foreground font-medium">🪙 {String(v)}</span> },
  { key: "score",  header: "Score" },
  {
    key: "status",
    header: "Status",
    cell: (v) => (
      <span className={
        v === "Complete"     ? "px-2 py-0.5 rounded-full text-xs font-bold bg-primary-container text-on-primary-container" :
        v === "Failed"       ? "px-2 py-0.5 rounded-full text-xs font-bold bg-error-container text-on-error-container" :
                               "px-2 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container"
      }>
        {String(v)}
      </span>
    ),
  },
]

export function TableShowcase() {
  return (
    <ComponentSection
      id="data-table"
      title="Data Table"
      description="Tables with green surface tones and playful Yoshi-themed data."
    >
      <DemoRow label="Leaderboard">
        <DataTable columns={COLUMNS} data={SCORES} className="w-full" />
      </DemoRow>

      <DemoRow label="Empty State">
        <DataTable columns={COLUMNS} data={[]} className="w-full" emptyMessage="No scores yet — start playing!" />
      </DemoRow>
    </ComponentSection>
  )
}
