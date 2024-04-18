"use client"

import { Player, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

type UserWithPlayers = User & { players: Player[] }

export const columns: ColumnDef<UserWithPlayers>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "players",
    header: "Players",
    cell(props) {
      const value = props.getValue() as Player[]
      return value.length
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
  },
]
