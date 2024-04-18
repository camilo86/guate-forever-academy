"use server"

import { config } from "@/lib/auth"
import db from "@/lib/db"
import { getServerSession } from "next-auth"

export async function auth() {
  return await getServerSession(config)
}

export async function respondToInvite(
  inviteId: string,
  status: "accepted" | "rejected"
) {
  const session = await auth()
  if (!session) {
    return
  }

  const invite = await db.invite.findUnique({
    where: {
      id: inviteId,
    },
  })

  if (!invite) {
    throw new Error("Invite not found")
  }

  const isParent = await db.player.findFirst({
    where: {
      id: invite.playerId,
      userId: session.user.id,
    },
  })

  if (!isParent) {
    throw new Error("Access denied")
  }

  await db.invite.update({
    where: {
      id: inviteId,
    },
    data: {
      status,
    },
  })
}
