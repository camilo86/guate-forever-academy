"use server"

import { createPlayerFormSchema } from "@/../types/guate"
import { auth } from "@/app/actions"
import db from "@/lib/db"
import { z } from "zod"

export async function createPlayer(
  model: z.infer<typeof createPlayerFormSchema>
) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const { success } = createPlayerFormSchema.safeParse(model)
  if (!success) {
    throw new Error("Invalid player data")
  }

  await db.player.create({
    data: {
      name: model.name,
      birthday: model.birthday,
      userId: session.user.id,
    },
  })
}
