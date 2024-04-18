import { DataTable } from "@/components/data-table"
import db from "@/lib/db"
import { columns } from "./columns"

export default async function UsersPage() {
  const users = await db.user.findMany({
    include: {
      players: true,
    },
  })

  return (
    <div className="container pt-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
