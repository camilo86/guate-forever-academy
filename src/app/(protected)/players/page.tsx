import { DataTable } from "@/components/data-table"

import { RegisterPlayerSheet } from "@/components/register-player-sheet"
import { columns } from "./columns"

export default function PlayersPage() {
  return (
    <div className="container pt-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Players</h1>
        <RegisterPlayerSheet />
      </div>
      <DataTable columns={columns} data={[]} hideFilters />
    </div>
  )
}
