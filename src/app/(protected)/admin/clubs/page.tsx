import { CreateClubSheet } from "@/components/create-club-sheet"
import { DataTable } from "@/components/data-table"
import db from "@/lib/db"
import { columns } from "./columns"

export default async function ClubsPage() {
  // Only selecting players/invites IDs and casting to any below
  // to prevent pulling in the entire player/invite objects
  const clubs = await db.club.findMany({
    include: {
      players: { select: { id: true } },
      invites: { select: { id: true } },
    },
  })

  return (
    <div className="container pt-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Clubs</h1>
        <CreateClubSheet />
      </div>
      <DataTable columns={columns} data={clubs as any} />
    </div>
  )
}
