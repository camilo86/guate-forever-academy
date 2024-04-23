import { auth } from "@/app/actions"
import { EventCard } from "@/components/event-card"
import { InvitationsDialog } from "@/components/invitations-dialog"
import db from "@/lib/db"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) {
    return redirect("/login")
  }

  const players = db.player.findMany({
    where: {
      userId: session.user.id,
    },
  })
  const playerIds = (await players).map((player) => player.id)

  const invites = await db.invite.findMany({
    where: {
      status: "pending",
      playerId: {
        in: playerIds,
      },
    },
    include: {
      player: true,
      club: true,
    },
  })

  const events = await db.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
  })

  return (
    <div className="container pt-6">
      {invites.length > 0 && <InvitationsDialog invites={invites} />}
      <h1 className="text-2xl font-semibold tracking-tight">Upcoming events</h1>
      <div className="grid w-full gap-4 pt-6">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  )
}
