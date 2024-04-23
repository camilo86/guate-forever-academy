"use server"

import { createEventFormSchema } from "@/../types/guate"
import { auth } from "@/app/actions"
import db from "@/lib/db"
import { z } from "zod"

export async function createEvent(
  model: z.infer<typeof createEventFormSchema>
) {
  const session = await auth()
  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized")
  }

  const { success } = createEventFormSchema.safeParse(model)
  if (!success) {
    throw new Error("Invalid event data")
  }

  await db.event.create({
    data: {
      title: model.title,
      description: model.description,
      date: model.date,
      address: model.address,
    },
  })
}
