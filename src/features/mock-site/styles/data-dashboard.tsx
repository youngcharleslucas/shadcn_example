import * as React from "react"
import { Plus } from "lucide-react"
import { DataTable, Dropdown, Fab } from "@/styles/v1"
import type { ColumnDef } from "@/styles/v1"
import { cn } from "@/lib/utils"

interface AnalyticsRow {
  page: string
  views: string
  visitors: string
  bounceRate: string
  avgTime: string
  conversion: string
}

const DATA_BY_PERIOD: Record<string, AnalyticsRow[]> = {
  "7d": [
    { page: "/dashboard",      views: "4,231",  visitors: "2,100",  bounceRate: "28%", avgTime: "4m 12s", conversion: "5.2%" },
    { page: "/pricing",        views: "3,182",  visitors: "1,890",  bounceRate: "44%", avgTime: "2m 05s", conversion: "8.1%" },
    { page: "/features",       views: "2,844",  visitors: "1,620",  bounceRate: "39%", avgTime: "3m 31s", conversion: "3.7%" },
    { page: "/blog/analytics", views: "1,997",  visitors: "1,210",  bounceRate: "52%", avgTime: "6m 48s", conversion: "1.9%" },
    { page: "/signup",         views: "1,543",  visitors: "1,543",  bounceRate: "18%", avgTime: "1m 22s", conversion: "22.4%" },
  ],
  "30d": [
    { page: "/dashboard",      views: "18,420", visitors: "9,200",  bounceRate: "26%", avgTime: "4m 44s", conversion: "6.1%" },
    { page: "/pricing",        views: "14,750", visitors: "8,110",  bounceRate: "42%", avgTime: "2m 18s", conversion: "9.2%" },
    { page: "/features",       views: "11,930", visitors: "6,880",  bounceRate: "37%", avgTime: "3m 55s", conversion: "4.3%" },
    { page: "/blog/analytics", views: "8,640",  visitors: "5,340",  bounceRate: "49%", avgTime: "7m 10s", conversion: "2.1%" },
    { page: "/signup",         views: "6,780",  visitors: "6,780",  bounceRate: "17%", avgTime: "1m 35s", conversion: "24.1%" },
    { page: "/contact",        views: "3,210",  visitors: "2,940",  bounceRate: "33%", avgTime: "2m 01s", conversion: "11.8%" },
  ],
}

const COLUMNS: ColumnDef<AnalyticsRow>[] = [
  { key: "page",       header: "Page",       cell: (v) => <span className="font-medium font-mono text-xs">{String(v)}</span> },
  { key: "views",      header: "Page Views" },
  { key: "visitors",   header: "Unique Visitors" },
  { key: "bounceRate", header: "Bounce Rate" },
  { key: "avgTime",    header: "Avg. Time" },
  { key: "conversion", header: "Conversion", cell: (v) => <span className="text-primary font-medium">{String(v)}</span> },
]

const PERIOD_OPTIONS = [
  { value: "7d",  label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
]

export interface DataDashboardProps {
  className?: string
}

export function DataDashboard({ className }: DataDashboardProps) {
  const [period, setPeriod] = React.useState("30d")
  const data = DATA_BY_PERIOD[period] ?? DATA_BY_PERIOD["30d"]

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-52">
          <Dropdown
            options={PERIOD_OPTIONS}
            value={period}
            onValueChange={setPeriod}
            label="Time Period"
          />
        </div>
      </div>
      <DataTable columns={COLUMNS} data={data} className="w-full" />

      {/* FAB pinned to bottom-right */}
      <div className="absolute -bottom-6 right-0">
        <Fab
          variant="primary"
          icon={<Plus />}
          label="New Report"
          aria-label="Add new report"
        />
      </div>
    </div>
  )
}
