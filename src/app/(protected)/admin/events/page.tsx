import { CreateEventSheet } from "@/components/create-event-sheet"
import { DataTable } from "@/components/data-table"
import db from "@/lib/db"

import { columns } from "./columns"

export default async function EventsPage() {
  const events = await db.event.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container pt-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Events</h1>
        <CreateEventSheet />
      </div>
      <DataTable columns={columns} data={events} />
    </div>
  )
}
