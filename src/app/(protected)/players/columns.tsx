"use client"

import { Player } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
  {
    accessorKey: "createdAt",
    header: "Member since",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
]
