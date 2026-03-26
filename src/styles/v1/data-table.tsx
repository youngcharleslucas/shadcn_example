import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface ColumnDef<T> {
  key: keyof T
  header: string
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  className?: string
  emptyMessage?: string
}

function DataTable<T extends object>({
  columns,
  data,
  className,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className={cn("rounded-xl border border-outline-variant overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-container hover:bg-surface-container border-b border-outline-variant">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={cn("text-on-surface-variant font-medium h-12", col.className)}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-on-surface-variant"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="bg-surface hover:bg-surface-container border-b border-outline-variant/50 last:border-0"
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={cn("text-on-surface py-3", col.className)}
                  >
                    {col.cell
                      ? col.cell(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
