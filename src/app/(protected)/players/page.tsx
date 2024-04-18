import { DataTable } from "@/components/data-table"
import { RegisterPlayerSheet } from "@/components/register-player-sheet"
import db from "@/lib/db"

import { auth } from "@/app/actions"
import { redirect } from "next/navigation"
import { columns } from "./columns"

export default async function PlayersPage() {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const players = await db.player.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <div className="container pt-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Players</h1>
        <RegisterPlayerSheet />
      </div>
      <DataTable columns={columns} data={players} hideFilters />
    </div>
  )
}
