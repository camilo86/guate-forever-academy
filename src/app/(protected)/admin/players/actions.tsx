"use server"

import { createClubInviteFormSchema } from "@/../types/guate"
import { auth } from "@/app/actions"
import db from "@/lib/db"
import { z } from "zod"

export async function getClubsAndPlayers() {
  const session = await auth()
  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized")
  }

  const [clubs, players] = await Promise.all([
    db.club.findMany(),
    db.player.findMany(),
  ])

  return { clubs, players }
}

export async function createClubInvite(
  model: z.infer<typeof createClubInviteFormSchema>
) {
  const session = await auth()
  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized")
  }

  const { success } = createClubInviteFormSchema.safeParse(model)
  if (!success) {
    throw new Error("Invalid club invite data")
  }

  const hasBeenInvited = await db.invite.findFirst({
    where: {
      playerId: model.playerId,
    },
  })

  if (hasBeenInvited) {
    throw new Error("Player has already been invited")
  }

  const [club, player] = await Promise.all([
    db.club.findUnique({ where: { id: model.clubId } }),
    db.player.findUnique({ where: { id: model.playerId } }),
  ])

  if (!club) {
    throw new Error("Club not found")
  }

  if (!player) {
    throw new Error("Player not found")
  }

  await db.invite.create({
    data: {
      clubId: club.id,
      playerId: player.id,
      title: `You are invited!`,
      description: `Hi ${player.name}, You have been invited to join ${club.name}.`,
      status: "pending",
    },
  })
}
