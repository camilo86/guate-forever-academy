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
  },
  {
    accessorKey: "createdAt",
    header: "Member since",
  },
]
