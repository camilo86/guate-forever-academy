"use client"

import { Club, Invite, Player } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export type ClubWithPlayersAndInvites = Club & {
  players: Player[]
  invites: Invite[]
}

export const columns: ColumnDef<ClubWithPlayersAndInvites>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "invites",
    header: "Invites",
    cell(props) {
      const value = props.getValue() as Invite[]
      return value.length
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell(props) {
      const value = props.getValue()
      return value ? new Date(value as string).toLocaleDateString() : "-"
    },
  },
]
