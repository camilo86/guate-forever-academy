import { DataTable } from "@/components/data-table"
import db from "@/lib/db"
import { columns } from "./columns"

export default async function PlayersPage() {
  const players = await db.player.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="container pt-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Players</h1>
      <DataTable columns={columns} data={players as any} />
    </div>
  )
}
