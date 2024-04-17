import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { FaFutbol } from "react-icons/fa"

import { columns } from "./columns"

export default function PlayersPage() {
  return (
    <div className="container pt-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Players</h1>
        <Button>
          <FaFutbol className="mr-2" /> Register player
        </Button>
      </div>
      <DataTable columns={columns} data={[]} hideFilters />
    </div>
  )
}
