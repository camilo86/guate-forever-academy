import { DataTable } from "@/components/data-table"
import db from "@/lib/db"
import { columns } from "./columns"

export default async function InvitesPage() {
  const invites = await db.invite.findMany({
    include: {
      club: true,
      player: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container pt-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Invites</h1>
      <DataTable columns={columns} data={invites} />
    </div>
  )
}
