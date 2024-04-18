"use client"

import { Club, Invite, Player } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

type InviteWithPlayerAndClub = Invite & { player: Player; club: Club }

export const columns: ColumnDef<InviteWithPlayerAndClub>[] = [
  {
    accessorKey: "player",
    header: "Player",
    cell(props) {
      const value = props.getValue() as Player
      return value ? value.name : "-"
    },
  },
  {
    accessorKey: "club",
    header: "Club",
    cell(props) {
      const value = props.getValue() as Club
      return value ? value.name : "-"
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
]
