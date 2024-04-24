"use client"

import { createClubInviteFormSchema } from "@/../types/guate"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Club, Player, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createClubInvite, getClubsAndPlayers } from "./actions"

export type PlayerWithParent = Player & { user: User }

export const columns: ColumnDef<PlayerWithParent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "user",
    header: "Parent",
    cell({ row }) {
      const { user } = row.original

      if (!user) {
        return "--"
      }

      return user.name || user.email || "--"
    },
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
  {
    id: "actions",
    enableHiding: true,
    cell({ row }) {
      const player = row.original as Player

      return <PlayerActions player={player} />
    },
  },
]

function PlayerActions({ player }: { player: Player }) {
  const router = useRouter()

  const [isOpen, setOpen] = React.useState(false)
  const [clubsAndPlayers, setClubsAndPlayers] = React.useState<{
    clubs: Club[]
    players: Player[]
  }>({
    clubs: [],
    players: [],
  })

  const form = useForm<z.infer<typeof createClubInviteFormSchema>>({
    defaultValues: {
      playerId: player.id,
      clubId: "",
    },
  })

  React.useEffect(() => {
    form.setValue("playerId", player.id)
  }, [player])

  React.useEffect(() => {
    getClubsAndPlayers().then(setClubsAndPlayers).catch(console.error)
  }, [])

  const onSubmit = async (
    values: z.infer<typeof createClubInviteFormSchema>
  ) => {
    // TODO: Figure out why zod validation is not wokring in here!
    // Below is a hacky way to validate the form for now
    if (!values.clubId || !values.playerId) {
      alert("Please select a club and a player")
      return
    }

    setOpen(false)
    await createClubInvite(values)
    router.refresh()
  }

  const selectedPlayerId = form.watch("playerId")
  const selectedPlayer = selectedPlayerId
    ? clubsAndPlayers.players.find((p) => p.id === selectedPlayerId)
    : undefined

  return (
    <div className="text-right">
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className=" h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem>Invite to club</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to club</DialogTitle>
            <DialogDescription>
              An invitiation will be sent to {player.name}'s parents to join the
              club.
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="clubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Club</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a club" />
                          </SelectTrigger>
                          <SelectContent>
                            {clubsAndPlayers.clubs.map((c) => (
                              <SelectItem value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="playerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a club" />
                          </SelectTrigger>
                          <SelectContent>
                            {clubsAndPlayers.players.map((p) => (
                              <SelectItem value={p.id}>{p.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!selectedPlayer || !selectedPlayer.clubId ? (
                  <Button type="submit" className="w-full">
                    Send Invite
                  </Button>
                ) : (
                  <p>
                    Cannot invite this player. It is already part of a club.
                  </p>
                )}
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
