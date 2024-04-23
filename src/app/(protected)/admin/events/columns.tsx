"use client"

import { Event } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "address",
    header: "Location",
    cell({ row }) {
      const { address } = row.original

      return address || "--"
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
]
